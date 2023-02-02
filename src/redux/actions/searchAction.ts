import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleAppRequestError } from '../utils/error-utils'
import { instance } from '../api/api'

export const postSearch = createAsyncThunk(
  'search/postSearch',
  async ({ query, token }: { query: string; token: string }, thunkAPI) => {
    try {
      const res = await instance.get(`search?query=${query}`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return res.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)
