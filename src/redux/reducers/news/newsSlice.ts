import { createSlice } from '@reduxjs/toolkit'
import { postAudioForObject, postImageForObject, postObject } from '../../actions/objectsActions'

export interface INews {
  id: number | null
  isLoading: boolean
  isLoadingPhoto: boolean
  error: unknown | string
}

const initialState: INews = {
  id: null,
  isLoading: false,
  isLoadingPhoto: false,
  error: '',
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(postObject.pending, (state) => {
    //   state.isLoading = true
    // })
    // builder.addCase(postObject.fulfilled, (state, action) => {
    //   state.id = action.payload.id
    //   state.isLoading = false
    //   state.error = ''
    // })
    // builder.addCase(postObject.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.error = action.payload
    // })
    // builder.addCase(postImageForObject.pending, (state) => {
    //   state.isLoadingPhoto = true
    // })
    // builder.addCase(postImageForObject.fulfilled, (state) => {
    //   state.isLoadingPhoto = false
    //   state.error = ''
    // })
    // builder.addCase(postImageForObject.rejected, (state, action) => {
    //   state.isLoadingPhoto = false
    //   state.error = action.payload
    // })
    // builder.addCase(postAudioForObject.pending, (state) => {
    //   state.isLoadingAudio = true
    // })
    // builder.addCase(postAudioForObject.fulfilled, (state) => {
    //   state.isLoadingAudio = false
    //   state.error = ''
    // })
    // builder.addCase(postAudioForObject.rejected, (state, action) => {
    //   state.isLoadingAudio = false
    //   state.error = action.payload
    // })
  },
})

export const newsReducer = newsSlice.reducer
