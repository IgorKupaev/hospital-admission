import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { editAdmissions, getAdmissions } from './actionCreators';
import type { IAdmission } from '../../models/IAdmission';
import type { IAdmissionsState } from '../../models/IAdmissionsState';

const initialState: IAdmissionsState = {
  admissions: [],
  isLoading: false,
  error: ''
};

export const admissionSlice = createSlice({
  name: 'getAdmissions',
  initialState,
  reducers: {
    clearAdmissions: (state) => {
      localStorage.setItem('admissions', '');
      state.admissions = [];
    },
    createAdmission: (state, action) => {
      state.admissions = [...state.admissions, action.payload];
      localStorage.setItem('admissions', JSON.stringify(state.admissions));
    }
  },
  extraReducers: {
    [getAdmissions.fulfilled.type]: (state, action: PayloadAction<IAdmission[]>) => {
      state.isLoading = false;
      state.error = '';
      state.admissions = action.payload;
    },
    [getAdmissions.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAdmissions.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [editAdmissions.fulfilled.type]: (state, action: PayloadAction<IAdmission[]>) => {
      state.isLoading = false;
      state.error = '';
      state.admissions = action.payload;
    },
    [editAdmissions.pending.type]: (state) => {
      state.isLoading = true;
    },
    [editAdmissions.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default admissionSlice.reducer;
export const { clearAdmissions, createAdmission } = admissionSlice.actions;
