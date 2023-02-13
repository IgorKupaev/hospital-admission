import React from 'react';

import { useSort } from '../../hooks/useSort';
import { useFilter } from '../../hooks/useFilter';

import styles from './AdmissionsList.module.scss';

import type { FC } from 'react';
import type { IAdmission } from '../../interfaces/IAdmission';
import type { IAdmissionsListProps } from '../../interfaces/propTypes/IAdmissionsListProps';
import ListItem from '../ListItem/ListItem';

const AdmissionsList: FC<IAdmissionsListProps> = ({ admissions, setIsOpened, setChangeId, setIsChangeOpened, prepareChangeModal }): JSX.Element => {
  const admissionEdit = (data: { _id: string }): void => {
    prepareChangeModal(data);
    setIsChangeOpened(true);
  };

  const admissionRemove = (data: { _id: string }): void => {
    setChangeId(data);
    setIsOpened(true);
  };

  const admissionsHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    if (target.id === '') return;
    const action = target.lastElementChild?.attributes[1].nodeValue;
    action === 'edit' ? admissionEdit({ _id: target.id }) : admissionRemove({ _id: target.id });
  };

  const filteredAndSorted: IAdmission[] = useFilter(useSort(admissions));

  return (
    <div onClick={admissionsHandler} className={styles.admissionsContainer}>
      <div className={styles.admissionsTitle}>
        <span>Имя</span>
        <span>Врач</span>
        <span>Дата</span>
        <span>Жалобы</span>
      </div>
      {filteredAndSorted
        .map(admission => <ListItem key={admission._id} item={admission} />)}
    </div>
  );
};

export default AdmissionsList;
