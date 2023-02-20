import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { handleAppRequestError } from '../utils/error-utils'
import { CheckedParametersType } from '../../pages/CreateObjectPage/types'
import { GetCurrentObjectType, ObjectResponseType } from '../types/types'
import { Order } from '../../components/TableComponent/TableComponent';
import { setCookie } from 'nookies';

export const getObjects = createAsyncThunk(
  'objects/getObjects',
  async (
    { page, size, search, token, order, orderBy }: { page: number; size: number; search: string; token: string, order?: Order, orderBy?: string },
    thunkAPI,
  ) => {
    try {
      const res = await instance.get<ObjectResponseType>(
        `landmarks/?page=${page}&size=${size}${search ? `&search=${search}` : ''}${order ? `&sort=${order}` : ''}${orderBy ? `&sortBy=${orderBy}` : ''}`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      )

      order &&
      setCookie(null, 'order', order, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })

      orderBy &&
      setCookie(null, 'orderBy', orderBy, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })

      return { data: res.data, order: order as Order, orderBy: orderBy as string }
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const changeObject = createAsyncThunk(
  'object/changeObject',
  async (
    {
      objectId,
      checkedParameters,
      token,
    }: { objectId: number; checkedParameters: CheckedParametersType; token: string },
    thunkAPI,
  ) => {
    try {
      let isoPublish = null

      if (checkedParameters?.publishAt) {
        const publish = checkedParameters?.publishAt.split('-').reverse().join('-')
        const publishObj = new Date(publish)
        isoPublish = publishObj.toISOString()
      } else {
        isoPublish = null
      }
      const refactoringParameters = {
        ...checkedParameters,
        publishAt: isoPublish,
        location: {
          ...checkedParameters.location,
          latitude: +checkedParameters.location.latitude,
          longitude: +checkedParameters.location.longitude,
        },
      }

      const response = await instance.put(`landmarks/${objectId}`, refactoringParameters, {
        headers: { authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const getCurrentObject = createAsyncThunk(
  'object/getCurrentObject',
  async ({ id, token }: { id: number | undefined; token: string }, thunkAPI) => {
    try {
      const res = await instance.get<GetCurrentObjectType>(`landmarks/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })

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
      let isoPublish = null

      if (checkedParameters?.publishAt) {
        const publish = checkedParameters?.publishAt.split('-').reverse().join('-')
        const publishObj = new Date(publish)
        isoPublish = publishObj.toISOString()
      } else {
        isoPublish = null
      }
      const refactoringParameters = {
        ...checkedParameters,
        publishAt: isoPublish,
        location: {
          ...checkedParameters.location,
          latitude: +checkedParameters.location.latitude,
          longitude: +checkedParameters.location.longitude,
        },
      }

      const response = await instance.post('landmarks', refactoringParameters, {
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

export const deleteObject = createAsyncThunk(
  'object/deleteObject',
  async ({ id, token }: { id: number | null; token: string }, thunkAPI) => {
    try {
      const res = await instance.delete(`landmarks/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const deleteImageObject = createAsyncThunk(
  'object/deleteImageObject',
  async (
    { id, imageId, token }: { id: number; imageId: number | null; token: string },
    thunkAPI,
  ) => {
    try {
      const res = await instance.delete(`landmarks/${id}/image/${imageId}`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return res.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const deleteAudioObject = createAsyncThunk(
  'object/deleteAudioObject',
  async ({ id, token }: { id: number | null; token: string }, thunkAPI) => {
    try {
      const res = await instance.delete(`landmarks/${id}/audio`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return res.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const publishObject = createAsyncThunk(
  'objects/publishObject',
  async ({ objectId, token }: { objectId: number | null; token: string }, thunkAPI) => {
    try {
      const response = await instance.post(
        `landmarks/${objectId}/publish`,
        {},
        {
          headers: { authorization: `Bearer ${token}` },
        },
      )

      return response.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)
