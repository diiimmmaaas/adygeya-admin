import { createSlice } from '@reduxjs/toolkit'
import { AudioArrayType, ObjectResponseMetaType, RoutesResponseDataType } from '../../types/types'
import {
  addAudioForRoutes,
  deleteRoute,
  getRoutes,
  postImageForRoute,
  postRoutes,
  publishRoute,
} from '../../actions/routesActions'

export interface IRoutes {
  routes: RoutesResponseDataType[]
  meta: ObjectResponseMetaType
  audioArray: AudioArrayType[]
  id: number | null
  isLoading: boolean
  isLoadingAudio: boolean
  isLoadingPhoto: boolean
  error: unknown | string
}

const initialState: IRoutes = {
  routes: [],
  meta: {
    hasNextPage: true,
    hasPreviousPage: false,
    itemCount: 0,
    page: 0,
    pageCount: 5,
    take: 5,
  },
  audioArray: [],
  id: null,
  isLoading: false,
  isLoadingAudio: false,
  isLoadingPhoto: false,
  error: '',
}

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoutes.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getRoutes.fulfilled, (state, action) => {
      state.routes = action.payload.data
      state.meta.page = action.payload.meta.page
      state.meta.pageCount = action.payload.meta.pageCount
      state.meta.hasNextPage = action.payload.meta.hasNextPage
      state.meta.hasPreviousPage = action.payload.meta.hasPreviousPage
      state.meta.itemCount = action.payload.meta.itemCount
      state.meta.take = action.payload.meta.take
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(getRoutes.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(addAudioForRoutes.pending, (state) => {
      state.isLoadingAudio = true
    })
    builder.addCase(addAudioForRoutes.fulfilled, (state, action) => {
      state.audioArray = [...state.audioArray, action.payload]
      state.isLoadingAudio = false
      state.error = ''
    })
    builder.addCase(addAudioForRoutes.rejected, (state, action) => {
      state.isLoadingAudio = false
      state.error = action.payload
    })
    builder.addCase(postRoutes.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postRoutes.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(postRoutes.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postImageForRoute.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postImageForRoute.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(postImageForRoute.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(deleteRoute.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteRoute.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(deleteRoute.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(publishRoute.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(publishRoute.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(publishRoute.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const routesReducer = routesSlice.reducer
