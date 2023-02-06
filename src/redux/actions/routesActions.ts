import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { handleAppRequestError } from '../utils/error-utils'
import { GetCurrentNewsType, GetCurrentRouteType, RoutesResponseType } from '../types/types'
import { CheckedParametersType } from '../../pages/CreateObjectPage/types'
import { CheckedRouteParametersType } from '../../pages/CreateRoutePage/CreateRoutePage'
import waypoints from '../../components/Waypoints/Waypoints'
import { CheckedNewsParametersType } from '../../pages/CreateNewsPage/CreateNewsPage'

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

export const postRoutes = createAsyncThunk(
  'routes/postRoutes',
  async (
    {
      checkedRouteParameters,
      token,
    }: { checkedRouteParameters: CheckedRouteParametersType; token: string },
    thunkAPI,
  ) => {
    try {
      let isoPublish = null

      if (checkedRouteParameters?.publishAt) {
        const publish = checkedRouteParameters?.publishAt.split('-').reverse().join('-')
        const publishObj = new Date(publish)
        isoPublish = publishObj.toISOString()
      } else {
        isoPublish = null
      }

      const newArr = checkedRouteParameters.waypoints.map((w, ind) => {
        return {
          ...w,
          location: {
            ...w.location,
            latitude: +(w.location.latitude as string),
            longitude: +(w.location.longitude as string),
          },
        }
      })

      const refactoringParameters = {
        ...checkedRouteParameters,
        publishAt: isoPublish,
        waypoints: newArr,
      }

      console.log(refactoringParameters)

      const res = await instance.post('routes', refactoringParameters, {
        headers: { authorization: `Bearer ${token}` },
      })

      return res.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const postImageForRoute = createAsyncThunk(
  'routes/postImageForRoute',
  async (
    { formData, id, token }: { formData: any; id: number | null; token: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.post(`routes/${id}/image`, formData, {
        headers: { authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const deleteRoute = createAsyncThunk(
  'route/deleteRoute',
  async ({ id, token }: { id: number | null; token: string }, thunkAPI) => {
    try {
      const res = await instance.delete(`routes/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const publishRoute = createAsyncThunk(
  'route/publishRoute',
  async ({ objectId, token }: { objectId: number | null; token: string }, thunkAPI) => {
    try {
      const response = await instance.post(
        `routes/${objectId}/publish`,
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

export const getCurrentRoute = createAsyncThunk(
  'route/getCurrentRoute',
  async ({ id, token }: { id: number | undefined; token: string }, thunkAPI) => {
    try {
      const res = await instance.get<GetCurrentRouteType>(`routes/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return res.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const deleteImageRoute = createAsyncThunk(
  'route/deleteImageRoute',
  async (
    { id, imageId, token }: { id: number; imageId: number | null; token: string },
    thunkAPI,
  ) => {
    try {
      const res = await instance.delete(`routes/${id}/image/${imageId}`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return res.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const changeRoute = createAsyncThunk(
  'route/changeRoute',
  async (
    {
      routeId,
      checkedRouteParameters,
      token,
    }: { routeId: number; checkedRouteParameters: CheckedRouteParametersType; token: string },
    thunkAPI,
  ) => {
    try {
      let isoPublish = null

      if (checkedRouteParameters?.publishAt) {
        const publish = checkedRouteParameters.publishAt.split('-').reverse().join('-')
        const publishObj = new Date(publish)
        isoPublish = publishObj.toISOString()
      }

      const refactoringParameters = {
        ...checkedRouteParameters,
        publishAt: isoPublish,
      }

      const response = await instance.put(`routes/${routeId}`, refactoringParameters, {
        headers: { authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)
