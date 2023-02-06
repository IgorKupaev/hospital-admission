import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authLogin } from './actionCreators';
import type { ILoginResponse } from './actionCreators';
import type { IUser } from '../../models/IUser';

interface ILoginState {
  user: IUser
  token: string | null
  error: string
  isLoading: boolean
}

const initialState: ILoginState = {
  user: {
    login: '',
    password: ''
  },
  token: localStorage.getItem('token') !== null ? localStorage.getItem('token') : '',
  error: '',
  isLoading: false
};

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser: (state, action: PayloadAction<ILoginResponse>) => {
      const { token } = action.payload;
      state.user = action.payload.user;
      state.token = token;
      localStorage.setItem('token', token);
    },
    logoutUser: (state) => {
      state.token = '';
      state.user = {
        password: '',
        login: ''
      };
      state.error = '';
      localStorage.setItem('token', '');
    }
  },
  extraReducers: {
    [authLogin.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [authLogin.pending.type]: (state) => {
      state.isLoading = true;
    },
    [authLogin.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default loginSlice.reducer;
export const { authUser, logoutUser } = loginSlice.actions;
