import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { setCookie } from 'nookies'
import { handleAppRequestError } from '../utils/error-utils'

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await instance.post('auth/login', { username: username, password: password })

      response.data.token &&
        setCookie(null, 'authToken', response.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })

      response.data.roles &&
        setCookie(null, 'userRole', response.data.roles[0], {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)
