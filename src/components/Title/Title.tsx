import React from 'react';

import titlePicture from './../../assets/images/TitlePicture.svg';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { logoutUser } from '../../store/reducers/loginSlice';
import { clearAdmissions } from '../../store/reducers/admissionSlice';

import styles from './Title.module.scss';

import type { ITitleProps } from '../../interfaces/propTypes/ITitleProps';
import type { FC } from 'react';

const Title: FC<ITitleProps> = ({ body, showExit }): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = (): void => {
    localStorage.setItem('token', '');
    dispatch(logoutUser());
    navigate('/auth');
    dispatch(clearAdmissions());
    localStorage.setItem('admissions', '');
  };
  return (
    <div className={styles.title}>
      <div className={styles.titleContainer}>
        <div className={styles.titlePicture}>
          <img src={titlePicture} alt="hospital" />
        </div>
        <div className={styles.titleBody}>
          <span className={styles.bodyText}>{body}</span>
          {showExit && <button onClick={logout} className={styles.bodyButton}>Выход</button>}
        </div>
      </div>
    </div>
  );
};

export default Title;
