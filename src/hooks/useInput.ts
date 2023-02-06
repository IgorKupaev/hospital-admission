import { useState } from 'react';
import { useValidation } from './useValidation';

export const useInput = (initialValue: any, validations: any): any => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onChange = (value: string): void => {
    setValue(value);
  };

  const onBlur = (e: any): void => {
    setIsDirty(true);
  };

  return {
    value,
    isDirty,
    onChange,
    onBlur,
    ...valid
  };
};
