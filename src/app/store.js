import { configureStore } from '@reduxjs/toolkit'
import dateReducer from '../reducers/dateReducer'
import fixtureReducer from '../reducers/fixtureReducer'

export default configureStore({
  reducer: {
    date:dateReducer,
    fixture:fixtureReducer
  },
})