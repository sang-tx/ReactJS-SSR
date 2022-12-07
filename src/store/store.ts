import { configureStore } from '@reduxjs/toolkit'

import homeReducer from '../features/home/homeSlice'

const reducer = {
  homeReducer
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const createStore = (preloadedState?: RootState) => {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.__PRELOAD_STATES__) {
  // @ts-ignore
    preloadedState = window.__PRELOAD_STATES__
  }
  return configureStore({
    reducer,
    preloadedState
  })
}

export const store = configureStore({ reducer })
