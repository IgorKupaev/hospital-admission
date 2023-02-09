import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authReg } from './actionCreators';
import type { IRegResponse } from './actionCreators';
import type { IRegState } from '../../interfaces/IRegState';

const initialState: IRegState = {
  user: {
    login: '',
    password: ''
  },
  token: '',
  error: '',
  isLoading: false,
  regStatus: ''
};

export const registerSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authReg.fulfilled, (state, action: PayloadAction<IRegResponse>) => {
        state.isLoading = false;
        state.regStatus = String(action.payload);
      })
      .addCase(authReg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authReg.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default registerSlice.reducer;
