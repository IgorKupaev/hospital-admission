import { store } from '../store/store';

import { setIsEmptyLogin, setMinLengthErrorLogin, setContainsDigitAndLatinLogin, setIsEmptyPassword, setMinLengthErrorPassword, setContainsDigitAndLatinPassword, setIsEmptyConfirm, setMinLengthErrorConfirm, setContainsDigitAndLatinConfirm } from '../store/reducers/validSlice';

export interface IUseValidation {
  isEmpty: boolean
  minLengthError: boolean
  containsDigitAndLatin: boolean
}

export interface IValidations {
  isEmpty: boolean
  minLength: number
  containsDigitAndLatin: boolean
}

export const useValidation = (value: string, validations: IValidations, name: string): IUseValidation => {
  const { isEmpty, minLengthError, containsDigitAndLatin } = { isEmpty: true, minLengthError: false, containsDigitAndLatin: false };

  let setMinLengthError;
  let setIsEmpty;
  let setContainsDigitAndLatin;
  if (name === 'password') {
    setMinLengthError = setMinLengthErrorPassword;
    setIsEmpty = setIsEmptyPassword;
    setContainsDigitAndLatin = setContainsDigitAndLatinPassword;
  } else
  if (name === 'login') {
    setMinLengthError = setMinLengthErrorLogin;
    setIsEmpty = setIsEmptyLogin;
    setContainsDigitAndLatin = setContainsDigitAndLatinLogin;
  } else
  if (name === 'confirm') {
    setMinLengthError = setMinLengthErrorConfirm;
    setIsEmpty = setIsEmptyConfirm;
    setContainsDigitAndLatin = setContainsDigitAndLatinConfirm;
  } else {
    setMinLengthError = () => {};
    setIsEmpty = () => {};
    setContainsDigitAndLatin = () => {};
  }

  for (const validation in validations) {
    switch (validation) {
      case 'minLength':
        value.length < validations[validation] ? store.dispatch(setMinLengthError({ minLengthError: true })) : store.dispatch(setMinLengthError({ minLengthError: false }));
        break;
      case 'isEmpty':
        typeof value === 'string' && value !== '' ? store.dispatch(setIsEmpty({ isEmpty: false })) : store.dispatch(setIsEmpty({ isEmpty: true }));
        break;
      case 'containsDigitAndLatin':
        /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\][{}|';:/.,?><]*$/.test(value) ? store.dispatch(setContainsDigitAndLatin({ containsDigitAndLatin: true })) : store.dispatch(setContainsDigitAndLatin({ containsDigitAndLatin: false }));
    }
  }

  return {
    isEmpty,
    minLengthError,
    containsDigitAndLatin
  };
};
