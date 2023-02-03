import React from 'react';
import type { FC } from 'react';
import styles from './FormInput.module.scss';

interface IFormInputProps {
  body: string
  value?: any
  onChange?: (e: any) => void
  type?: string
}

const FormInput: FC<IFormInputProps> = ({ body, ...props }): JSX.Element => {
  return (
    <div className={styles.inputContainer}>
      <h4 className={styles.title}>{body}:</h4>
      <input className={styles.input} {...props} placeholder={body} />
    </div>
  );
};

export default FormInput;
