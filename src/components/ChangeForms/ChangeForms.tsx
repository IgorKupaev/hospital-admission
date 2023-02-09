import React from 'react';

import FormInput from '../FormInput/FormInput';

import type { IChangeFormsProps } from '../../interfaces/propTypes/IChangeFormsProps';
import type { FC } from 'react';

const ChangeForms: FC<IChangeFormsProps> = ({ changeForms, setChangeForms }): JSX.Element => {
  const { pacient, doctor, date, complaint } = changeForms;
  return (
    <div>
      <FormInput
        title='Имя'
        value={pacient}
        onChange={e => { setChangeForms({ ...changeForms, pacient: e.currentTarget.value }); }}
      />
      <FormInput
        title='Врач'
        value={doctor}
        onChange={e => { setChangeForms({ ...changeForms, doctor: e.currentTarget.value }); }}
      />
      <FormInput
        title='Дата'
        type='date'
        value={date}
        onChange={e => { setChangeForms({ ...changeForms, date: e.currentTarget.value }); }}
      />
      <FormInput
        title='Жалобы'
        value={complaint}
        onChange={e => { setChangeForms({ ...changeForms, complaint: e.currentTarget.value }); }}
      />
    </div>
  );
};

export default ChangeForms;
