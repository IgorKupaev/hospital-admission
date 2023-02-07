import React from 'react';
import type { FC } from 'react';
import { useErrors } from '../../hooks/useErrors';
import type { IUseErrorsProps, IUseErrors } from '../../hooks/useErrors';
import styles from './FormErrors.module.scss';

export interface IFormErrorsProps {
  password: IUseErrorsProps
  login: IUseErrorsProps
  confirmError: boolean
}

const FormErrors: FC<IFormErrorsProps> = ({ password, login, confirmError }): JSX.Element => {
  const { loginLength, passwordEmpty, latinAndDigit, passwordLength, loginEmpty }: IUseErrors = useErrors(password, login);
  return (
    <div>
      {passwordEmpty && <span className={styles.err}>Укажите пароль</span>}
      {latinAndDigit && <span className={styles.err}>Логин и пароль должны содержать цифры и латинские буквы</span>}
      {passwordLength && <span className={styles.err}>Пароль должен содержать хотя бы 6 символов</span>}
      {loginEmpty && <span className={styles.err}>Укажите логин</span>}
      {loginLength && <span className={styles.err}>Логин должен содержать хотя бы 6 символов</span>}
      {confirmError && <span className={styles.err}>Подтвердите пароль</span>}
    </div>
  );
};

export default FormErrors;
