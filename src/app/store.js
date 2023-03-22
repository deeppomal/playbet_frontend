import { configureStore } from '@reduxjs/toolkit'
import dateReducer from '../reducers/dateReducer'
import fixtureReducer from '../reducers/fixtureReducer'
import userReducer from '../reducers/userReducer'

export default configureStore({
  reducer: {
    date:dateReducer,
    fixture:fixtureReducer,
    user:userReducer
  },
})