import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { createAdmission } from '../../store/reducers/admissionSlice';
import { useAppDispatch } from '../../hooks/redux';

import styles from './CreateMenu.module.scss';

import type { ICreateMenuProps } from '../../interfaces/propTypes/ICreateMenuProps';
import type { FC } from 'react';
import CreateMenuInputs from '../CreateMenuInputs/CreateMenuInputs';

const CreateMenu: FC<ICreateMenuProps> = ({ ads, setAds }): JSX.Element => {
  const initialState = { pacient: '', doctor: '', date: '', complaint: '' };
  const [newAdmission, setNewAdmission] = useState(initialState);
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

  const createHandler = (): void => {
    let fetchedAdmission = { ...newAdmission, _id: '' };
    createNewAdmission().then(res => {
      fetchedAdmission = res.data;
      dispatch(createAdmission(fetchedAdmission));
    }).catch(err => {
      fetchedAdmission = err;
    });
    if (typeof fetchedAdmission !== 'string') {
      setAds([...ads, fetchedAdmission]);
      setNewAdmission(initialState);
    }
  };
  return (
    <div className={styles.menu}>
      <div className={styles.menuContainer}>
        <CreateMenuInputs newAdmission={newAdmission} setNewAdmission={setNewAdmission} />
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
