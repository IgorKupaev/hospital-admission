import React from 'react';
import axios from 'axios';
import { store } from '../../store/store';

import { createAdmission } from '../../store/reducers/admissionSlice';

import styles from './CreateMenu.module.scss';

import type { ICreateMenuProps } from '../../interfaces/propTypes/ICreateMenuProps';
import CreateMenuInputs from '../CreateMenuInputs/CreateMenuInputs';

const initialState: INewAdmission = { pacient: '', doctor: '', date: '', complaint: '' };

interface INewAdmission {
  pacient: string
  doctor: string
  date: string
  complaint: string
}

interface CreateMenuState {
  newAdmission: INewAdmission
  isDisabled: boolean
}

class CreateMenu extends React.Component<ICreateMenuProps, CreateMenuState> {
  constructor (props: ICreateMenuProps) {
    super(props);

    this.setNewAdmission = this.setNewAdmission.bind(this);
    this.setIsDisabled = this.setIsDisabled.bind(this);
    this.createNewAdmission = this.createNewAdmission.bind(this);
    this.createHandler = this.createHandler.bind(this);

    this.state = {
      newAdmission: initialState,
      isDisabled: true
    };
  }

  setNewAdmission (value: INewAdmission): void {
    this.setState({
      newAdmission: value
    });
  }

  setIsDisabled (value: boolean): void {
    this.setState({
      isDisabled: value
    });
  }

  async createNewAdmission (): Promise<any> {
    return await axios.post('http://localhost:8000/admission', this.state.newAdmission);
  }

  createHandler (): void {
    let fetchedAdmission = { ...this.state.newAdmission, _id: '' };
    this.createNewAdmission().then(res => {
      fetchedAdmission = res.data;
      store.dispatch(createAdmission(fetchedAdmission));
    }).catch(err => {
      fetchedAdmission = err;
    });
    if (typeof fetchedAdmission !== 'string') {
      this.props.setAds([...this.props.ads, fetchedAdmission]);
      this.setNewAdmission(initialState);
    }
  }

  componentDidUpdate (prevProps: ICreateMenuProps, prevState: CreateMenuState): void {
    if (prevState.newAdmission.complaint !== this.state.newAdmission.complaint ||
        prevState.newAdmission.date !== this.state.newAdmission.date ||
        prevState.newAdmission.doctor !== this.state.newAdmission.doctor ||
        prevState.newAdmission.pacient !== this.state.newAdmission.pacient) {
      let status = true;
      for (const value of Object.values(this.state.newAdmission)) {
        if (value.length < 6) {
          status = false;
        }
      };
      if (status) {
        this.setIsDisabled(false);
      } else {
        this.setIsDisabled(true);
      };
    }
  }

  render (): JSX.Element {
    return (
      <div className={styles.menu}>
        <div className={styles.menuContainer}>
          <CreateMenuInputs newAdmission={this.state.newAdmission} setNewAdmission={this.setNewAdmission} />
          <div className={this.state.isDisabled ? styles.disabled : styles.menuButton}>
            <button disabled={this.state.isDisabled} onClick={this.createHandler}>
              Добавить
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateMenu;
