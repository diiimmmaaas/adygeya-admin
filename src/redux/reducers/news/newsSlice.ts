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
  publishNews,
} from '../../actions/newsActions'
import { GetCurrentNewsType, NewsResponseDataType, ObjectResponseMetaType } from '../../types/types'
import { Order } from '../../../components/TableComponent/TableComponent';

export interface INews {
  news: NewsResponseDataType[]
  meta: ObjectResponseMetaType
  currentNews: GetCurrentNewsType
  id: number | null
  isLoading: boolean
  isLoadingPhoto: boolean
  isLoadingHighlight: boolean
  order: Order
  orderBy: string
  error: any
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
  order: 'asc',
  orderBy: 'name',
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
      state.news = action.payload.data.data
      state.meta.page = action.payload.data.meta.page
      state.meta.pageCount = action.payload.data.meta.pageCount
      state.meta.hasNextPage = action.payload.data.meta.hasNextPage
      state.meta.hasPreviousPage = action.payload.data.meta.hasPreviousPage
      state.meta.itemCount = action.payload.data.meta.itemCount
      state.meta.take = action.payload.data.meta.take
      state.order = action.payload?.order
      state.orderBy = action.payload?.orderBy
      state.isLoading = false
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
      state.currentNews.location = action.payload.location
      state.currentNews.images = action.payload.images
      state.currentNews.stories = action.payload.stories

      state.isLoading = false
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
    })
    builder.addCase(deleteImageNews.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(publishNews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(publishNews.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(publishNews.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const newsReducer = newsSlice.reducer
