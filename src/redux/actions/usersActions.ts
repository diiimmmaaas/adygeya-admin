import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { CreateUserType } from '../../pages/CreateUsersPage/CreateUsersPage'
import { handleAppRequestError } from '../utils/error-utils'

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
