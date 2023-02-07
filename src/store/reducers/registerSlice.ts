import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authReg } from './actionCreators';
import type { IRegResponse } from './actionCreators';
import type { IRegState } from '../../models/IRegState';

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
  extraReducers: {
    [authReg.fulfilled.type]: (state, action: PayloadAction<IRegResponse>) => {
      state.isLoading = false;
      state.regStatus = String(action.payload);
    },
    [authReg.pending.type]: (state) => {
      state.isLoading = true;
    },
    [authReg.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default registerSlice.reducer;
