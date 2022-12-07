import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface HomeState {
  value: number
  SEOInformation: {
    title: string
    description: string
    image: string
  }
}

const initialState: HomeState = {
  value: 0,
  SEOInformation: {
    title: '',
    description: '',
    image: ''
  }
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    prefetchData: (state) => {
      state.SEOInformation = {
        title: 'New title after fetched',
        description: 'New description after fetched',
        image: 'New image after fetched'
      }
    },
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export const {
  increment,
  decrement,
  incrementByAmount,
  prefetchData
} = homeSlice.actions

export default homeSlice.reducer
