import { createSlice } from '@reduxjs/toolkit'
import {
  deleteObject,
  getObjects,
  postAudioForObject,
  postImageForObject,
  postObject,
} from '../../actions/objectsActions'
import { ObjectResponseDataType, ObjectResponseMetaType } from '../../types/types'

export interface IObjects {
  objects: ObjectResponseDataType[]
  meta: ObjectResponseMetaType
  id: number | null
  isLoading: boolean
  isLoadingAudio: boolean
  isLoadingPhoto: boolean
  error: unknown | string
}

const initialState: IObjects = {
  objects: [],
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

export const objectsSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getObjects.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getObjects.fulfilled, (state, action) => {
      state.objects = action.payload.data
      state.meta.page = action.payload.meta.page
      state.meta.pageCount = action.payload.meta.pageCount
      state.meta.hasNextPage = action.payload.meta.hasNextPage
      state.meta.hasPreviousPage = action.payload.meta.hasPreviousPage
      state.meta.itemCount = action.payload.meta.itemCount
      state.meta.take = action.payload.meta.take
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(getObjects.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postObject.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(postObject.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postImageForObject.pending, (state) => {
      state.isLoadingPhoto = true
    })
    builder.addCase(postImageForObject.fulfilled, (state) => {
      state.isLoadingPhoto = false
      state.error = ''
    })
    builder.addCase(postImageForObject.rejected, (state, action) => {
      state.isLoadingPhoto = false
      state.error = action.payload
    })
    builder.addCase(postAudioForObject.pending, (state) => {
      state.isLoadingAudio = true
    })
    builder.addCase(postAudioForObject.fulfilled, (state) => {
      state.isLoadingAudio = false
      state.error = ''
    })
    builder.addCase(postAudioForObject.rejected, (state, action) => {
      state.isLoadingAudio = false
      state.error = action.payload
    })
    builder.addCase(deleteObject.pending, (state) => {
      state.isLoadingAudio = true
    })
    builder.addCase(deleteObject.fulfilled, (state) => {
      state.isLoadingAudio = false
      state.error = ''
    })
    builder.addCase(deleteObject.rejected, (state, action) => {
      state.isLoadingAudio = false
      state.error = action.payload
    })
  },
})

export const objectsReducer = objectsSlice.reducer
