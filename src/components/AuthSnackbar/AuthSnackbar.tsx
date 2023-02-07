import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import type { FC } from 'react';
import type { IAuthSnackbar } from '../../models/IAuthSnackbar';

const AuthSnackbar: FC<IAuthSnackbar> = ({ AuthType, setRenderType, renderType }): JSX.Element => {
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
    <Snackbar open={isInfoOpened} autoHideDuration={4000} onClose={() => { setIsInfoOpened(false); }}>
      <Alert onClose={() => { setIsInfoOpened(false); }} severity="warning" sx={{ width: '100%' }}>
        {customMessage !== '' ? customMessage : (renderType === AuthType.login ? logMessage : message)}
      </Alert>
    </Snackbar>
  );
};

export default AuthSnackbar;
