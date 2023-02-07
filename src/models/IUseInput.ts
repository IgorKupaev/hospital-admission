export interface IUseInput {
  value: string
  isDirty: boolean
  onChange: (value: any) => void
  onBlur: (value: any) => void
  isEmpty: boolean
  minLengthError: boolean
  containsDigitAndLatin: boolean
};
