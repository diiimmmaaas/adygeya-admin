import { createSlice } from '@reduxjs/toolkit'
import { ObjectResponseMetaType, RoutesResponseDataType } from '../../types/types'
import { getRoutes, postRoutes } from '../../actions/routesActions'

export interface IRoutes {
  routes: RoutesResponseDataType[]
  meta: ObjectResponseMetaType
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
    builder.addCase(postRoutes.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postRoutes.fulfilled, (state, action) => {
      state.isLoading = false
      state.id = action.payload.id
    })
    builder.addCase(postRoutes.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const routesReducer = routesSlice.reducer
