import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import styles from './CreateMenu.module.scss';
import axios from 'axios';
import { createAdmission } from '../../store/reducers/admissionSlice';
import { useAppDispatch } from '../../hooks/redux';
import type { ICreateMenuProps } from '../../models/propTypes/ICreateMenuProps';

const CreateMenu: FC<ICreateMenuProps> = ({ ads, setAds }): JSX.Element => {
  const [newAdmission, setNewAdmission] = useState({ pacient: '', doctor: '', date: '', complaint: '' });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const createNewAdmission = async (): Promise<any> => {
    return await axios.post('http://localhost:8000/admission', newAdmission);
  };

  useEffect(() => {
    let status = true;
    for (const value of Object.values(newAdmission)) {
      if (value.length < 6) {
        status = false;
      }
    };
    if (status) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    };
  }, [newAdmission.complaint, newAdmission.date, newAdmission.doctor, newAdmission.pacient]);

  const createHandler = (): any => {
    let fetchedAdmission = { ...newAdmission, _id: '' };
    createNewAdmission().then(res => {
      fetchedAdmission = res.data;
      dispatch(createAdmission(fetchedAdmission));
    }).catch(err => {
      fetchedAdmission = err;
    });
    if (typeof fetchedAdmission !== 'string') {
      setAds([...ads, fetchedAdmission]);
      setNewAdmission({ pacient: '', doctor: '', date: '', complaint: '' });
    }
  };

  return (
    <div className={styles.menu}>
      <div className={styles.menuContainer}>
        <div className={styles.menuInput}>
          <span>Имя: </span>
          <input
            value={newAdmission.pacient}
            onChange={e => { setNewAdmission({ ...newAdmission, pacient: e.target.value }); }}
            type="text"
          />
        </div>
        <div className={styles.menuInput}>
          <span>Врач: </span>
          <input
            value={newAdmission.doctor}
            onChange={e => { setNewAdmission({ ...newAdmission, doctor: e.target.value }); }}
            type="text"
          />
        </div>
        <div className={styles.menuInput}>
          <span>Дата: </span>
          <input
            value={newAdmission.date}
            onChange={e => { setNewAdmission({ ...newAdmission, date: e.target.value }); }}
            type="date"
          />
        </div>
        <div className={styles.menuInput}>
          <span>Жалобы: </span>
          <input
            value={newAdmission.complaint}
            onChange={e => { setNewAdmission({ ...newAdmission, complaint: e.target.value }); }}
            type="text"
          />
        </div>
        <div className={isDisabled ? styles.disabled : styles.menuButton}>
          <button disabled={isDisabled} onClick={createHandler}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;
