import React from 'react';

import styles from './CreateMenuInputs.module.scss';

import type { ChangeEvent } from 'react';

import type { ICreateMenuInputsProps } from '../../interfaces/propTypes/ICreateMenuInputsProps';

class CreateMenuInputs extends React.Component<ICreateMenuInputsProps> {
  constructor (props: ICreateMenuInputsProps) {
    super(props);
    this.setNewPacient = this.setNewPacient.bind(this);
    this.setNewDoctor = this.setNewDoctor.bind(this);
    this.setNewDate = this.setNewDate.bind(this);
    this.setNewComplaint = this.setNewComplaint.bind(this);
  }

  setNewPacient (e: ChangeEvent<HTMLInputElement>): void {
    this.props.setNewAdmission({ ...this.props.newAdmission, pacient: e.target.value });
  };

  setNewDoctor (e: ChangeEvent<HTMLInputElement>): void {
    this.props.setNewAdmission({ ...this.props.newAdmission, doctor: e.target.value });
  };

  setNewDate (e: ChangeEvent<HTMLInputElement>): void {
    this.props.setNewAdmission({ ...this.props.newAdmission, date: e.target.value });
  };

  setNewComplaint (e: ChangeEvent<HTMLInputElement>): void {
    this.props.setNewAdmission({ ...this.props.newAdmission, complaint: e.target.value });
  };

  render (): JSX.Element {
    return (
      <>
        <div className={styles.menuInput}>
          <span>Имя: </span>
          <input
            value={this.props.newAdmission.pacient}
            onChange={this.setNewPacient}
            type="text"
          />
        </div>
        <div className={styles.menuInput}>
          <span>Врач: </span>
          <input
            value={this.props.newAdmission.doctor}
            onChange={this.setNewDoctor}
            type="text"
          />
        </div>
        <div className={styles.menuInput}>
          <span>Дата: </span>
          <input
            value={this.props.newAdmission.date}
            onChange={this.setNewDate}
            type="date"
          />
        </div>
        <div className={styles.menuInput}>
          <span>Жалобы: </span>
          <input
            value={this.props.newAdmission.complaint}
            onChange={this.setNewComplaint}
            type="text"
          />
        </div>
      </>
    );
  }
}

export default CreateMenuInputs;
