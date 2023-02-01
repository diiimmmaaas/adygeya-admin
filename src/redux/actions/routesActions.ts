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

export const postRoutes = createAsyncThunk(
  'routes/postRoutes',
  async (
    {
      name,
      description,
      waypoints,
      publishAt,
      token,
    }: {
      name: string
      description: string
      waypoints: any[]
      publishAt: Date
      token: string
    },
    thunkAPI,
  ) => {
    try {
      const res = await instance.post(
        'routes',
        {
          name: name,
          description: description,
          waypoints: waypoints,
          publishAt: publishAt,
        },
        { headers: { authorization: `Bearer ${token}` } },
      )

      console.log('POST ROUTE DATA', res)
      return res.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)
