import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdmissionsList from '../components/AdmissionsList/AdmissionsList';
import Title from '../components/Title/Title';
import { getAdmissions } from '../store/reducers/actionCreators';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import CreateMenu from '../components/CreateMenu/CreateMenu';
import Modal from '../components/Modal/Modal';
import type { IAdmission } from '../models/IAdmission';
import FormInput from '../components/FormInput/FormInput';

const MainPage = (): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isChangeOpened, setIsChangeOpened] = useState<boolean>(false);
  const [changeId, setChangeId] = useState<any>({ _id: '' });
  const [changeForms, setChangeForms] = useState<IAdmission>({ _id: '', pacient: '', doctor: '', date: '', complaint: '' });

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

  const removeAdmission = async (body: any): Promise<any> => {
    return await axios.delete('http://localhost:8000/admission', { data: body });
  };

  const dispatcher = useAppDispatch();

  const removeHandler = async (): Promise<any> => {
    let result = false;
    await removeAdmission(changeId).then(res => {
      result = res.data.acknowledged;
    }).catch(err => {
      result = err;
    });
    if (result && typeof result !== 'string') {
      dispatcher(getAdmissions());
    }
  };

  // const storage = localStorage.getItem('admissions');
  const adsRedux = useAppSelector(state => state.admissionReducer.admissions);
  const [ads, setAds] = useState(adsRedux);

  const token = localStorage.getItem('token');
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const navigate = useNavigate();
  const param = Object.values(useParams())[0];
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAds(adsRedux);
  }, [adsRedux]);

  useEffect(() => {
    const token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '';
    if (typeof token !== 'string' || token === '') {
      navigate('/auth');
    } else if (param !== 'auth' && typeof param !== 'undefined') {
      navigate('/');
    };
    dispatch(getAdmissions());
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Modal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        title='Удалить прием'
        buttonSettings={['Удалить', removeHandler]}
      >
        <div>Вы действительно хотите удалить прием?</div>
      </Modal>
      <Modal
        isOpened={isChangeOpened}
        setIsOpened={setIsChangeOpened}
        title='Изменить прием'
        buttonSettings={['Сохранить', () => {}]}
      >
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
      </Modal>
      <Title body='Приемы' showExit />
      <CreateMenu ads={ads} setAds={setAds} />
      <AdmissionsList
        prepareChangeModal={prepareChangeModal}
        setIsChangeOpened={setIsChangeOpened}
        setIsOpened={setIsOpened}
        setChangeId={setChangeId}
        admissions={ads}
      />
    </div>
  );
};

export default MainPage;
