import React from 'react';

import AuthForm from '../AuthForm/AuthForm';
import { AuthEnum } from '../../interfaces/AuthEnum';
import HospitalImage from './../../assets/images/Hospital.svg';

import styles from './Auth.module.scss';

import type { IAuthProps } from '../../interfaces/propTypes/IAuthProps';

class Auth extends React.Component<IAuthProps, { renderType: AuthEnum }> {
  constructor (props: IAuthProps) {
    super(props);
    this.setRenderType = this.setRenderType.bind(this);
    this.state = {
      renderType: AuthEnum.register
    };
  }

  setRenderType (value: AuthEnum): void {
    this.setState({
      renderType: value
    });
  }

  render (): JSX.Element {
    return (
      <div className={styles.auth}>
        <div className={styles.authContainer}>
          <div className={styles.authImage}>
            <img src={HospitalImage} alt="hospital" />
          </div>
          <AuthForm setTitleBody={this.props.setTitleBody} renderType={this.state.renderType} setRenderType={this.setRenderType} />
        </div>
      </div>
    );
  }
}

export default Auth;
