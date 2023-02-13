import React, { useState } from 'react';

import AuthForm from '../AuthForm/AuthForm';
import { AuthEnum } from '../../interfaces/AuthEnum';
import HospitalImage from './../../assets/images/Hospital.svg';

import styles from './Auth.module.scss';

import type { FC } from 'react';
import type { IAuthProps } from '../../interfaces/propTypes/IAuthProps';

const Auth: FC<IAuthProps> = ({ setTitleBody }): JSX.Element => {
  const [renderType, setRenderType] = useState<AuthEnum>(AuthEnum.register);
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
