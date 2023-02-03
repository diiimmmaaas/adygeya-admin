import { createSlice } from '@reduxjs/toolkit'
import { ObjectResponseMetaType, RoutesResponseDataType } from '../../types/types'
import { addAudioForRoutes, getRoutes } from '../../actions/routesActions'

export interface IRoutes {
  routes: RoutesResponseDataType[]
  meta: ObjectResponseMetaType
  audioArray: number[]
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
      state.isLoading = true
    })
    builder.addCase(addAudioForRoutes.fulfilled, (state, action) => {
      state.audioArray = [...state.audioArray, action.payload]
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(addAudioForRoutes.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const routesReducer = routesSlice.reducer
