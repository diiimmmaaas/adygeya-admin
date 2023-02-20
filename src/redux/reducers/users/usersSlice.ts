import { createSlice } from '@reduxjs/toolkit'
import { changeUserRole, getUsers, postUser } from '../../actions/usersActions'
import { ObjectResponseMetaType, UsersResponseDataType } from '../../types/types'
import { Order } from '../../../components/TableComponent/TableComponent';

export interface IUsers {
  users: UsersResponseDataType[]
  meta: ObjectResponseMetaType
  isLoading: boolean
  order: Order
  orderBy: string
  error: any
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
  order: 'asc',
  orderBy: 'name',
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
      state.users = action.payload.data.data
      state.meta.page = action.payload.data.meta.page
      state.meta.pageCount = action.payload.data.meta.pageCount
      state.meta.hasNextPage = action.payload.data.meta.hasNextPage
      state.meta.hasPreviousPage = action.payload.data.meta.hasPreviousPage
      state.meta.itemCount = action.payload.data.meta.itemCount
      state.meta.take = action.payload.data.meta.take
      state.order = action.payload?.order
      state.orderBy = action.payload?.orderBy
      state.isLoading = false
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
    })
    builder.addCase(postUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(changeUserRole.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(changeUserRole.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(changeUserRole.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const usersReducer = usersSlice.reducer
