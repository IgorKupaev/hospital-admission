import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authLogin } from './actionCreators';
import type { ILoginResponse } from './actionCreators';
import type { ILoginState } from '../../interfaces/ILoginState';

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
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.fulfilled, (state, action: PayloadAction<any>) => {
        if (typeof action.payload.user.login !== 'undefined') {
          state.user = action.payload.user;
        }
        state.isLoading = false;
        state.error = action.payload;
        state.user = initialState.user;
        state.token = action.payload.token;
      })
      .addCase(authLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authLogin.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default loginSlice.reducer;
export const { authUser, logoutUser } = loginSlice.actions;
