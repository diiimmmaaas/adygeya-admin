import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/auth/authSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
