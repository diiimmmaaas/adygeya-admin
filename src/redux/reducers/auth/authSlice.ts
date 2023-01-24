import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../../actions/authActions'
import nookies from 'nookies'

const cookies = nookies.get(null)

export interface IAuth {
  token: string
  userRoles: string[]
  isLoading: boolean
  isAuth: boolean
  error: unknown | string
}

const initialState: IAuth = {
  token: cookies.authToken ?? '',
  userRoles: [cookies.userRole ?? ''],
  isLoading: false,
  isAuth: Boolean(cookies.authToken),
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isLoading = false
      state.isAuth = false
      state.error = ''
      state.token = ''
      nookies.destroy(null, 'authToken')
      nookies.destroy(null, 'useRole')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isAuth = true
      state.error = ''
      state.token = action.payload.token
      state.userRoles = action.payload.roles
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer
