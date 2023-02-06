export interface IUseErrors {
  loginLength: boolean
  passwordEmpty: boolean
  latinAndDigit: boolean
  passwordLength: boolean
  loginEmpty: boolean
  isDisabled: () => boolean
}

export interface IUseErrorsProps {
  isDirty: boolean
  isEmpty: boolean
  containsDigitAndLatin: boolean
  minLengthError: boolean

}

export const useErrors = (password: IUseErrorsProps, login: IUseErrorsProps): IUseErrors => {
  const loginLength: boolean = (login.isDirty && login.minLengthError);
  const passwordEmpty: boolean = (password.isDirty && password.isEmpty && !loginLength);
  const latinAndDigit: boolean = (login.isDirty && login.containsDigitAndLatin) || (password.isDirty && password.containsDigitAndLatin);
  const passwordLength: boolean = (password.isDirty && password.minLengthError);
  const loginEmpty: boolean = login.isDirty && login.isEmpty && !loginLength;
  const isDisabled = (): boolean => {
    if (loginLength ||
        passwordEmpty ||
        latinAndDigit ||
        passwordLength ||
        loginEmpty) return true;
    return false;
  };
  return {
    loginLength,
    passwordEmpty,
    latinAndDigit,
    passwordLength,
    loginEmpty,
    isDisabled
  };
};
