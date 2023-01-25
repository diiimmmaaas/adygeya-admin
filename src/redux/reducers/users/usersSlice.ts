import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../../actions/authActions'

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
    // builder.addCase(loginUser.pending, (state) => {
    //   state.isLoading = true
    // })
    // builder.addCase(loginUser.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.error = ''
    // })
    // builder.addCase(loginUser.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.error = action.payload
    // })
  },
})

export const authReducer = usersSlice.reducer
