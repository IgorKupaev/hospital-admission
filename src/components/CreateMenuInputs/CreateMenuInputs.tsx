import React from 'react';

import styles from './CreateMenuInputs.module.scss';

import type { FC, ChangeEvent } from 'react';

import type { ICreateMenuInputsProps } from '../../interfaces/propTypes/ICreateMenuInputsProps';

const CreateMenuInputs: FC<ICreateMenuInputsProps> = ({ newAdmission, setNewAdmission }): JSX.Element => {
  const setNewPacient = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewAdmission({ ...newAdmission, pacient: e.target.value });
  };
  const setNewDoctor = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewAdmission({ ...newAdmission, doctor: e.target.value });
  };
  const setNewDate = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewAdmission({ ...newAdmission, date: e.target.value });
  };
  const setNewComplaint = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewAdmission({ ...newAdmission, complaint: e.target.value });
  };
  return (
    <>
      <div className={styles.menuInput}>
        <span>Имя: </span>
        <input
          value={newAdmission.pacient}
          onChange={setNewPacient}
          type="text"
        />
      </div>
      <div className={styles.menuInput}>
        <span>Врач: </span>
        <input
          value={newAdmission.doctor}
          onChange={setNewDoctor}
          type="text"
        />
      </div>
      <div className={styles.menuInput}>
        <span>Дата: </span>
        <input
          value={newAdmission.date}
          onChange={setNewDate}
          type="date"
        />
      </div>
      <div className={styles.menuInput}>
        <span>Жалобы: </span>
        <input
          value={newAdmission.complaint}
          onChange={setNewComplaint}
          type="text"
        />
      </div>
    </>
  );
};

export default CreateMenuInputs;
