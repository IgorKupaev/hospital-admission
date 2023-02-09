import React, { useEffect, useState } from 'react';

import { Alert, Snackbar } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';

import type { FC } from 'react';
import type { IAuthSnackbar } from '../../interfaces/IAuthSnackbar';

const AuthSnackbar: FC<IAuthSnackbar> = ({ AuthType, setRenderType, renderType }): JSX.Element => {
  const { regStatus: message, isLoading: isLoadingReg } = useAppSelector(state => state.regReducer);
  const { error: logMessage, isLoading: isLoadingLogin } = useAppSelector(state => state.loginReducer);

  const [isInfoOpened, setIsInfoOpened] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  useEffect(() => {
    if (!isLoadingReg) {
      if (message === "User's registration is succesful") {
        setRenderType(AuthType.login);
        setCustomMessage('Registration is successful. Now you can log in');
      }
      if (message !== '') {
        setIsInfoOpened(true);
      } else if (logMessage !== '') {
        setIsInfoOpened(true);
      }
    }
  }, [isLoadingReg, isLoadingLogin]);
  return (
    <Snackbar open={isInfoOpened} autoHideDuration={4000} onClose={() => { setIsInfoOpened(false); }}>
      <Alert onClose={() => { setIsInfoOpened(false); }} severity="info" sx={{ width: '100%' }}>
        {customMessage !== '' ? customMessage : (renderType === AuthType.login ? logMessage : message)}
      </Alert>
    </Snackbar>
  );
};

export default AuthSnackbar;
