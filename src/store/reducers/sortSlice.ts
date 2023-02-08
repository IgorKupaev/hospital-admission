import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sort: 'none',
  direction: 'increase'
};

export const sortSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeSort: (state, action) => {
      state.sort = action.payload.sort;
      state.direction = action.payload.direction;
    }
  }
});

export default sortSlice.reducer;
export const { changeSort } = sortSlice.actions;
