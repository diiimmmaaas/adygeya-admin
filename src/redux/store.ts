import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/auth/authSlice'
import { usersReducer } from './reducers/users/usersSlice'
import { objectsReducer } from './reducers/objects/objectsSlice'
import { newsReducer } from './reducers/news/newsSlice'
import { routesReducer } from './reducers/routes/routesSlice'
import { searchReducer } from './reducers/search/searchSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  user: usersReducer,
  objects: objectsReducer,
  news: newsReducer,
  routes: routesReducer,
  search: searchReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
