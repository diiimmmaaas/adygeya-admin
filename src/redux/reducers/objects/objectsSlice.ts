import { createSlice } from '@reduxjs/toolkit'
import {
  deleteObject,
  getCurrentObject,
  getObjects,
  postAudioForObject,
  postImageForObject,
  postObject,
} from '../../actions/objectsActions'
import {
  AudioType,
  CategoryType,
  ContactType,
  FilterType,
  GetCurrentNewsType,
  GetCurrentObjectType,
  ImagesType,
  LocationType,
  ObjectResponseDataType,
  ObjectResponseMetaType,
  ScheduleType,
} from '../../types/types'

export interface IObjects {
  objects: ObjectResponseDataType[]
  meta: ObjectResponseMetaType
  currentObject: GetCurrentObjectType
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
    builder.addCase(getCurrentObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCurrentObject.fulfilled, (state, action) => {
      state.currentObject.id = action.payload.id
      state.currentObject.name = action.payload.name
      state.currentObject.icon = action.payload.icon
      state.currentObject.published = action.payload.published
      state.currentObject.publishAt = action.payload.publishAt
      state.currentObject.audio.audio = action.payload.audio.audio
      state.currentObject.audio.length = action.payload.audio.length
      state.currentObject.audio.voiced = action.payload.audio.voiced
      state.currentObject.audio.voicedLink = action.payload.audio.voicedLink
      state.currentObject.images = action.payload.images
      state.currentObject.description = action.payload.description
      state.currentObject.location.longitude = action.payload.location.longitude
      state.currentObject.location.latitude = action.payload.location.latitude
      state.currentObject.location.address = action.payload.location.address
      state.currentObject.schedule = action.payload.schedule
      state.currentObject.contacts = action.payload.contacts
      state.currentObject.categories = action.payload.categories
      state.currentObject.filters = action.payload.filters

      state.isLoading = false
      state.error = ''
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
