import { createSlice } from '@reduxjs/toolkit';

interface IValidState {
  isEmptyLogin: boolean
  minLengthErrorLogin: boolean
  containsDigitAndLatinLogin: boolean
  isDirtyLogin: boolean
  isEmptyPassword: boolean
  minLengthErrorPassword: boolean
  containsDigitAndLatinPassword: boolean
  isDirtyPassword: boolean
  isEmptyConfirm: boolean
  minLengthErrorConfirm: boolean
  containsDigitAndLatinConfirm: boolean
  isDirtyConfirm: boolean
  isConfirmAccepted: boolean
}

const initialState: IValidState = {
  isEmptyLogin: false,
  minLengthErrorLogin: false,
  containsDigitAndLatinLogin: false,
  isDirtyLogin: false,
  isEmptyPassword: false,
  minLengthErrorPassword: false,
  containsDigitAndLatinPassword: false,
  isDirtyPassword: false,
  isEmptyConfirm: false,
  minLengthErrorConfirm: false,
  containsDigitAndLatinConfirm: false,
  isDirtyConfirm: false,
  isConfirmAccepted: true
};

export const sortSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsEmptyLogin: (state, action) => {
      state.isEmptyLogin = action.payload.isEmpty;
    },
    setMinLengthErrorLogin: (state, action) => {
      state.minLengthErrorLogin = action.payload.minLengthError;
    },
    setContainsDigitAndLatinLogin: (state, action) => {
      state.containsDigitAndLatinLogin = action.payload.containsDigitAndLatin;
    },
    setIsDirtyLogin: (state, action) => {
      state.isDirtyLogin = action.payload.isDirty;
    },
    setIsEmptyPassword: (state, action) => {
      state.isEmptyPassword = action.payload.isEmpty;
    },
    setMinLengthErrorPassword: (state, action) => {
      state.minLengthErrorPassword = action.payload.minLengthError;
    },
    setContainsDigitAndLatinPassword: (state, action) => {
      state.containsDigitAndLatinPassword = action.payload.containsDigitAndLatin;
    },
    setIsDirtyPassword: (state, action) => {
      state.isDirtyPassword = action.payload.isDirty;
    },
    setIsEmptyConfirm: (state, action) => {
      state.isEmptyConfirm = action.payload.isEmpty;
    },
    setMinLengthErrorConfirm: (state, action) => {
      state.minLengthErrorConfirm = action.payload.minLengthError;
    },
    setContainsDigitAndLatinConfirm: (state, action) => {
      state.containsDigitAndLatinConfirm = action.payload.containsDigitAndLatin;
    },
    setIsDirtyConfirm: (state, action) => {
      state.isDirtyConfirm = action.payload.isDirty;
    },
    setIsConfirmAccepted: (state, action) => {
      state.isConfirmAccepted = action.payload.isConfirmAccepted;
    }
  }
});

export default sortSlice.reducer;
export const {
  setIsEmptyLogin,
  setMinLengthErrorLogin,
  setContainsDigitAndLatinLogin,
  setIsDirtyLogin,
  setIsEmptyPassword,
  setMinLengthErrorPassword,
  setContainsDigitAndLatinPassword,
  setIsDirtyPassword,
  setIsEmptyConfirm,
  setMinLengthErrorConfirm,
  setContainsDigitAndLatinConfirm,
  setIsDirtyConfirm,
  setIsConfirmAccepted
} = sortSlice.actions;
