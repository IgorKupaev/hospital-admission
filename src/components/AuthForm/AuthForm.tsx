import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import AuthFormInput from '../AuthFormInput.tsx/FormInput';
import styles from './AuthForm.module.scss';
import { useAppDispatch, useAppSelector } from './../../hooks/redux';
import { authLogin, authReg } from '../../store/reducers/actionCreators';
import { authUser } from '../../store/reducers/loginSlice';

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
  const regInput = renderType === AuthType.login ? null : <AuthFormInput body='Повторите пароль' />;

  const renderChangeHandler = (): void => {
    setRenderType(renderType === 'register' ? AuthType.login : AuthType.register);
    setTitleBody(renderType === 'register' ? 'Войти в систему' : 'Зарегистрироваться в системе');
  };

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
    if (renderType === 'login') {
      dispatch(authLogin({ data: { password, login } }));
      setIsAuthorized(!isAuthorized);
      if (setUpdate !== undefined) {
        setUpdate(true);
      }
      setPassword('');
      setLogin('');
    } else {
      dispatch(authReg({ data: { password, login } }));
      setPassword('');
      setLogin('');
    }
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>
        {title}
      </h2>
      <div className={styles.inputs}>
        <AuthFormInput onChange={e => { setLogin(e.target.value); }} value={login} body='Логин' />
        <AuthFormInput onChange={e => { setPassword(e.target.value); }} value={password} body='Пароль' />
        {regInput}
      </div>
      <div className={styles.buttons}>
        <button onClick={authFetch} className={styles.fetch}>{button}</button>
        <button onClick={renderChangeHandler} className={styles.changeAuth}>{changeAuth}</button>
      </div>
    </div>
  );
};

export default AuthForm;
