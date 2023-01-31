import { createSlice } from '@reduxjs/toolkit'
import {
  deleteNews,
  getNews,
  postHighlightForNews,
  postImageForNews,
  postNews,
} from '../../actions/newsActions'
import { NewsResponseDataType, ObjectResponseMetaType } from '../../types/types'

export interface INews {
  news: NewsResponseDataType[]
  meta: ObjectResponseMetaType
  id: number | null
  isLoading: boolean
  isLoadingPhoto: boolean
  isLoadingHighlight: boolean
  error: unknown | string
}

const initialState: INews = {
  news: [],
  meta: {
    hasNextPage: true,
    hasPreviousPage: false,
    itemCount: 0,
    page: 0,
    pageCount: 5,
    take: 5,
  },
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
    builder.addCase(getNews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.news = action.payload.data
      state.meta.page = action.payload.meta.page
      state.meta.pageCount = action.payload.meta.pageCount
      state.meta.hasNextPage = action.payload.meta.hasNextPage
      state.meta.hasPreviousPage = action.payload.meta.hasPreviousPage
      state.meta.itemCount = action.payload.meta.itemCount
      state.meta.take = action.payload.meta.take
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(getNews.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
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
    builder.addCase(deleteNews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteNews.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(deleteNews.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const newsReducer = newsSlice.reducer
