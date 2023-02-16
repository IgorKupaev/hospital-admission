import React from 'react';
import axios from 'axios';

import { getAdmissions, removeAdmission } from '../store/reducers/actionCreators';
import AdmissionsList from '../components/AdmissionsList/AdmissionsList';
import Title from '../components/Title/Title';
import Modal from '../components/Modal/Modal';
import ChangeModal from '../components/ChangeModal/ChangeModal';
import Menu from '../components/Menu/Menu';
import { Navigate } from 'react-router-dom';

import type { IAdmission } from '../interfaces/IAdmission';
import type { IChangeId } from '../interfaces/IChangeId';
import { store } from '../store/store';
import { connect } from 'react-redux';

const initialAdmission: IAdmission = { _id: '', pacient: '', doctor: '', date: '', complaint: '' };

interface MainPageState {
  isRemoveOpened: boolean
  isChangeOpened: boolean
  changeId: IChangeId
  changeForms: IAdmission
  isFilterHidden: boolean
  adsRedux: IAdmission[]
  token: string
  admissions: IAdmission[]
  isAuthorized: boolean
}

class MainPage extends React.Component<unknown, MainPageState> {
  constructor (props: unknown) {
    super(props);

    this.setIsRemoveOpened = this.setIsRemoveOpened.bind(this);
    this.setIsChangeOpened = this.setIsChangeOpened.bind(this);
    this.setChangeId = this.setChangeId.bind(this);
    this.setChangeForms = this.setChangeForms.bind(this);
    this.setIsFilterHidden = this.setIsFilterHidden.bind(this);
    this.getAdmissionById = this.getAdmissionById.bind(this);
    this.prepareChangeModal = this.prepareChangeModal.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
    this.setAdmissions = this.setAdmissions.bind(this);

    this.state = {
      isRemoveOpened: false,
      isChangeOpened: false,
      changeId: { _id: '' },
      changeForms: initialAdmission,
      isFilterHidden: true,
      adsRedux: store.getState().admissionReducer.admissions,
      token: store.getState().loginReducer.token,
      admissions: [],
      isAuthorized: true
    };
  }

  setIsRemoveOpened (value: boolean): void {
    this.setState({
      isRemoveOpened: value
    });
  }

  setIsChangeOpened (value: boolean): void {
    this.setState({
      isChangeOpened: value
    });
  }

  setChangeId (value: { _id: string }): void {
    this.setState({
      changeId: value
    });
  }

  setChangeForms (value: IAdmission): void {
    this.setState({
      changeForms: value
    });
  }

  setIsFilterHidden (value: boolean): void {
    this.setState({
      isFilterHidden: value
    });
  }

  getAdmissionById (id: string): IAdmission {
    console.log(store.getState().admissionReducer.admissions);
    for (const item of store.getState().admissionReducer.admissions) {
      if (item._id === id) {
        return item;
      }
    }
    return initialAdmission;
  }

  prepareChangeModal (body: IChangeId): void {
    const id = body._id;

    this.setChangeId(body);
    this.setChangeForms(
      {
        _id: id,
        pacient: this.getAdmissionById(id).pacient,
        doctor: this.getAdmissionById(id).doctor,
        complaint: this.getAdmissionById(id).complaint,
        date: this.getAdmissionById(id).date
      });
  }

  setAdmissions (value: IAdmission[]): void {
    this.setState({
      admissions: value
    });
  }

  removeHandler (): void {
    store.dispatch(removeAdmission({ data: this.state.changeId })).then(() => {
      store.dispatch(getAdmissions());
    });
  }

  componentDidMount (): void {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    axios.defaults.headers.common.Authorization = `Bearer ${this.state.token}`;
    store.dispatch(getAdmissions());
    this.setState({
      admissions: store.getState().admissionReducer.admissions
    });
  }

  render (): JSX.Element {
    return (
      <div style={{ width: '100%' }}>
        {!this.state.isAuthorized && <Navigate to='/auth' />}
        <Title body='Приемы' showExit />
        <Menu ads={this.state.admissions} setAds={this.setAdmissions} isFilterHidden={this.state.isFilterHidden} setIsFilterHidden={this.setIsFilterHidden} />
        <AdmissionsList
          prepareChangeModal={this.prepareChangeModal}
          setIsChangeOpened={this.setIsChangeOpened}
          setIsOpened={this.setIsRemoveOpened}
          setChangeId={this.setChangeId}
          admissions={this.state.admissions}
        />
        <Modal
          isOpened={this.state.isRemoveOpened}
          setIsOpened={this.setIsRemoveOpened}
          title='Удалить прием'
          buttonSettings={['Удалить', this.removeHandler]}
        >
          <div>Вы действительно хотите удалить прием?</div>
        </Modal>
        <ChangeModal
          isChangeOpened={this.state.isChangeOpened}
          setIsChangeOpened={this.setIsChangeOpened}
          changeForms={this.state.changeForms}
          setChangeForms={this.setChangeForms}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any): { token: string, adsRedux: IAdmission[] } => {
  return {
    token: state.loginReducer.token,
    adsRedux: state.admissionReducer.admissions
  };
};

export default connect(mapStateToProps)(MainPage);
