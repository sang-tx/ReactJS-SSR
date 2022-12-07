import path from 'path'
import fsp from 'fs/promises'
import express from 'express'
import { ViteDevServer } from 'vite'
import { createStore } from '../src/store/store'
import SEOViaRoutes from '../src/routes/routes'
import { matchPath } from 'react-router'
import { Helmet } from 'react-helmet'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'
function resolve (p: string) {
  return path.resolve(__dirname, p)
}

export async function server () {
  const app = express()

  let vite: ViteDevServer

  if (!isProduction) {
    vite = await require('vite').createServer({
      root,
      server: { middlewareMode: 'ssr' }
    })

    app.use(vite.middlewares)
  } else {
    // @ts-ignore
    app.use(require('compression')())
    app.use(express.static(resolve('../dist/client'), { index: false }))
  }

  app.get('*', async (req, res) => {
    const url = req.originalUrl
    // Collect function fetch data when server rendering
    let notfound: boolean = true
    let prefetch: any = null
    let getSEOInformation: any = null
    let params: any = null

    SEOViaRoutes.some(route => {
      const matched = matchPath(route.path, url)
      if (matched) {
        notfound = false
        prefetch = route.prefetch
        getSEOInformation = route.getSEOInformation
        params = matched.params
      }
      if (route.children) {
        route.children.some(child => {
          const matched = matchPath(child.path, url)
          if (matched) {
            notfound = false
            prefetch = child.prefetch
            getSEOInformation = child.getSEOInformation
            params = matched.params
          }
        })
      }
    })

    try {
      let template
      let render

      if (!isProduction) {
        template = await fsp.readFile(resolve('../index.html'), 'utf8')
        template = await vite.transformIndexHtml(url, template)
        render = await vite
          .ssrLoadModule(resolve('../src/entry.server.tsx'))
          .then((m: any) => m.render)
      } else {
        template = await fsp.readFile(
          resolve('../dist/client/index.html'),
          'utf8'
        )
        render = require(resolve('../dist/server/entry.server.js')).render
      }

      const store = createStore()
      if (prefetch) {
        await store.dispatch(prefetch(params))
      }
      let SEO = {
        title: 'Default page title',
        description: 'Default page description',
        image: 'Default SEO image'
      }
      if (getSEOInformation) {
        SEO = getSEOInformation(store.getState())
      }
      // @ts-ignore
      const helmet = Helmet.renderStatic()
      const contentRendered =
        template
          .replace('<!--app-html-->', render(url, store.getState()))
          .replaceAll('<!--page-title-->', SEO.title)
          .replaceAll('<!--page-description-->', SEO.description)
          .replaceAll('<!--page-image-->', SEO.image)
          .replace('<!--helmet-meta-tags-->', helmet?.meta?.toString())
          .replace('"window.__PRELOADED_STATE__"', JSON.stringify(store.getState()))

      res.setHeader('Content-Type', 'text/html')
      return res.status(notfound ? 404 : 200).end(contentRendered)
    } catch (error: any) {
      if (!isProduction) {
        vite.ssrFixStacktrace(error)
      }
      /* eslint-disable no-console */
      console.log(error.stack)
      res.status(500).end(error.stack)
    }
  })

  return app
}
