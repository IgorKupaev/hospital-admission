import React, { useState } from 'react';
import type { FC } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { AuthType } from '../../models/AuthType';
import HospitalImage from './../../assets/images/Hospital.svg';
import styles from './Auth.module.scss';
import type { IAuthProps } from '../../models/propTypes/IAuthProps';

const Auth: FC<IAuthProps> = ({ setTitleBody }): JSX.Element => {
  const [renderType, setRenderType] = useState<AuthType>(AuthType.register);
  return (
    <div className={styles.auth}>
      <div className={styles.authContainer}>
        <div className={styles.authImage}>
          <img src={HospitalImage} alt="hospital" />
        </div>
        <AuthForm setTitleBody={setTitleBody} renderType={renderType} setRenderType={setRenderType} />
      </div>
    </div>
  );
};

export default Auth;
