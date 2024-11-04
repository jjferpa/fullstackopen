import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterReducer'
import anecdotesReducer from './anecdoteReducer'


export const store = configureStore({
    reducer: {
      anecdotes: anecdotesReducer,
      filter: filterReducer
    }
  })



  export default store