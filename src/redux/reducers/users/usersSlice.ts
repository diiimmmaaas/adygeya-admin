import { createSlice } from '@reduxjs/toolkit'
import { postUser } from '../../actions/usersActions'

export interface IUsers {
  isLoading: boolean
  error: unknown | string
}

const initialState: IUsers = {
  isLoading: false,
  error: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postUser.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(postUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const usersReducer = usersSlice.reducer
