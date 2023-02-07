import React from 'react';
import type { FC } from 'react';
import FormInput from '../FormInput/FormInput';
import type { IChangeFormsProps } from '../../models/propTypes/IChangeFormsProps';

const ChangeForms: FC<IChangeFormsProps> = ({ changeForms, setChangeForms }): JSX.Element => {
  return (
    <div>
      <FormInput
        body='Имя'
        value={changeForms.pacient}
        onChange={e => { setChangeForms({ ...changeForms, pacient: e.currentTarget.value }); }}
      />
      <FormInput
        body='Врач'
        value={changeForms.doctor}
        onChange={e => { setChangeForms({ ...changeForms, doctor: e.currentTarget.value }); }}
      />
      <FormInput
        body='Дата'
        type='date'
        value={changeForms.date}
        onChange={e => { setChangeForms({ ...changeForms, date: e.currentTarget.value }); }}
      />
      <FormInput
        body='Жалобы'
        value={changeForms.complaint}
        onChange={e => { setChangeForms({ ...changeForms, complaint: e.currentTarget.value }); }}
      />
    </div>
  );
};

export default ChangeForms;
