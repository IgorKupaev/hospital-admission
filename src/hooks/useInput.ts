import { useValidation } from './useValidation';
import type { IValidations } from './useValidation';
import type { IUseInput } from '../interfaces/IUseInput';

export interface IUseInputProps {
  validations: IValidations
  setValue: (value: string) => void
  value: string
  isDirty: boolean
  setIsDirty: (value: boolean) => void
}

export const useInput = ({ validations, setValue, value, isDirty, setIsDirty }: IUseInputProps): IUseInput => {
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
