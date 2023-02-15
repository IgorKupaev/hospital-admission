import React from 'react';

import FormInput from '../FormInput/FormInput';

import type { IChangeFormsProps } from '../../interfaces/propTypes/IChangeFormsProps';

class ChangeForms extends React.Component<IChangeFormsProps> {
  constructor (props: IChangeFormsProps) {
    super(props);
    this.changeName = this.changeName.bind(this);
    this.changeDoctor = this.changeDoctor.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeComplaint = this.changeComplaint.bind(this);
  }

  changeName (e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.setChangeForms({ ...this.props.changeForms, pacient: e.currentTarget.value });
  };

  changeDoctor (e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.setChangeForms({ ...this.props.changeForms, doctor: e.currentTarget.value });
  };

  changeDate (e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.setChangeForms({ ...this.props.changeForms, date: e.currentTarget.value });
  };

  changeComplaint (e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.setChangeForms({ ...this.props.changeForms, complaint: e.currentTarget.value });
  };

  render (): JSX.Element {
    return (
      <div>
        <FormInput
          title='Имя'
          value={this.props.changeForms.pacient}
          onChange={this.changeName}
        />
        <FormInput
          title='Врач'
          value={this.props.changeForms.doctor}
          onChange={this.changeDoctor}
        />
        <FormInput
          title='Дата'
          type='date'
          value={this.props.changeForms.date}
          onChange={this.changeDate}
        />
        <FormInput
          title='Жалобы'
          value={this.props.changeForms.complaint}
          onChange={this.changeComplaint}
        />
      </div>
    );
  }
}

export default ChangeForms;
