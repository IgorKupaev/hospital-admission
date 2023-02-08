import React from 'react';
import type { FC } from 'react';
import titlePicture from './../../assets/images/TitlePicture.svg';
import styles from './Title.module.scss';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/reducers/loginSlice';
import { clearAdmissions } from '../../store/reducers/admissionSlice';
import type { ITitleProps } from '../../models/propTypes/ITitleProps';
import { useAppDispatch } from '../../hooks/redux';

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
