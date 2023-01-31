import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { CreateUserType } from '../../pages/CreateUsersPage/CreateUsersPage'
import { handleAppRequestError } from '../utils/error-utils'
import { RoutesResponseType, UsersResponseType } from '../types/types'

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (
    { page, size, search, token }: { page: number; size: number; search: string; token: string },
    thunkAPI,
  ) => {
    try {
      const res = await instance.get<UsersResponseType>(
        `users/?page=${page}&size=${size}${search ? `&search=${search}` : ''}`,
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

export const postUser = createAsyncThunk(
  'user/postUser',
  async ({ userData, token }: { userData: CreateUserType; token: string }, thunkAPI) => {
    try {
      const response = await instance.post(
        'users',
        {
          login: userData.login,
          password: userData.password,
          roles: userData.roles,
        },
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

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ id, token }: { id: number; token: string }, thunkAPI) => {
    try {
      const res = await instance.delete(`users/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })

      return res.data
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(handleAppRequestError(error))
    }
  },
)
