import React from 'react';

import styles from './FormInput.module.scss';

import type { IFormInputProps } from '../../interfaces/propTypes/IFormInputProps';

class FormInput extends React.Component<IFormInputProps> {
  render (): JSX.Element {
    return (
      <div className={styles.inputContainer}>
        <h4 className={styles.title}>{this.props.title}:</h4>
        <input className={styles.input} {...this.props} placeholder={this.props.title} />
      </div>
    );
  }
}

export default FormInput;
