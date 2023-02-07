import { AuthType } from '../models/AuthType';
import React from 'react';
import FormInput from '../components/FormInput/FormInput';

export const useAuthRender = (renderType: any, confirm: any): any => {
  const title = renderType === AuthType.login ? 'Войти в систему' : 'Регистрация';
  const button = renderType === AuthType.login ? 'Войти' : 'Зарегистрироваться';
  const changeAuth = renderType === AuthType.login ? 'Зарегистрироваться' : 'Авторизироваться';
  const regInput = renderType === AuthType.login ||
  <FormInput onBlur={e => { confirm.onBlur(e); }} onChange={e => { confirm.onChange(e.target.value); }} value={confirm.value} body='Повторите пароль' />;
  return {
    title,
    button,
    changeAuth,
    regInput
  };
};
