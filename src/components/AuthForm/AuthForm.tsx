import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from './../../hooks/redux';
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
import type { FC } from 'react';
import type { IUseErrors } from '../../interfaces/IUseErrors';

const AuthForm: FC<IAuthFormProps> = ({ setTitleBody, renderType, setRenderType }): JSX.Element => {
  const handleRenderChange = (): void => {
    setRenderType(renderType === 'register' ? AuthEnum.login : AuthEnum.register);
    setTitleBody(renderType === 'register' ? 'Войти в систему' : 'Зарегистрироваться в системе');
  };

  const password = useInput('', { isEmpty: true, minLength: 6, containsDigitAndLatin: false });
  const passwordOnBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
    password.onBlur(e.target.value);
  };
  const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    password.onChange(e.target.value);
  };

  const login = useInput('', { isEmpty: true, minLength: 6, containsDigitAndLatin: false });
  const loginOnBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
    login.onBlur(e.target.value);
  };
  const loginOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    login.onChange(e.target.value);
  };

  const confirm = useInput('', { isEmpty: true, minLength: 6, containsDigitAndLatin: false });
  const [confirmError, setConfirmError] = useState(false);

  const [isAuthorized, setIsAuthorized] = useState(false);

  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector(state => state.loginReducer);

  useEffect(() => {
    if (typeof token === 'string' && token !== '' && Object.values(user)[0].length > 0) {
      dispatch(authUser({ token, user }));
    }
  }, [isAuthorized]);

  const authFetch = (): void => {
    if (renderType === 'login') {
      console.log('login started');
      if (password.isDirty && !password.isEmpty && !password.containsDigitAndLatin) {
        dispatch(authLogin({ data: { password: password.value, login: login.value } }));
        setIsAuthorized(!isAuthorized);
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
  const { title, button, changeAuth, regInput } = useAuthRender(renderType, confirm);

  const { isDisabled }: IUseErrors = useErrors(password, login);
  return (
    <div className={styles.form}>
      <AuthSnackbar renderType={renderType} setRenderType={setRenderType} />
      <h2 className={styles.formTitle}>
        {title}
      </h2>
      <div className={styles.inputs}>
        <AuthFormInput onBlur={loginOnBlur} onChange={loginOnChange} value={login.value} title='Логин' />
        <AuthFormInput onBlur={passwordOnBlur} onChange={passwordOnChange} value={password.value} title='Пароль' />
        {regInput}
        <FormErrors confirmError={confirmError} password={password} login={login} />
      </div>
      <div className={styles.buttons}>
        <button disabled={isDisabled() && !confirmError} onClick={authFetch} className={styles.fetch}>{button}</button>
        <button onClick={handleRenderChange} className={styles.changeAuth}>{changeAuth}</button>
      </div>
    </div>
  );
};

export default AuthForm;
