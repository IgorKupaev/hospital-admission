import React, { useEffect, useState } from 'react';
import AuthFormInput from '../FormInput/FormInput';
import styles from './AuthForm.module.scss';
import { useAppDispatch, useAppSelector } from './../../hooks/redux';
import { authLogin, authReg } from '../../store/reducers/actionCreators';
import { authUser } from '../../store/reducers/loginSlice';
import { useInput } from '../../hooks/useInput';
import { useErrors } from '../../hooks/useErrors';
import type { IAuthFormProps } from '../../models/IAuthFormProps';
import type { IUseErrors } from '../../hooks/useErrors';
import type { FC } from 'react';
import AuthSnackbar from '../AuthSnackbar/AuthSnackbar';
import { AuthType } from '../../models/AuthType';
import FormErrors from '../FormErrors/FormErrors';
import { useAuthRender } from '../../hooks/useAuthRender';

const AuthForm: FC<IAuthFormProps> = ({ setTitleBody, renderType, setRenderType }): JSX.Element => {
  const renderChangeHandler = (): void => {
    setRenderType(renderType === 'register' ? AuthType.login : AuthType.register);
    setTitleBody(renderType === 'register' ? 'Войти в систему' : 'Зарегистрироваться в системе');
  };

  const password = useInput('', { isEmpty: true, minLength: 6, containsDigitAndLatin: false });
  const login = useInput('', { isEmpty: true, minLength: 6, containsDigitAndLatin: false });
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
      if (password.isDirty === true && password.isEmpty === false && password.containsDigitAndLatin === false) {
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
      <AuthSnackbar renderType={renderType} setRenderType={setRenderType} AuthType={AuthType} />
      <h2 className={styles.formTitle}>
        {title}
      </h2>
      <div className={styles.inputs}>
        <AuthFormInput onBlur={e => { login.onBlur(e); }} onChange={e => { login.onChange(e.target.value); }} value={login.value} body='Логин' />
        <AuthFormInput onBlur={e => { password.onBlur(e); }} onChange={e => { password.onChange(e.target.value); }} value={password.value} body='Пароль' />
        {regInput}
        <FormErrors confirmError={confirmError} password={password} login={login} />
      </div>
      <div className={styles.buttons}>
        <button disabled={isDisabled() && !confirmError} onClick={authFetch} className={styles.fetch}>{button}</button>
        <button onClick={renderChangeHandler} className={styles.changeAuth}>{changeAuth}</button>
      </div>
    </div>
  );
};

export default AuthForm;
