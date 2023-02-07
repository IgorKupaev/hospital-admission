import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdmissionsList from '../components/AdmissionsList/AdmissionsList';
import Title from '../components/Title/Title';
import { getAdmissions, removeAdmission } from '../store/reducers/actionCreators';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import CreateMenu from '../components/CreateMenu/CreateMenu';
import Modal from '../components/Modal/Modal';
import type { IAdmission } from '../models/IAdmission';
import ChangeModal from '../components/ChangeModal/ChangeModal';
import { useAuthRouting } from '../hooks/useAuthRouting';
import SortMenu from '../components/SortMenu/SortMenu';

const MainPage = (): JSX.Element => {
  const [isRemoveOpened, setIsRemoveOpened] = useState<boolean>(false);
  const [isChangeOpened, setIsChangeOpened] = useState<boolean>(false);
  const [changeId, setChangeId] = useState<any>({ _id: '' });
  const [changeForms, setChangeForms] = useState<IAdmission>({ _id: '', pacient: '', doctor: '', date: '', complaint: '' });

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
    return { _id: '', complaint: '', pacient: '', doctor: '', date: '' };
  };

  const prepareChangeModal = (body: any): void => {
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

  const removeHandler = (): any => {
    dispatch(removeAdmission(changeId)).then((res: any) => {
      dispatch(getAdmissions());
      return res.data.acknowledged;
    }).catch((err: any) => {
      return err;
    });
  };

  return (
    <div style={{ width: '100%' }}>
      <Title body='Приемы' showExit />
      <CreateMenu ads={ads} setAds={setAds} />
      <SortMenu />
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
