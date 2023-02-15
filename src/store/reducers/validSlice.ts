import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEmpty: false,
  minLengthError: false,
  containsDigitAndLatin: false
};

export const sortSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsEmpty: (state, action) => {
      state.isEmpty = action.payload.isEmpty;
    },
    setMinLengthError: (state, action) => {
      state.minLengthError = action.payload.minLengthError;
    },
    setContainsDigitAndLatin: (state, action) => {
      state.containsDigitAndLatin = action.payload.containsDigitAndLatin;
    },
  }
});

export default sortSlice.reducer;
export const { setIsEmpty, setMinLengthError, setContainsDigitAndLatin } = sortSlice.actions;
