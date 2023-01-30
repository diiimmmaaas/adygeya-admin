import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { handleAppRequestError } from '../utils/error-utils'
import { CheckedNewsParametersType } from '../../pages/CreateNewsPage/CreateNewsPage'

export const postNews = createAsyncThunk(
  'news/postNews',
  async (
    {
      checkedNewsParameters,
      token,
    }: { checkedNewsParameters: CheckedNewsParametersType; token: string },
    thunkAPI,
  ) => {
    try {
      const date = checkedNewsParameters.date.split('-').reverse().join('-')
      const publish = checkedNewsParameters.publishAt.split('-').reverse().join('-')
      const dateObj = new Date(date)
      const publishObj = new Date(publish)
      const isoDate = dateObj.toISOString().slice(0, 10)
      const isoPublish = publishObj.toISOString()
      const refactoringParameters = {
        ...checkedNewsParameters,
        date: isoDate,
        publishAt: isoPublish,
      }

      const response = await instance.post('news', refactoringParameters, {
        headers: { authorization: `Bearer ${token}` },
      })

      console.log(response.data)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const postImageForNews = createAsyncThunk(
  'news/postImageForNews',
  async (
    { formData, id, token }: { formData: any; id: number | null; token: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.post(`news/${id}/image`, formData, {
        headers: { authorization: `Bearer ${token}` },
      })

      console.log(response.data)

      return response.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const postHighlightForNews = createAsyncThunk(
  'news/postHighlightForNews',
  async (
    { formData, id, token }: { formData: any; id: number | null; token: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.post(`news/${id}/stories/image`, formData, {
        headers: { authorization: `Bearer ${token}` },
      })

      console.log(response.data)

      return response.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)
