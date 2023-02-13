export interface IUseInput {
  value: string
  isDirty: boolean
  onChange: (value: string) => void
  onBlur: (value: string) => void
  isEmpty: boolean
  minLengthError: boolean
  containsDigitAndLatin: boolean
};
