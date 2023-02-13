import React from 'react';

import FormInput from '../FormInput/FormInput';

import type { FC } from 'react';

import type { IChangeFormsProps } from '../../interfaces/propTypes/IChangeFormsProps';

const ChangeForms: FC<IChangeFormsProps> = ({ changeForms, setChangeForms }): JSX.Element => {
  const { pacient, doctor, date, complaint } = changeForms;
  const changeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setChangeForms({ ...changeForms, pacient: e.currentTarget.value });
  };
  const changeDoctor = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setChangeForms({ ...changeForms, doctor: e.currentTarget.value });
  };
  const changeDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setChangeForms({ ...changeForms, date: e.currentTarget.value });
  };
  const changeComplaint = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setChangeForms({ ...changeForms, complaint: e.currentTarget.value });
  };
  return (
    <div>
      <FormInput
        title='Имя'
        value={pacient}
        onChange={changeName}
      />
      <FormInput
        title='Врач'
        value={doctor}
        onChange={changeDoctor}
      />
      <FormInput
        title='Дата'
        type='date'
        value={date}
        onChange={changeDate}
      />
      <FormInput
        title='Жалобы'
        value={complaint}
        onChange={changeComplaint}
      />
    </div>
  );
};

export default ChangeForms;
