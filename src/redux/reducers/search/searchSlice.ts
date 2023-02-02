import { createSlice } from '@reduxjs/toolkit'
import { postSearch } from '../../actions/searchAction'
import { landmarksSearch, newsSearch, routesSearch } from './searchTypes'

interface ISearch {
  error: unknown | string
  isLoading: boolean
  searchData: {
    news: newsSearch[]
    landmarks: landmarksSearch[]
    routes: routesSearch[]
  }
}

const initialState: ISearch = {
  isLoading: false,
  error: '',
  searchData: {
    news: [],
    landmarks: [],
    routes: [],
  },
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postSearch.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postSearch.fulfilled, (state, action) => {
      state.isLoading = false
      state.searchData = action.payload
    })
    builder.addCase(postSearch.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const searchReducer = searchSlice.reducer
