import React from 'react';

import styles from './FormErrors.module.scss';

import type { IFormErrorsProps } from '../../interfaces/propTypes/IFormErrorsProps';
import type { IUseErrors } from '../../interfaces/IUseErrors';
import { store } from '../../store/store';

interface FormErrorsState {
  conditions: IUseErrors
}
class FormErrors extends React.Component<IFormErrorsProps, FormErrorsState> {
  isDirtyPassword: boolean = store.getState().validReducer.isDirtyPassword;
  isEmptyPassword: boolean = store.getState().validReducer.isEmptyPassword;
  isDirtyLogin: boolean = store.getState().validReducer.isDirtyLogin;
  isEmptyLogin: boolean = store.getState().validReducer.isEmptyLogin;
  correctCharsPassword: boolean = store.getState().validReducer.containsDigitAndLatinPassword;
  correctCharsLogin: boolean = store.getState().validReducer.containsDigitAndLatinLogin;
  lenghtErrorPassword: boolean = store.getState().validReducer.minLengthErrorPassword;
  lengthErrorLogin: boolean = store.getState().validReducer.minLengthErrorLogin;
  isConfirmAccepted: boolean = store.getState().validReducer.isConfirmAccepted;

  componentDidUpdate (): void {
    this.isDirtyPassword = store.getState().validReducer.isDirtyPassword;
    this.isEmptyPassword = store.getState().validReducer.isEmptyPassword;
    this.isDirtyLogin = store.getState().validReducer.isDirtyLogin;
    this.isEmptyLogin = store.getState().validReducer.isEmptyLogin;
    this.correctCharsPassword = store.getState().validReducer.containsDigitAndLatinPassword;
    this.correctCharsLogin = store.getState().validReducer.containsDigitAndLatinLogin;
    this.lenghtErrorPassword = store.getState().validReducer.minLengthErrorPassword;
    this.lengthErrorLogin = store.getState().validReducer.minLengthErrorLogin;
    this.isConfirmAccepted = store.getState().validReducer.isConfirmAccepted;
  }

  render (): JSX.Element {
    return (
      <div>
        {this.isDirtyPassword ? this.isEmptyPassword && <span className={styles.err}>Укажите пароль</span> : null}
        {this.isDirtyPassword || this.isDirtyLogin ? (this.correctCharsPassword && this.correctCharsLogin) || <span className={styles.err}>Доступны только цифры и латинские буквы</span> : null}
        {this.isDirtyPassword ? this.lenghtErrorPassword && <span className={styles.err}>Пароль должен содержать хотя бы 6 символов</span> : null}
        {this.isDirtyLogin ? this.isEmptyLogin && <span className={styles.err}>Укажите логин</span> : null}
        {this.isDirtyLogin ? this.lengthErrorLogin && <span className={styles.err}>Логин должен содержать хотя бы 6 символов</span> : null}
        {!this.isConfirmAccepted && this.isDirtyPassword && <span className={styles.err}>Повторите пароль</span>}
      </div>
    );
  }
}

export default FormErrors;
