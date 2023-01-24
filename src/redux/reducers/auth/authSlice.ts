import { createSlice } from '@reduxjs/toolkit'

export interface IAuth {
  token: string
  userProfileId: string
  userRole: string
  isLoading: boolean
  isAuth: boolean
  error: unknown | string
}

const initialState: IAuth = {
  token: '',
  userProfileId: '',
  userRole: '',
  isLoading: false,
  isAuth: false,
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(loginUser.pending, (state) => {
    //   state.isLoading = true
    // })
    // builder.addCase(loginUser.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.isAuth = true
    //   state.error = ''
    //   state.token = action.payload.access_token
    //   state.userProfileId = action.payload.user_profile_id
    //   state.userRole = action.payload.user_role
    // })
    // builder.addCase(loginUser.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.error = action.payload
    // })
  },
})

export const authReducer = authSlice.reducer
