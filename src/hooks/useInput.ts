import { useValidation } from './useValidation';
import type { IValidations } from './useValidation';
import type { IUseInput } from '../interfaces/IUseInput';
import { store } from '../store/store';
import { setIsDirtyConfirm, setIsDirtyPassword, setIsDirtyLogin } from '../store/reducers/validSlice';

export interface IUseInputProps {
  validations: IValidations
  setValue: (value: string) => void
  value: string
  isDirty: boolean
  setIsDirty: (value: boolean) => void
  name: string
}

export const useInput = ({ validations, setValue, value, isDirty, setIsDirty, name }: IUseInputProps): IUseInput => {
  const valid = useValidation(value, validations, name);
  if (name === 'password') {
    store.dispatch(setIsDirtyPassword({ isDirty }));
  };

  if (name === 'confirm') {
    store.dispatch(setIsDirtyConfirm({ isDirty }));
  };

  if (name === 'login') {
    store.dispatch(setIsDirtyLogin({ isDirty }));
  };

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
