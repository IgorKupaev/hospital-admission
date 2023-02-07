import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import Modal from '../Modal/Modal';
import ChangeForms from '../ChangeForms/ChangeForms';
import { useAppDispatch } from '../../hooks/redux';
import { editAdmissions } from '../../store/reducers/actionCreators';
import type { IChangeModalProps } from '../../models/propTypes/IChangeModalProps';

const ChangeModal: FC<IChangeModalProps> = (props): JSX.Element => {
  const { isChangeOpened, setIsChangeOpened, changeForms, setChangeForms } = props;
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let status = true;
    for (const value of Object.values(changeForms)) {
      if (value.length < 6) {
        status = false;
      }
    };
    if (status) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
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
