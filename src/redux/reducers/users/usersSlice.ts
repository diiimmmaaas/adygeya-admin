import { createSlice } from '@reduxjs/toolkit'
import { getUsers, postUser } from '../../actions/usersActions'
import { ObjectResponseMetaType, UsersResponseDataType } from '../../types/types'

export interface IUsers {
  users: UsersResponseDataType[]
  meta: ObjectResponseMetaType
  isLoading: boolean
  error: unknown | string
}

const initialState: IUsers = {
  users: [],
  meta: {
    hasNextPage: true,
    hasPreviousPage: false,
    itemCount: 0,
    page: 0,
    pageCount: 5,
    take: 5,
  },
  isLoading: false,
  error: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.data
      state.meta.page = action.payload.meta.page
      state.meta.pageCount = action.payload.meta.pageCount
      state.meta.hasNextPage = action.payload.meta.hasNextPage
      state.meta.hasPreviousPage = action.payload.meta.hasPreviousPage
      state.meta.itemCount = action.payload.meta.itemCount
      state.meta.take = action.payload.meta.take
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postUser.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(postUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const usersReducer = usersSlice.reducer
