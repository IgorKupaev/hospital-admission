import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import AuthFormInput from '../AuthFormInput.tsx/FormInput';
import styles from './AuthForm.module.scss';
import { useAppDispatch, useAppSelector } from './../../hooks/redux';
import { authLogin, authReg } from '../../store/reducers/actionCreators';
import { authUser } from '../../store/reducers/loginSlice';
import { useInput } from '../../hooks/useInput';
import type { IUseErrors } from '../../hooks/useErrors';
import { useErrors } from '../../hooks/useErrors';
import { Alert, Snackbar } from '@mui/material';

export enum AuthType {
  register = 'register',
  login = 'login'
}

interface IAuthFormProps {
  type: AuthType
  setTitleBody: (value: string) => void
  setUpdate?: (value: boolean) => void
}

const AuthForm: FC<IAuthFormProps> = ({ type, setTitleBody, setUpdate }): JSX.Element => {
  // Вынести в отдельный компонент всю кучу, принимать в объекте и вытащить деструктуризацией
  const [renderType, setRenderType] = useState<AuthType>(type);
  const title = renderType === AuthType.login ? 'Войти в систему' : 'Регистрация';
  const button = renderType === AuthType.login ? 'Войти' : 'Зарегистрироваться';
  const changeAuth = renderType === AuthType.login ? 'Зарегистрироваться' : 'Авторизироваться';

  const renderChangeHandler = (): void => {
    setCustomMessage('');
    setRenderType(renderType === 'register' ? AuthType.login : AuthType.register);
    setTitleBody(renderType === 'register' ? 'Войти в систему' : 'Зарегистрироваться в системе');
  };

  const password = useInput('', { isEmpty: true, minLength: 6, containsDigitAndLatin: false });
  const login = useInput('', { isEmpty: true, minLength: 6, containsDigitAndLatin: false });
  const confirm = useInput('', { isEmpty: true, minLength: 6, containsDigitAndLatin: false });
  const [confirmError, setConfirmError] = useState(false);

  const [isAuthorized, setIsAuthorized] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.loginReducer);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('useEffect form token: ', token);
    if (typeof token === 'string' && token !== '' && Object.values(user)[0].length > 0) {
      dispatch(authUser({ token, user }));
    }
  }, [isAuthorized]);

  const authFetch = (): void => {
    setCustomMessage('');
    if (renderType === 'login') {
      if (password.isDirty === true && password.isEmpty === false && password.containsDigitAndLatin === false) {
        dispatch(authLogin({ data: { password: password.value, login: login.value } }));
        setIsAuthorized(!isAuthorized);
        if (setUpdate !== undefined) {
          setUpdate(true);
        }
      }
    } else {
      if (confirm.value !== password.value) {
        setConfirmError(true);
      } else if (login.value.length > 5 && password.value.length > 5) {
        setConfirmError(false);
        dispatch(authReg({ data: { password: password.value, login: login.value } }));
      }
    }
  };
  const { loginLength, passwordEmpty, latinAndDigit, passwordLength, loginEmpty, isDisabled }: IUseErrors = useErrors(password, login);

  const regInput = renderType === AuthType.login ||
  <AuthFormInput onBlur={e => { confirm.onBlur(e); }} onChange={e => { confirm.onChange(e.target.value); }} value={confirm.value} body='Повторите пароль' />;

  const message = useAppSelector(state => state.regReducer.regStatus);
  const logMessage = useAppSelector(state => state.loginReducer.error);
  const [isInfoOpened, setIsInfoOpened] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  useEffect(() => {
    if (message === "User's registration is succesful") {
      setRenderType(AuthType.login);
      setCustomMessage('Registration is successful. Now you can log in');
    }
    if (message !== '') {
      setIsInfoOpened(true);
    } else if (logMessage !== '') {
      setIsInfoOpened(true);
    }
  }, [message, logMessage]);

  return (
    <div className={styles.form}>
      <Snackbar open={isInfoOpened} autoHideDuration={4000} onClose={() => { setIsInfoOpened(false); }}>
        <Alert onClose={() => { setIsInfoOpened(false); }} severity="warning" sx={{ width: '100%' }}>
          {customMessage !== '' ? customMessage : (renderType === AuthType.login ? logMessage : message)}
        </Alert>
      </Snackbar>
      <h2 className={styles.formTitle}>
        {title}
      </h2>
      <div className={styles.inputs}>
        <AuthFormInput onBlur={e => { login.onBlur(e); }} onChange={e => { login.onChange(e.target.value); }} value={login.value} body='Логин' />
        <AuthFormInput onBlur={e => { password.onBlur(e); }} onChange={e => { password.onChange(e.target.value); }} value={password.value} body='Пароль' />
        {regInput}
        {passwordEmpty && <span className={styles.err}>Укажите пароль</span>}
        {latinAndDigit && <span className={styles.err}>Логин и пароль должны содержать цифры и латинские буквы</span>}
        {passwordLength && <span className={styles.err}>Пароль должен содержать хотя бы 6 символов</span>}
        {loginEmpty && <span className={styles.err}>Укажите логин</span>}
        {loginLength && <span className={styles.err}>Логин должен содержать хотя бы 6 символов</span>}
        {confirmError && <span className={styles.err}>Подтвердите пароль</span>}
      </div>
      <div className={styles.buttons}>
        <button disabled={isDisabled() && !confirmError} onClick={authFetch} className={styles.fetch}>{button}</button>
        <button onClick={renderChangeHandler} className={styles.changeAuth}>{changeAuth}</button>
      </div>
    </div>
  );
};

export default AuthForm;
