import React from 'react'
import { prefetchData } from '../features/home/homeSlice'

import Layout from '../components/layouts'
import Home from '../components/pages/HomePage'
import { RootState } from '../store/store'

const About = React.lazy(() => import('../components/pages/About'))

const routes = [
  {
    path: '/',
    element: <Layout />,
    prefetch: null,
    getSEOInformation: () => ({
      title: '',
      description: '',
      image: ''
    }),
    children: [
      {
        path: '/',
        index: true,
        element: <Home />,
        prefetch: prefetchData,
        getSEOInformation: (state: RootState) => state.homeReducer.SEOInformation
      }, {
        path: '/about',
        element: <React.Suspense fallback={<div>Loading...</div>}><About /></React.Suspense>,
        prefetch: null,
        getSEOInformation: () => ({
          title: '',
          description: '',
          image: ''
        })
      }
    ]
  }
]
export default routes
