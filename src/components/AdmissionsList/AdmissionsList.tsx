import React from 'react';
import type { IAdmission } from '../../models/IAdmission';
import type { FC } from 'react';
import styles from './AdmissionsList.module.scss';
import remove from './../../assets/images/remove.svg';
import edit from './../../assets/images/edit.svg';

interface IAdmissionsListProps {
  admissions: IAdmission[]
  setIsOpened: (value: boolean) => void
  setChangeId: (value: string) => void
  setIsChangeOpened: (value: boolean) => void
  prepareChangeModal: (value: string) => void
}

const AdmissionsList: FC<IAdmissionsListProps> = ({ admissions, setIsOpened, setChangeId, setIsChangeOpened, prepareChangeModal }): JSX.Element => {
  const removeHandler = async (body: any): Promise<any> => {
    setIsOpened(true);
    setChangeId(body);
  };
  const changeHandler = (id: any): void => {
    prepareChangeModal(id);
    setIsChangeOpened(true);
  };

  return (
    <div className={styles.admissionsContainer}>
      <div className={styles.admissionsTitle}><span>Имя</span><span>Врач</span><span>Дата</span><span>Жалобы</span></div>
      {admissions.map(item => {
        return (
          <div className={styles.admissions} key={item._id}>
            <div className={styles.pacient}><span>{item.pacient}</span></div>
            <div className={styles.doctor}><span>{item.doctor}</span></div>
            <div className={styles.date}><span>{item.date}</span></div>
            <div className={styles.complaint}><span>{item.complaint}</span></div>
            <div className={styles.buttons}>
              <span id={item._id} onClick={e => { void removeHandler({ _id: e.currentTarget.id }); }} className={styles.remove}>
                <img src={remove} alt="" />
              </span>
              <span id={item._id} onClick={ e => { changeHandler({ _id: e.currentTarget.id }); } } className={styles.edit}>
                <img src={edit} alt="" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdmissionsList;
