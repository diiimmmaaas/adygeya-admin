import { createSlice } from '@reduxjs/toolkit'
import { postObject } from '../../actions/objectsActions'

export interface IObjects {
  isLoading: boolean
  error: unknown | string
}

const initialState: IObjects = {
  isLoading: false,
  error: '',
}

export const objectsSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postObject.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postObject.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(postObject.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const objectsReducer = objectsSlice.reducer
