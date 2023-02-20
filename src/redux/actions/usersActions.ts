import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { CreateUserType } from '../../pages/CreateUsersPage/CreateUsersPage'
import { handleAppRequestError } from '../utils/error-utils'
import { UsersResponseType } from '../types/types'
import { Order } from '../../components/TableComponent/TableComponent';
import { setCookie } from 'nookies';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (
    { page, size, search, token, order, orderBy }: { page: number; size: number; search: string; token: string, order?: Order, orderBy?: string },
    thunkAPI,
  ) => {
    try {
      const res = await instance.get<UsersResponseType>(
        `users/?page=${page}&size=${size}${search ? `&search=${search}` : ''}${order ? `&sort=${order}` : ''}${orderBy ? `&sortBy=${orderBy}` : ''}`,
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

export const changeUserRole = createAsyncThunk(
  'user/changeUserRole',
  async ({ id, roles, token }: { id: number | null; roles: string[]; token: string }, thunkAPI) => {
    try {
      const res = await instance.put(
        `users/${id}/roles`,
        { roles },
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
