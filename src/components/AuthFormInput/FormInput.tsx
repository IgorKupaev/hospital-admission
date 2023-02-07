import React from 'react';
import type { FC } from 'react';
import styles from './FormInput.module.scss';
import type { IFormInputProps } from '../../models/propTypes/IFormInputProps';

const FormInput: FC<IFormInputProps> = ({ body, ...props }): JSX.Element => {
  return (
    <div className={styles.inputContainer}>
      <h4 className={styles.title}>{body}:</h4>
      <input className={styles.input} {...props} placeholder={body} />
    </div>
  );
};

export default FormInput;
