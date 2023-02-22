import { createSlice } from '@reduxjs/toolkit'
import { GetFilterType } from '../../types/types';
import {
  deleteFilter, deletePointFromFilter,
  getFilters,
  postFilter,
  postPointForFilter
} from '../../actions/filtersActions';

export interface IFilters {
  filters: GetFilterType[]
  isLoading: boolean
  error: unknown | string
}

const initialState: IFilters = {
  filters: [],
  isLoading: false,
  error: '',
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFilters.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getFilters.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ''
      state.filters = action.payload
    })
    builder.addCase(getFilters.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postFilter.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postFilter.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(postFilter.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(deleteFilter.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteFilter.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(deleteFilter.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(postPointForFilter.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postPointForFilter.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(postPointForFilter.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(deletePointFromFilter.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deletePointFromFilter.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(deletePointFromFilter.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const filtersReducer = filtersSlice.reducer
