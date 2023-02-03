import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { handleAppRequestError } from '../utils/error-utils'
import { RoutesResponseType } from '../types/types'

export const getRoutes = createAsyncThunk(
  'routes/getRoutes',
  async (
    { page, size, search, token }: { page: number; size: number; search: string; token: string },
    thunkAPI,
  ) => {
    try {
      const res = await instance.get<RoutesResponseType>(
        `routes/?page=${page}&size=${size}${search ? `&search=${search}` : ''}`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      )

      return res.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const addAudioForRoutes = createAsyncThunk(
  'routes/addAudioForRoutes',
  async ({ formData, token }: { formData: any; token: string }, thunkAPI) => {
    try {
      const response = await instance.post('audio', formData, {
        headers: { authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)
