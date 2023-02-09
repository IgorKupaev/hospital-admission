import React from 'react';

import styles from './FormInput.module.scss';

import type { IFormInputProps } from '../../interfaces/propTypes/IFormInputProps';
import type { FC } from 'react';

const FormInput: FC<IFormInputProps> = ({ title, ...props }): JSX.Element => {
  return (
    <div className={styles.inputContainer}>
      <h4 className={styles.title}>{title}:</h4>
      <input className={styles.input} {...props} placeholder={title} />
    </div>
  );
};

export default FormInput;
