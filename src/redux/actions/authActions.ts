import React from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'

// export const loginUser = createAsyncThunk('auth/login', async (formData: any, thunkAPI) => {
//   try {
//     const response = await instance.post<LoginResponseType>('login/oauth', formData)
//
//     response.data.access_token &&
//       setCookie(null, 'authToken', response.data.access_token, {
//         maxAge: 30 * 24 * 60 * 60,
//         path: '/',
//       })
//
//     response.data.user_profile_id &&
//       setCookie(null, 'userId', response.data.user_profile_id, {
//         maxAge: 30 * 24 * 60 * 60,
//         path: '/',
//       })
//
//     response.data.user_role &&
//       setCookie(null, 'userRole', response.data.user_role, {
//         maxAge: 30 * 24 * 60 * 60,
//         path: '/',
//       })
//
//     return response.data
//   } catch (error) {
//     return thunkAPI.rejectWithValue(handleAppRequestError(error))
//   }
// })

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await instance.post('auth/login', { username: username, password: password })

      console.log(response.data)

      // return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)
