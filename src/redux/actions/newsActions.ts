import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { handleAppRequestError } from '../utils/error-utils'
import { CheckedNewsParametersType } from '../../pages/CreateNewsPage/CreateNewsPage'
import { GetCurrentNewsType, NewsResponseType } from '../types/types'

export const getNews = createAsyncThunk(
  'news/getNews',
  async (
    { page, size, search, token }: { page: number; size: number; search: string; token: string },
    thunkAPI,
  ) => {
    try {
      const res = await instance.get<NewsResponseType>(
        `news/?page=${page}&size=${size}${search ? `&search=${search}` : ''}`,
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

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const changeNews = createAsyncThunk(
  'news/changeNews',
  async (
    {
      newsId,
      checkedNewsParameters,
      token,
    }: { newsId: number; checkedNewsParameters: CheckedNewsParametersType; token: string },
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

      const response = await instance.put(`news/${newsId}`, refactoringParameters, {
        headers: { authorization: `Bearer ${token}` },
      })

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

      return response.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async ({ id, token }: { id: number; token: string }, thunkAPI) => {
    try {
      const res = await instance.delete(`news/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return res.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const getCurrentNews = createAsyncThunk(
  'news/getCurrentNews',
  async ({ id, token }: { id: number | undefined; token: string }, thunkAPI) => {
    try {
      const res = await instance.get<GetCurrentNewsType>(`news/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return res.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)
