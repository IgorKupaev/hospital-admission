import type { ChangeEvent, FocusEvent } from 'react';

export interface IFormInputProps {
  title: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  type?: string
};
