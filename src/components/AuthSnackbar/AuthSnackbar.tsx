import React from 'react';
import { Alert, Snackbar } from '@mui/material';

import type { IAuthSnackbar } from '../../interfaces/IAuthSnackbar';
import { AuthEnum } from '../../interfaces/AuthEnum';
import { store } from '../../store/store';
import { connect } from 'react-redux';

interface AuthSnackbarState {
  message: string
  isLoadingReg: boolean
  logMessage: string
  isLoadingLogin: boolean
  isInfoOpened: boolean
  customMessage: string
}

class AuthSnackbar extends React.Component<IAuthSnackbar, AuthSnackbarState> {
  constructor (props: IAuthSnackbar) {
    super(props);
    this.setIsInfoOpened = this.setIsInfoOpened.bind(this);
    this.setCustomMessage = this.setCustomMessage.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
    this.state = {
      message: store.getState().regReducer.regStatus,
      isLoadingReg: store.getState().regReducer.isLoading,
      logMessage: store.getState().loginReducer.error,
      isLoadingLogin: store.getState().loginReducer.isLoading,
      isInfoOpened: false,
      customMessage: ''
    };
  };

  setIsInfoOpened (value: boolean): void {
    this.setState({
      isInfoOpened: value
    });
  };

  setCustomMessage (value: string): void {
    this.setState({
      customMessage: value
    });
  }

  closeInfo (): void {
    this.setIsInfoOpened(false);
  }

  componentDidUpdate (prevProps: IAuthSnackbar, prevState: AuthSnackbarState): void {
    // const loginStatus: boolean = store.getState().loginReducer.isLoading;
    const regStatus: boolean = store.getState().regReducer.isLoading;
    const logError: string = store.getState().loginReducer.error;
    const regMessage: string = store.getState().regReducer.regStatus;
    if (prevState.message !== regMessage) {
      this.setState({
        message: regMessage
      });
      if (!regStatus) {
        if (this.state.message === "User's registration is succesful") {
          this.props.setRenderType(AuthEnum.login);
          this.setCustomMessage('Registration is successful. Now you can log in');
        }
        if (regMessage !== '') {
          this.setIsInfoOpened(true);
        } else if (logError !== '') {
          this.setIsInfoOpened(true);
        }
      }
    }
  }

  render (): JSX.Element {
    return (
      <Snackbar open={this.state.isInfoOpened} autoHideDuration={4000} onClose={this.closeInfo}>
        <Alert onClose={this.closeInfo} severity="info" sx={{ width: '100%' }}>
          {this.state.customMessage !== '' ? this.state.customMessage : (this.props.renderType === AuthEnum.login ? this.state.logMessage : this.state.message)}
        </Alert>
      </Snackbar>
    );
  }
}

const mapStateToProps = (state: any): { message: string, isLoadingReg: boolean, logMessage: string, isLoadingLogin: boolean } => {
  return {
    message: state.regReducer.regStatus,
    isLoadingReg: state.regReducer.isLoading,
    logMessage: state.loginReducer.error,
    isLoadingLogin: state.loginReducer.isLoading
  };
};

export default connect(mapStateToProps)(AuthSnackbar);
