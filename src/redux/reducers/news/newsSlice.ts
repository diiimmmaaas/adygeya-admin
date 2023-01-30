import { createSlice } from '@reduxjs/toolkit'
import { postHighlightForNews, postImageForNews, postNews } from '../../actions/newsActions'

export interface INews {
  id: number | null
  isLoading: boolean
  isLoadingPhoto: boolean
  isLoadingHighlight: boolean
  error: unknown | string
}

const initialState: INews = {
  id: null,
  isLoading: false,
  isLoadingPhoto: false,
  isLoadingHighlight: false,
  error: '',
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postNews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postNews.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(postNews.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postImageForNews.pending, (state) => {
      state.isLoadingPhoto = true
    })
    builder.addCase(postImageForNews.fulfilled, (state) => {
      state.isLoadingPhoto = false
      state.error = ''
    })
    builder.addCase(postImageForNews.rejected, (state, action) => {
      state.isLoadingPhoto = false
      state.error = action.payload
    })
    builder.addCase(postHighlightForNews.pending, (state) => {
      state.isLoadingHighlight = true
    })
    builder.addCase(postHighlightForNews.fulfilled, (state) => {
      state.isLoadingHighlight = false
      state.error = ''
    })
    builder.addCase(postHighlightForNews.rejected, (state, action) => {
      state.isLoadingHighlight = false
      state.error = action.payload
    })
  },
})

export const newsReducer = newsSlice.reducer
