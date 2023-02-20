import { createSlice } from '@reduxjs/toolkit'
import {
  changeObject,
  deleteAudioObject,
  deleteImageObject,
  deleteObject,
  getCurrentObject,
  getObjects,
  postAudioForObject,
  postImageForObject,
  postObject,
  publishObject,
} from '../../actions/objectsActions'
import {
  GetCurrentObjectType,
  ObjectResponseDataType,
  ObjectResponseMetaType,
} from '../../types/types'
import { Order } from '../../../components/TableComponent/TableComponent';
import nookies from 'nookies';

export interface IObjects {
  objects: ObjectResponseDataType[]
  meta: ObjectResponseMetaType
  currentObject: GetCurrentObjectType
  id: number | null
  isLoading: boolean
  isLoadingAudio: boolean
  isLoadingPhoto: boolean
  order: Order
  orderBy: string
  error: any
}


const cookies = nookies.get(null)

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
  currentObject: {
    id: 0,
    name: '',
    icon: '',
    published: false,
    publishAt: '',
    audio: {
      audio: '',
      length: 0,
      voiced: '',
      voicedLink: '',
    },
    images: [],
    description: '',
    location: {
      longitude: 0,
      latitude: 0,
      address: '',
    },
    schedule: [],
    contacts: [],
    categories: [],
    filters: [],
  },
  id: null,
  isLoading: false,
  isLoadingAudio: false,
  isLoadingPhoto: false,
  // order: cookies.order as Order ?? 'asc',
  // orderBy: cookies.orderBy ?? 'name',
  order: 'asc',
  orderBy: 'name',
  error: '',
}

export const objectsSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getObjects.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getObjects.fulfilled, (state, action) => {
      state.objects = action.payload.data.data
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
    builder.addCase(getObjects.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(getCurrentObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCurrentObject.fulfilled, (state, action) => {
      state.currentObject.id = action.payload.id
      state.currentObject.name = action.payload.name
      state.currentObject.icon = action.payload.icon
      state.currentObject.published = action.payload.published
      state.currentObject.publishAt = action.payload.publishAt
      state.currentObject.audio = action.payload.audio
      state.currentObject.images = action.payload.images
      state.currentObject.description = action.payload.description
      state.currentObject.location = action.payload.location
      state.currentObject.schedule = action.payload.schedule
      state.currentObject.contacts = action.payload.contacts
      state.currentObject.categories = action.payload.categories
      state.currentObject.filters = action.payload.filters

      state.isLoading = false
    })
    builder.addCase(getCurrentObject.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postObject.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.isLoading = false
    })
    builder.addCase(postObject.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postImageForObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postImageForObject.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(postImageForObject.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postAudioForObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postAudioForObject.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(postAudioForObject.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(deleteObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteObject.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(deleteObject.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(changeObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(changeObject.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(changeObject.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(deleteImageObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteImageObject.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(deleteImageObject.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(deleteAudioObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteAudioObject.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(deleteAudioObject.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(publishObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(publishObject.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(publishObject.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const objectsReducer = objectsSlice.reducer
