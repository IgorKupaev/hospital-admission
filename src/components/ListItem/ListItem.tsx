import React from 'react';

import remove from './../../assets/images/remove.svg';
import edit from './../../assets/images/edit.svg';

import styles from './ListItem.module.scss';

import type { FC } from 'react';
import type { IAdmission } from '../../interfaces/IAdmission';

export interface IListitemProps {
  item: IAdmission
}

const ListItem: FC<IListitemProps> = ({ item }): JSX.Element => {
  return (
    <div className={styles.admissions} key={item._id}>
      <div className={styles.pacient}><span>{item.pacient}</span></div>
      <div className={styles.doctor}><span>{item.doctor}</span></div>
      <div className={styles.date}><span>{item.date}</span></div>
      <div className={styles.complaint}><span>{item.complaint}</span></div>
      <div className={styles.buttons}>
        <span
          id={item._id}
          className={styles.remove}
        >
          <img src={remove} alt="remove" />
        </span>
        <span
          id={item._id}
          className={styles.edit}
        >
          <img src={edit} alt="edit" />
        </span>
      </div>
    </div>
  );
};

export default ListItem;
