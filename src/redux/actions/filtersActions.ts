import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { handleAppRequestError } from '../utils/error-utils'

export const getFilters = createAsyncThunk(
  'filters/getFilters',
  async ({ categoryId, token }: { categoryId: number; token: string }, thunkAPI) => {
    try {
      const response = await instance.get(`category/${categoryId}/filters`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const postFilter = createAsyncThunk(
  'filters/postFilter',
  async (
    { categoryId, name, token }: { categoryId: number; name: string; token: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.post(
        `category/${categoryId}/filters`,
        {
          name: name,
          values: [],
        },
        {
          headers: { authorization: `Bearer ${token}` },
        },
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const deleteFilter = createAsyncThunk(
  'filters/deleteFilter',
  async (
    { categoryId, filterId, token }: { categoryId: number; filterId: number; token: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.delete(`category/${categoryId}/filters/${filterId}`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const postPointForFilter = createAsyncThunk(
  'filters/postPointForFilter',
  async (
    {
      categoryId,
      filterId,
      name,
      value,
      token,
    }: { categoryId: number; filterId: number; name: string; value: string, token: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.put(
        `category/${categoryId}/filters/${filterId}`,
        {
          name: name,
          values: [value],
        },
        {
          headers: { authorization: `Bearer ${token}` },
        },
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

export const deletePointFromFilter = createAsyncThunk(
  'filters/deletePointFromFilter',
  async (
    {
      categoryId,
      filterId,
      valueId,
      token,
    }: { categoryId: number; filterId: number; valueId: number; token: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.delete(
        `category/${categoryId}/filters/${filterId}/values/${valueId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)

