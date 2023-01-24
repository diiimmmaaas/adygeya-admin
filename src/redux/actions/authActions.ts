import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'

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
