import React from 'react';

import remove from './../../assets/images/remove.svg';
import edit from './../../assets/images/edit.svg';

import styles from './ListItem.module.scss';

import type { IAdmission } from '../../interfaces/IAdmission';

export interface IListitemProps {
  item: IAdmission
}

class ListItem extends React.Component<IListitemProps> {
  render (): JSX.Element {
    return (
      <div className={styles.admissions} key={this.props.item._id}>
        <div className={styles.pacient}><span>{this.props.item.pacient}</span></div>
        <div className={styles.doctor}><span>{this.props.item.doctor}</span></div>
        <div className={styles.date}><span>{this.props.item.date}</span></div>
        <div className={styles.complaint}><span>{this.props.item.complaint}</span></div>
        <div className={styles.buttons}>
          <span
            id={this.props.item._id}
            className={styles.remove}
          >
            <img src={remove} alt="remove" />
          </span>
          <span
            id={this.props.item._id}
            className={styles.edit}
          >
            <img src={edit} alt="edit" />
          </span>
        </div>
      </div>
    );
  }
}

export default ListItem;
