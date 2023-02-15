import React from 'react';

import { useErrors } from '../../hooks/useErrors';

import styles from './FormErrors.module.scss';

import type { IFormErrorsProps } from '../../interfaces/propTypes/IFormErrorsProps';
import type { IUseErrors } from '../../interfaces/IUseErrors';

interface FormErrorsState {
  conditions: IUseErrors
}
class FormErrors extends React.Component<IFormErrorsProps, FormErrorsState> {
  constructor (props: IFormErrorsProps) {
    super(props);

    this.state = {
      conditions: useErrors(this.props.password, this.props.login)
    };
  }

  render (): JSX.Element {
    return (
      <div>
        {this.state.conditions.passwordEmpty && <span className={styles.err}>Укажите пароль</span>}
        {this.state.conditions.latinAndDigit && <span className={styles.err}>Логин и пароль должны содержать цифры и латинские буквы</span>}
        {this.state.conditions.passwordLength && <span className={styles.err}>Пароль должен содержать хотя бы 6 символов</span>}
        {this.state.conditions.loginEmpty && <span className={styles.err}>Укажите логин</span>}
        {this.state.conditions.loginLength && <span className={styles.err}>Логин должен содержать хотя бы 6 символов</span>}
        {this.props.confirmError && <span className={styles.err}>Подтвердите пароль</span>}
      </div>
    );
  }
}

export default FormErrors;
