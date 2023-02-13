import React, { useEffect, useState } from 'react';

import Auth from '../components/Auth/Auth';
import Title from '../components/Title/Title';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const AuthPage = (): JSX.Element => {
  const [titleBody, setTitleBody] = useState<string>('Зарегистрироваться в системе');
  const navigate = useNavigate();
  const token = useAppSelector(state => state.loginReducer.token);
  useEffect(() => {
    const token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '';
    if (token !== '') {
      navigate('/');
    }
  }, [token]);
  return (
    <>
      <Title body={titleBody} showExit={false} />
      <Auth setTitleBody={setTitleBody} />
    </>
  );
};

export default AuthPage;
