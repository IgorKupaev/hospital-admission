import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getAdmissions, removeAdmission } from '../store/reducers/actionCreators';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useAuthRouting } from '../hooks/useAuthRouting';
import AdmissionsList from '../components/AdmissionsList/AdmissionsList';
import Title from '../components/Title/Title';
import Modal from '../components/Modal/Modal';
import ChangeModal from '../components/ChangeModal/ChangeModal';
import Menu from '../components/Menu/Menu';

import type { IAdmission } from '../interfaces/IAdmission';
import type { IChangeId } from '../interfaces/IChangeId';

const MainPage = (): JSX.Element => {
  const initialAdmission: IAdmission = { _id: '', pacient: '', doctor: '', date: '', complaint: '' };
  const [isRemoveOpened, setIsRemoveOpened] = useState<boolean>(false);
  const [isChangeOpened, setIsChangeOpened] = useState<boolean>(false);
  const [changeId, setChangeId] = useState<IChangeId>({ _id: '' });
  const [changeForms, setChangeForms] = useState<IAdmission>(initialAdmission);
  const [isFilterHidden, setIsFilterHidden] = useState<boolean>(true);

  const adsRedux = useAppSelector(state => state.admissionReducer.admissions);
  const [ads, setAds] = useState(adsRedux);
  useEffect(() => {
    setAds(adsRedux);
  }, [adsRedux]);

  const token = useAppSelector(state => state.loginReducer.token);
  useAuthRouting(token !== null ? token : '');
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const getAdmissionById = (id: string): IAdmission => {
    for (const item of ads) {
      if (item._id === id) {
        return item;
      }
    }
    return initialAdmission;
  };

  const prepareChangeModal = (body: IChangeId): void => {
    const id = body._id;
    setChangeId(body);
    setChangeForms(
      {
        _id: id,
        pacient: getAdmissionById(id).pacient,
        doctor: getAdmissionById(id).doctor,
        complaint: getAdmissionById(id).complaint,
        date: getAdmissionById(id).date
      });
  };

  const removeHandler = (): void => {
    console.log({ data: changeId });
    dispatch(removeAdmission({ data: changeId })).then(() => {
      dispatch(getAdmissions());
    });
  };

  return (
    <div style={{ width: '100%' }}>
      <Title body='Приемы' showExit />
      <Menu ads={ads} setAds={setAds} isFilterHidden={isFilterHidden} setIsFilterHidden={setIsFilterHidden} />
      <AdmissionsList
        prepareChangeModal={prepareChangeModal}
        setIsChangeOpened={setIsChangeOpened}
        setIsOpened={setIsRemoveOpened}
        setChangeId={setChangeId}
        admissions={ads}
      />
      <Modal
        isOpened={isRemoveOpened}
        setIsOpened={setIsRemoveOpened}
        title='Удалить прием'
        buttonSettings={['Удалить', removeHandler]}
      >
        <div>Вы действительно хотите удалить прием?</div>
      </Modal>
      <ChangeModal
        isChangeOpened={isChangeOpened}
        setIsChangeOpened={setIsChangeOpened}
        changeForms={changeForms}
        setChangeForms={setChangeForms}
      />
    </div>
  );
};

export default MainPage;
