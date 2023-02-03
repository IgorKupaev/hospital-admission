import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { IUser } from '../../models/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IAdmission } from '../../models/IAdmission';

export interface ILoginResponse {
  token: string
  user: IUser
}

export interface IRegResponse {
  login: string
  password: string
}

export const authLogin = createAsyncThunk(
  'auth/login',
  async (body: AxiosRequestConfig<any>, thunkAPI) => {
    try {
      const response = await axios.post<ILoginResponse>('http://localhost:8000/login', body.data);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('User not found');
    }
  }
);

export const authReg = createAsyncThunk(
  'auth/reg',
  async (body: AxiosRequestConfig<any>) => {
    try {
      const response = await axios.post<IRegResponse>('http://localhost:8000/registration', body.data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const getAdmissions = createAsyncThunk(
  'get/admissions',
  async () => {
    try {
      const response = await axios.get<IAdmission[]>('http://localhost:8000/admissions');
      localStorage.setItem('admissions', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
