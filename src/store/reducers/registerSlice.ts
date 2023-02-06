import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authReg } from './actionCreators';
import type { IRegResponse } from './actionCreators';
import type { IUser } from '../../models/IUser';

interface IRegState {
  user: IUser
  token: string
  error: string
  isLoading: boolean
  regStatus: string
}

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
  reducers: {
    regUser: (state, action: PayloadAction<IRegResponse>) => {

    }
  },
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
export const { regUser } = registerSlice.actions;
