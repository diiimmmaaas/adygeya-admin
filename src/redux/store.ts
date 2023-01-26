import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/auth/authSlice'
import { usersReducer } from './reducers/users/usersSlice'
import { objectsReducer } from './reducers/objects/objectsSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  user: usersReducer,
  objects: objectsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
