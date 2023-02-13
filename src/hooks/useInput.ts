import { useState } from 'react';
import { useValidation } from './useValidation';
import type { IValidations } from './useValidation';
import type { IUseInput } from '../interfaces/IUseInput';

export const useInput = (initialValue: string, validations: IValidations): IUseInput => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const valid = useValidation(value, validations);
  const onChange = (value: string): void => {
    setValue(value);
  };

  const onBlur = (): void => {
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
