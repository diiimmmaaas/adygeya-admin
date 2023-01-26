import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { handleAppRequestError } from '../utils/error-utils'
import { CheckedParametersType } from '../../pages/CreateObjectPage/CreateObjectPage'

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
  async ({ formData, id, token }: { formData: any; id: number; token: string }, thunkAPI) => {
    try {
      const response = await instance.post(`landmarks/${id}/image`, formData, {
        headers: { authorization: `Bearer ${token}` },
      })

      console.log(response.data)

      // return response.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const postAudioForObject = createAsyncThunk(
  'objects/postAudioForObject',
  async ({ formData, id, token }: { formData: any; id: number; token: string }, thunkAPI) => {
    try {
      const response = await instance.post(`landmarks/${id}/audio`, formData, {
        headers: { authorization: `Bearer ${token}` },
      })

      console.log(response.data)

      // return response.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)
