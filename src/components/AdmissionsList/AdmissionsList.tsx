import React from 'react';
import { store } from '../../store/store';

import { useSort } from '../../hooks/useSort';
import { useFilter } from '../../hooks/useFilter';

import styles from './AdmissionsList.module.scss';

import type { IAdmission } from '../../interfaces/IAdmission';
import type { IAdmissionsListProps } from '../../interfaces/propTypes/IAdmissionsListProps';
import type { IFilterOptions } from '../../interfaces/IFilterOptions';

import ListItem from '../ListItem/ListItem';

class AdmissionsList extends React.Component<IAdmissionsListProps, { filteredAndSorted: IAdmission[], filterOptions: IFilterOptions }> {
  constructor (props: IAdmissionsListProps) {
    super(props);
    this.admissionEdit = this.admissionEdit.bind(this);
    this.admissionRemove = this.admissionRemove.bind(this);
    this.admissionsHandler = this.admissionsHandler.bind(this);
    this.state = {
      filteredAndSorted: useFilter(useSort(store.getState().admissionReducer.admissions)),
      filterOptions: store.getState().filterReducer
    };
  }

  admissionEdit (data: { _id: string }): void {
    this.props.prepareChangeModal(data);
    this.props.setIsChangeOpened(true);
  }

  admissionRemove (data: { _id: string }): void {
    this.props.setChangeId(data);
    this.props.setIsOpened(true);
  }

  admissionsHandler (e: React.MouseEvent<HTMLElement>): void {
    const target = e.target as HTMLElement;
    if (target.id === '') return;
    const action = target.lastElementChild?.attributes[1].nodeValue;
    action === 'edit' ? this.admissionEdit({ _id: target.id }) : this.admissionRemove({ _id: target.id });
  }

  componentDidMount (): void {
    store.subscribe(() => {
      this.setState({ filteredAndSorted: useFilter(useSort(store.getState().admissionReducer.admissions)) });
    });
  }

  render (): JSX.Element {
    return (
      <div onClick={this.admissionsHandler} className={styles.admissionsContainer}>
      <div className={styles.admissionsTitle}>
        <span>Имя</span>
        <span>Врач</span>
        <span>Дата</span>
        <span>Жалобы</span>
      </div>
      {this.state.filteredAndSorted
        .map(admission => <ListItem key={admission._id} item={admission} />)}
      </div>
    );
  }
}

export default AdmissionsList;
