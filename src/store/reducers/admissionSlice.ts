import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { editAdmissions, getAdmissions } from './actionCreators';
import type { IAdmission } from '../../interfaces/IAdmission';
import type { IAdmissionsState } from '../../interfaces/IAdmissionsState';

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
  extraReducers: (builder) => {
    builder
      .addCase(getAdmissions.fulfilled, (state, action: PayloadAction<IAdmission[]>) => {
        state.isLoading = false;
        state.error = '';
        state.admissions = action.payload;
      })
      .addCase(getAdmissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdmissions.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editAdmissions.fulfilled, (state, action: PayloadAction<IAdmission[]>) => {
        state.isLoading = false;
        state.error = '';
        state.admissions = action.payload;
      })
      .addCase(editAdmissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAdmissions.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default admissionSlice.reducer;
export const { clearAdmissions, createAdmission } = admissionSlice.actions;
