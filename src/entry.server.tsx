import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { type RootState, createStore } from './store/store'
import { Provider } from 'react-redux'

import App from './App'

export function render (url: string, preloadedState: RootState) {
  const store = createStore(preloadedState)
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  )
}
