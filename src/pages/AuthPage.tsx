import React from 'react';

import Auth from '../components/Auth/Auth';
import Title from '../components/Title/Title';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

interface AuthPageState {
  titleBody: string
  token: string
  isNavigate: boolean
}

const initToken = (): string => {
  const token = localStorage.getItem('token');
  if (typeof token !== 'string') {
    return '';
  } else {
    return token;
  }
};

class AuthPage extends React.Component<unknown, AuthPageState> {
  constructor (props: unknown) {
    super(props);
    this.setTitleBody = this.setTitleBody.bind(this);
    this.state = {
      titleBody: 'Зарегистрироваться в системе',
      token: initToken(),
      isNavigate: false
    };
  }

  setTitleBody (value: string): void {
    this.setState({
      titleBody: value
    });
  }

  componentDidMount (): void {
    const token = initToken();
    if (token !== '') {
      this.setState({
        isNavigate: true
      });
    }
  }

  render (): JSX.Element {
    return (
      <>
        {localStorage.getItem('token') !== '' && <Navigate to='/' />}
        <Title body={this.state.titleBody} showExit={false} />
        <Auth setTitleBody={this.setTitleBody} />
      </>
    );
  }
}

const mapStateToProps = (state: any): { token: string } => {
  return {
    token: state.loginReducer.token
  };
};

export default connect(mapStateToProps)(AuthPage);
