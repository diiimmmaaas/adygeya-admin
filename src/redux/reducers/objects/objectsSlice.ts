import { createSlice } from '@reduxjs/toolkit'
import { postObject } from '../../actions/objectsActions'

export interface IObjects {
  id: number | null
  isLoading: boolean
  error: unknown | string
}

const initialState: IObjects = {
  id: null,
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
    builder.addCase(postObject.fulfilled, (state, action) => {
      state.id = action.payload.id
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
