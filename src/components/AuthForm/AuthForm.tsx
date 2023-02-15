import React from 'react';

import { useInput } from '../../hooks/useInput';
import { useErrors } from '../../hooks/useErrors';
import { useAuthRender } from '../../hooks/useAuthRender';

import AuthFormInput from '../FormInput/FormInput';
import AuthSnackbar from '../AuthSnackbar/AuthSnackbar';
import FormErrors from '../FormErrors/FormErrors';

import { authLogin, authReg } from '../../store/reducers/actionCreators';
import { authUser } from '../../store/reducers/loginSlice';
import { AuthEnum } from '../../interfaces/AuthEnum';

import styles from './AuthForm.module.scss';

import type { IAuthFormProps } from '../../interfaces/IAuthFormProps';
import type { IUser } from '../../interfaces/IUser';
import { store } from '../../store/store';
import type { IUseInput } from '../../interfaces/IUseInput';

interface IAuthFormState {
  token: string
  user: IUser
  passwordValue: string
  isDirty: boolean
  loginValue: string
  isLoginDirty: boolean
  confirmValue: string
  isConfirmDirty: boolean
  password: IUseInput
  login: IUseInput
  confirm: IUseInput
  isAuthorized: boolean
  confirmError: boolean
  authRender: any
  isDisabled: () => boolean
}

const initialValidations = { isEmpty: true, minLength: 6, containsDigitAndLatin: false };
class AuthForm extends React.Component<IAuthFormProps, IAuthFormState> {
  constructor (props: IAuthFormProps) {
    super(props);
    this.setPasswordValue = this.setPasswordValue.bind(this);
    this.handleRenderChange = this.handleRenderChange.bind(this);
    this.setIsDirty = this.setIsDirty.bind(this);
    this.setLoginValue = this.setLoginValue.bind(this);
    this.setIsLoginDirty = this.setIsLoginDirty.bind(this);
    this.passwordOnBlur = this.passwordOnBlur.bind(this);
    this.passwordOnChange = this.passwordOnChange.bind(this);
    this.loginOnBlur = this.loginOnBlur.bind(this);
    this.loginOnChange = this.loginOnChange.bind(this);
    this.setConfirmValue = this.setConfirmValue.bind(this);
    this.setIsConfirmDirty = this.setIsConfirmDirty.bind(this);
    this.setIsAuthorized = this.setIsAuthorized.bind(this);
    this.setConfirmError = this.setConfirmError.bind(this);
    this.authFetch = this.authFetch.bind(this);

    this.state = {
      user: store.getState().loginReducer.user,
      token: store.getState().loginReducer.token,
      confirmError: false,
      isAuthorized: false,
      passwordValue: '',
      isDirty: false,
      loginValue: '',
      isLoginDirty: false,
      confirmValue: '',
      isConfirmDirty: false,
      password: useInput({
        validations: {
          isEmpty: false,
          minLength: 6,
          containsDigitAndLatin: false
        },
        setValue: (value: string) => {},
        value: '',
        isDirty: false,
        setIsDirty: (value: boolean) => {}
      }),
      login: useInput({
        validations: {
          isEmpty: false,
          minLength: 6,
          containsDigitAndLatin: false
        },
        setValue: (value: string) => {},
        value: '',
        isDirty: false,
        setIsDirty: (value: boolean) => {}
      }),
      confirm: useInput({
        validations: {
          isEmpty: false,
          minLength: 6,
          containsDigitAndLatin: false
        },
        setValue: (value: string) => {},
        value: '',
        isDirty: false,
        setIsDirty: (value: boolean) => {}
      }),
      isDisabled: () => true,
      authRender: {}
    };
  }

  handleRenderChange (): void {
    this.props.setRenderType(this.props.renderType === 'register' ? AuthEnum.login : AuthEnum.register);
    this.props.setTitleBody(this.props.renderType === 'register' ? 'Войти в систему' : 'Зарегистрироваться в системе');
  };

  setPasswordValue (value: string): void {
    this.setState({ passwordValue: value });
    this.setState({ isDirty: true });
    if (value.length > 0) {
      this.setState({ password: { ...this.state.password, isEmpty: false } });
    }
  }

  setIsDirty (value: boolean): void {
    this.setState({ isDirty: value });
  }

  setConfirmValue (value: string): void {
    this.setState({ confirmValue: value });
    this.setState({ isConfirmDirty: true });
  }

  setIsConfirmDirty (value: boolean): void {
    this.setState({ isConfirmDirty: value });
  }

  setLoginValue (value: string): void {
    this.setState({ loginValue: value });
    this.setState({ isLoginDirty: true });
    if (value.length > 0) {
      this.setState({ login: { ...this.state.login, isEmpty: false } });
    }
  }

  setIsLoginDirty (value: boolean): void {
    this.setState({ isLoginDirty: value });
  }

  passwordOnBlur (e: React.ChangeEvent<HTMLInputElement>): void {
    this.state.password.onBlur(e.target.value);
  }

  passwordOnChange (e: React.ChangeEvent<HTMLInputElement>): void {
    this.state.password.onChange(e.target.value);
  }

  loginOnBlur (e: React.ChangeEvent<HTMLInputElement>): void {
    this.state.login.onBlur(e.target.value);
  }

  loginOnChange (e: React.ChangeEvent<HTMLInputElement>): void {
    this.state.login.onChange(e.target.value);
  }

  setIsAuthorized (value: boolean): void {
    this.setState({ isAuthorized: value });
  }

  setConfirmError (value: boolean): void {
    this.setState({ confirmError: value });
  }

  authFetch (): void {
    if (this.props.renderType === 'login') {
      store.dispatch(authLogin({ data: { password: this.state.password.value, login: this.state.login.value } })); // temp
      this.setIsAuthorized(!this.state.isAuthorized); // temp
      // if (!this.state.password.isDirty && this.state.password.isEmpty && !this.state.password.containsDigitAndLatin) {
      //   store.dispatch(authLogin({ data: { password: this.state.password.value, login: this.state.login.value } }));
      //   this.setIsAuthorized(!this.state.isAuthorized);
      // }
    } else {
      if (this.state.confirm.value !== this.state.password.value) {
        this.setConfirmError(true);
      } else if (this.state.login.value.length > 5 && this.state.password.value.length > 5) {
        this.setConfirmError(false);
        store.dispatch(authReg({ data: { password: this.state.password.value, login: this.state.login.value } }));
      }
    }
  }

  componentDidMount (): void {
    console.log('didMount');
    this.setState({
      isDisabled: useErrors(this.state.password, this.state.login).isDisabled,
      authRender: useAuthRender(this.props.renderType, this.state.confirm),
      password: useInput({
        validations: initialValidations,
        value: this.state.passwordValue,
        setValue: this.setPasswordValue,
        isDirty: this.state.isDirty,
        setIsDirty: this.setIsDirty
      }),
      login: useInput({
        validations: initialValidations,
        value: this.state.loginValue,
        setValue: this.setLoginValue,
        isDirty: this.state.isLoginDirty,
        setIsDirty: this.setIsLoginDirty
      }),
      confirm: useInput({
        validations: initialValidations,
        value: this.state.confirmValue,
        setValue: this.setConfirmValue,
        isDirty: this.state.isConfirmDirty,
        setIsDirty: this.setIsConfirmDirty
      })
    });
  }

  componentDidUpdate (prevProps: any, prevState: any): void {
    if (prevState.isAuthorized !== this.state.isAuthorized) {
      if (typeof this.state.token === 'string' && this.state.token !== '' && Object.values(this.state.user)[0].length > 0) {
        store.dispatch(authUser({ token: this.state.token, user: this.state.user }));
      }
    }
    if (prevProps.renderType !== this.props.renderType) {
      this.setState({ authRender: useAuthRender(this.props.renderType, this.state.confirm) });
    }
    if (this.state.passwordValue !== prevState.passwordValue) {
      console.log(this.state.password, this.state.login);

      const initValidations = {
        isEmpty: this.state.password.isEmpty,
        minLength: 6,
        containsDigitAndLatin: true
      };

      this.setState({
        ...this.state,
        isDisabled: useErrors(this.state.password, this.state.login).isDisabled,
        authRender: useAuthRender(this.props.renderType, this.state.confirm),
        password: useInput({
          validations: initValidations,
          value: this.state.passwordValue,
          setValue: this.setPasswordValue,
          isDirty: this.state.isDirty,
          setIsDirty: this.setIsDirty
        })
      });
    }
    if (this.state.loginValue !== prevState.loginValue) {
      console.log(this.state.password, this.state.login);
      const initValidations = {
        isEmpty: this.state.login.isEmpty,
        minLength: 6,
        containsDigitAndLatin: true
      };

      this.setState({
        ...this.state,
        isDisabled: useErrors(this.state.password, this.state.login).isDisabled,
        authRender: useAuthRender(this.props.renderType, this.state.confirm),
        login: useInput({
          validations: initValidations,
          value: this.state.loginValue,
          setValue: this.setLoginValue,
          isDirty: this.state.isLoginDirty,
          setIsDirty: this.setIsLoginDirty
        })
      });
    }
    if (this.state.confirmValue !== prevState.confirmValue) {
      this.setState({
        isDisabled: useErrors(this.state.password, this.state.login).isDisabled,
        authRender: useAuthRender(this.props.renderType, this.state.confirm),
        confirm: useInput({
          validations: initialValidations,
          value: this.state.confirmValue,
          setValue: this.setConfirmValue,
          isDirty: this.state.isConfirmDirty,
          setIsDirty: this.setIsConfirmDirty
        })
      });
    }
  }

  render (): JSX.Element {
    return (
      <div className={styles.form}>
        <AuthSnackbar renderType={this.props.renderType} setRenderType={this.props.setRenderType} />
        <h2 className={styles.formTitle}>
          {this.state.authRender.title}
        </h2>
        <div className={styles.inputs}>
          <AuthFormInput onBlur={this.loginOnBlur} onChange={this.loginOnChange} value={this.state.loginValue} title='Логин' />
          <AuthFormInput onBlur={this.passwordOnBlur} onChange={this.passwordOnChange} value={this.state.passwordValue} title='Пароль' />
          {this.state.authRender.regInput}
          <FormErrors confirmError={this.state.confirmError} password={this.state.password} login={this.state.login} />
        </div>
        <div className={styles.buttons}>
          <button onClick={this.authFetch} className={styles.fetch}>{this.state.authRender.button}</button>
          <button onClick={this.handleRenderChange} className={styles.changeAuth}>{this.state.authRender.changeAuth}</button>
        </div>
      </div>
    );
  }// disabled={this.state.isDisabled() && !this.state.confirmError} - from button authFetch;
}

export default AuthForm;
