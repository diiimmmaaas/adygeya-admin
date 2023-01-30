import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { handleAppRequestError } from '../utils/error-utils'
import { CheckedParametersType } from '../../pages/CreateObjectPage/types'
import { ObjectResponseType } from '../types/types'

export const getObjects = createAsyncThunk(
  'objects/getObjects',
  async (
    { page, size, search, token }: { page: number; size: number; search: string; token: string },
    thunkAPI,
  ) => {
    try {
      const res = await instance.get<ObjectResponseType>(
        `landmarks/?page=${page}&size=${size}${search ? `&search=${search}` : ''}`,
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

export const postObject = createAsyncThunk(
  'objects/postObject',
  async (
    { checkedParameters, token }: { checkedParameters: CheckedParametersType; token: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.post('landmarks', checkedParameters, {
        headers: { authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const postImageForObject = createAsyncThunk(
  'objects/postImageForObject',
  async (
    { formData, id, token }: { formData: any; id: number | null; token: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.post(`landmarks/${id}/image`, formData, {
        headers: { authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const postAudioForObject = createAsyncThunk(
  'objects/postAudioForObject',
  async (
    { formData, id, token }: { formData: any; id: number | null; token: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.post(`landmarks/${id}/audio`, formData, {
        headers: { authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)
