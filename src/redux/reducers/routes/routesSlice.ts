import { createSlice } from '@reduxjs/toolkit'
import {
  AudioArrayType,
  GetCurrentNewsType,
  GetCurrentRouteType,
  GetWaypointType,
  ImagesType,
  ObjectResponseMetaType,
  RoutesResponseDataType,
} from '../../types/types'
import {
  addAudioForRoutes,
  deleteImageRoute,
  deleteRoute,
  getCurrentRoute,
  getRoutes,
  postImageForRoute,
  postRoutes,
  publishRoute,
} from '../../actions/routesActions'
import { Order } from '../../../components/TableComponent/TableComponent';

export interface IRoutes {
  routes: RoutesResponseDataType[]
  meta: ObjectResponseMetaType
  audioArray: AudioArrayType[]
  currentRoute: GetCurrentRouteType
  id: number | null
  isLoading: boolean
  isLoadingAudio: boolean
  isLoadingPhoto: boolean
  order: Order
  orderBy: string
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
  currentRoute: {
    id: 0,
    name: '',
    published: false,
    publishAt: '',
    images: [],
    waypoints: [],
    description: '',
  },
  id: null,
  isLoading: false,
  isLoadingAudio: false,
  isLoadingPhoto: false,
  order: 'asc',
  orderBy: 'name',
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
      state.routes = action.payload.data.data
      state.meta.page = action.payload.data.meta.page
      state.meta.pageCount = action.payload.data.meta.pageCount
      state.meta.hasNextPage = action.payload.data.meta.hasNextPage
      state.meta.hasPreviousPage = action.payload.data.meta.hasPreviousPage
      state.meta.itemCount = action.payload.data.meta.itemCount
      state.meta.take = action.payload.data.meta.take
      state.order = action.payload?.order
      state.orderBy = action.payload?.orderBy
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(getRoutes.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(getCurrentRoute.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCurrentRoute.fulfilled, (state, action) => {
      state.isLoading = false
      state.currentRoute.id = action.payload.id
      state.currentRoute.name = action.payload.name
      state.currentRoute.published = action.payload.published
      state.currentRoute.publishAt = action.payload.publishAt
      state.currentRoute.images = action.payload.images
      state.currentRoute.waypoints = action.payload.waypoints
      state.currentRoute.description = action.payload.description
      state.error = ''
    })
    builder.addCase(getCurrentRoute.rejected, (state, action) => {
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
    builder.addCase(deleteImageRoute.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteImageRoute.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(deleteImageRoute.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const routesReducer = routesSlice.reducer
