import React from 'react';

import { useSort } from '../../hooks/useSort';
import { useFilter } from '../../hooks/useFilter';

import styles from './AdmissionsList.module.scss';

import type { FC } from 'react';
import type { IAdmission } from '../../interfaces/IAdmission';
import type { IAdmissionsListProps } from '../../interfaces/propTypes/IAdmissionsListProps';
import ListItem from '../ListItem/ListItem';

const AdmissionsList: FC<IAdmissionsListProps> = (props): JSX.Element => {
  const { admissions, setIsOpened, setChangeId, setIsChangeOpened, prepareChangeModal } = props;

  const admissionsHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    let action, id;
    if (target.id !== '') {
      id = target.id;
      action = target.lastElementChild?.attributes[1].nodeValue;
      if (action === 'edit') {
        prepareChangeModal({ _id: id });
        setIsChangeOpened(true);
      } else if (action === 'remove') {
        setIsOpened(true);
        setChangeId({ _id: id });
      }
    }
  };

  const sorted: IAdmission[] = useSort(admissions);
  const filteredAndSorted: IAdmission[] = useFilter(sorted);

  return (
    <div onClick={admissionsHandler} className={styles.admissionsContainer}>
      <div className={styles.admissionsTitle}>
        <span>Имя</span>
        <span>Врач</span>
        <span>Дата</span>
        <span>Жалобы</span>
      </div>
      {filteredAndSorted
        .map(item => <ListItem key={item._id} item={item} />)}
    </div>
  );
};

export default AdmissionsList;
