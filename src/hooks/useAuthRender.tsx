import React from 'react';

import { AuthEnum } from '../interfaces/AuthEnum';
import FormInput from '../components/FormInput/FormInput';
import type { IUseInput } from '../interfaces/IUseInput';

export interface IUseAuthRender {
  title: string
  button: string
  changeAuth: string
  regInput: JSX.Element
}

export const useAuthRender = (renderType: AuthEnum, confirm: IUseInput): IUseAuthRender => {
  const title = renderType === AuthEnum.login ? 'Войти в систему' : 'Регистрация';
  const button = renderType === AuthEnum.login ? 'Войти' : 'Зарегистрироваться';
  const changeAuth = renderType === AuthEnum.login ? 'Зарегистрироваться' : 'Авторизироваться';
  let regInput;
  if (renderType === AuthEnum.register) {
    regInput = <FormInput onBlur={e => { confirm.onBlur(e.target.value); }} onChange={e => { confirm.onChange(e.target.value); }} value={confirm.value} title='Повторите пароль' />;
  } else {
    regInput = <></>;
  }
  return {
    title,
    button,
    changeAuth,
    regInput
  };
};
