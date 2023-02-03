import React from 'react';
import type { FC } from 'react';
import AuthForm, { AuthType } from '../AuthForm/AuthForm';
import HospitalImage from './../../assets/images/Hospital.svg';
import styles from './Auth.module.scss';

interface IAuthProps {
  setTitleBody: (value: string) => void
  setUpdate?: (value: boolean) => void
}

const Auth: FC<IAuthProps> = ({ setTitleBody, setUpdate }): JSX.Element => {
  return (
    <div className={styles.auth}>
      <div className={styles.authContainer}>
        <div className={styles.authImage}>
          <img src={HospitalImage} alt="hospital" />
        </div>
        <AuthForm setUpdate={setUpdate} setTitleBody={setTitleBody} type={AuthType.register} />
      </div>
    </div>
  );
};

export default Auth;
