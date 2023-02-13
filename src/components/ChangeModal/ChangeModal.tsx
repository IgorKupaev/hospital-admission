import React, { useEffect, useState } from 'react';

import Modal from '../Modal/Modal';
import ChangeForms from '../ChangeForms/ChangeForms';
import { useAppDispatch } from '../../hooks/redux';
import { editAdmissions } from '../../store/reducers/actionCreators';

import type { IChangeModalProps } from '../../interfaces/propTypes/IChangeModalProps';
import type { FC } from 'react';

const ChangeModal: FC<IChangeModalProps> = ({ isChangeOpened, setIsChangeOpened, changeForms, setChangeForms }): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsDisabled(false);
    for (const value of Object.values(changeForms)) {
      if (value.length < 6) {
        setIsDisabled(true);
        break;
      }
    };
  }, [changeForms]);

  const editAdmission = (): void => {
    dispatch(editAdmissions({ data: changeForms }));
  };
  return (
    <Modal
      isDisabled={isDisabled}
      isOpened={isChangeOpened}
      setIsOpened={setIsChangeOpened}
      title='Изменить прием'
      buttonSettings={['Сохранить', editAdmission]}
    >
      <ChangeForms changeForms={changeForms} setChangeForms={setChangeForms} />
    </Modal>
  );
};

export default ChangeModal;
