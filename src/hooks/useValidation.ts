import { setContainsDigitAndLatin, setIsEmpty, setMinLengthError } from '../store/reducers/validSlice';
import { store } from '../store/store';

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

export const useValidation = (value: string, validations: IValidations): IUseValidation => {
  const { isEmpty, minLengthError, containsDigitAndLatin } = { isEmpty: true, minLengthError: false, containsDigitAndLatin: false };

  // В родительской компоненте сделать обновление при изменении value, useEffect(() => {}, [value]);
  for (const validation in validations) {
    switch (validation) {
      case 'minLength':
        value.length < validations[validation] ? store.dispatch(setMinLengthError(true)) : store.dispatch(setMinLengthError(false));
        break;
      case 'isEmpty':
        typeof value === 'string' && value !== '' ? store.dispatch(setIsEmpty(false)) : store.dispatch(setIsEmpty(true));
        break;
      case 'containsDigitAndLatin':
        /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\][{}|';:/.,?><]*$/.test(value) ? store.dispatch(setContainsDigitAndLatin(false)) : store.dispatch(setContainsDigitAndLatin(true));
    }
  }

  return {
    isEmpty,
    minLengthError,
    containsDigitAndLatin
  };
};
