import React from 'react';

import titlePicture from './../../assets/images/TitlePicture.svg';

import { Navigate } from 'react-router-dom';
import { logoutUser } from '../../store/reducers/loginSlice';
import { clearAdmissions } from '../../store/reducers/admissionSlice';

import styles from './Title.module.scss';

import type { ITitleProps } from '../../interfaces/propTypes/ITitleProps';
import { store } from '../../store/store';

interface TitleState {
  isNavigate: boolean
}

class Title extends React.Component<ITitleProps, TitleState> {
  constructor (props: ITitleProps) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      isNavigate: false
    };
  }

  logout (): void {
    localStorage.setItem('token', '');
    store.dispatch(logoutUser());
    store.dispatch(clearAdmissions());
    localStorage.setItem('admissions', '');
    this.setState({
      isNavigate: true
    });
  }

  render (): JSX.Element {
    return (
      <div className={styles.title}>
        {this.state.isNavigate && <Navigate to='/auth' />}
        <div className={styles.titleContainer}>
          <div className={styles.titlePicture}>
            <img src={titlePicture} alt="hospital" />
          </div>
          <div className={styles.titleBody}>
            <span className={styles.bodyText}>{this.props.body}</span>
            {this.props.showExit && <button onClick={this.logout} className={styles.bodyButton}>Выход</button>}
          </div>
        </div>
      </div>
    );
  }
}

export default Title;
