import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from './store/store'
import { Provider } from 'react-redux/es/exports'

import './index.css'
import App from './App'

// @ts-ignore
const preloadedState = typeof window !== 'undefined' && (window.__PRELOADED_STATE__ || {})
const store = createStore(preloadedState)
ReactDOM.hydrateRoot(
  // @ts-ignore
  document.getElementById('app'),
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
