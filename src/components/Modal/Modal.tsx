import React from 'react';

import styles from './Modal.module.scss';

import type { IModalProps } from '../../interfaces/propTypes/IModalProps';
import type { FC, MouseEvent } from 'react';

const Modal: FC<IModalProps> = ({ children, title, buttonSettings, isOpened, setIsOpened, isDisabled }): JSX.Element => {
  const closeModal = (): void => {
    setIsOpened(false);
  };
  const buttonHandler = (): void => {
    buttonSettings[1]();
    setIsOpened(false);
  };
  const stopPropogationHandler = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };
  return (
    <div onClick={closeModal} className={isOpened ? styles.modal : styles.closed}>
      <div onClick={stopPropogationHandler} className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          {title}
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
        <div className={styles.modalButtons}>
          <button onClick={closeModal} className="modalButton">Отмена</button>
          <button
            disabled={typeof isDisabled === 'boolean' ? isDisabled : false}
            onClick={buttonHandler}
            className="modalButton"
          >
            {buttonSettings[0]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
