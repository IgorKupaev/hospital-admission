import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

import { useAppSelector } from '../../hooks/redux';

import type { FC } from 'react';
import type { IAuthSnackbar } from '../../interfaces/IAuthSnackbar';
import { AuthEnum } from '../../interfaces/AuthEnum';

const AuthSnackbar: FC<IAuthSnackbar> = ({ setRenderType, renderType }): JSX.Element => {
  const { regStatus: message, isLoading: isLoadingReg } = useAppSelector(state => state.regReducer);
  const { error: logMessage, isLoading: isLoadingLogin } = useAppSelector(state => state.loginReducer);

  const [isInfoOpened, setIsInfoOpened] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const closeInfo = (): void => {
    setIsInfoOpened(false);
  };

  useEffect(() => {
    if (!isLoadingReg) {
      if (message === "User's registration is succesful") {
        setRenderType(AuthEnum.login);
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
    <Snackbar open={isInfoOpened} autoHideDuration={4000} onClose={closeInfo}>
      <Alert onClose={closeInfo} severity="info" sx={{ width: '100%' }}>
        {customMessage !== '' ? customMessage : (renderType === AuthEnum.login ? logMessage : message)}
      </Alert>
    </Snackbar>
  );
};

export default AuthSnackbar;
