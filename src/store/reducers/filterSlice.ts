import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  from: '',
  to: ''
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.from = action.payload.from;
      state.to = action.payload.to;
    },
    clearFilter: (state) => {
      state.from = initialState.from;
      state.to = initialState.to;
    }
  },
  extraReducers: {
  }
});

export default filterSlice.reducer;
export const { changeFilter, clearFilter } = filterSlice.actions;
