import { createSlice } from '@reduxjs/toolkit'
import {
  changeNews,
  deleteImageNews,
  deleteNews,
  getCurrentNews,
  getNews,
  postHighlightForNews,
  postImageForNews,
  postNews,
} from '../../actions/newsActions'
import { GetCurrentNewsType, NewsResponseDataType, ObjectResponseMetaType } from '../../types/types'

export interface INews {
  news: NewsResponseDataType[]
  meta: ObjectResponseMetaType
  currentNews: GetCurrentNewsType
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
  currentNews: {
    id: 0,
    title: '',
    description: '',
    date: '',
    publishAt: '',
    published: false,
    icon: '',
    location: {
      longitude: 0,
      latitude: 0,
      address: '',
    },
    images: [],
    stories: {
      title: '',
      content: '',
      images: [],
    },
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
    builder.addCase(getCurrentNews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCurrentNews.fulfilled, (state, action) => {
      state.currentNews.id = action.payload.id
      state.currentNews.title = action.payload.title
      state.currentNews.description = action.payload.description
      state.currentNews.date = action.payload.date
      state.currentNews.publishAt = action.payload.publishAt
      state.currentNews.published = action.payload.published
      state.currentNews.icon = action.payload.icon
      state.currentNews.location.longitude = action.payload.location.longitude
      state.currentNews.location.latitude = action.payload.location.latitude
      state.currentNews.location.address = action.payload.location.address
      state.currentNews.images = action.payload.images
      state.currentNews.stories.title = action.payload.stories.title
      state.currentNews.stories.content = action.payload.stories.content
      state.currentNews.stories.images = action.payload.stories.images
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(getCurrentNews.rejected, (state, action) => {
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
    builder.addCase(changeNews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(changeNews.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(changeNews.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postImageForNews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postImageForNews.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(postImageForNews.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postHighlightForNews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postHighlightForNews.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(postHighlightForNews.rejected, (state, action) => {
      state.isLoading = false
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
    builder.addCase(deleteImageNews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteImageNews.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(deleteImageNews.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const newsReducer = newsSlice.reducer
