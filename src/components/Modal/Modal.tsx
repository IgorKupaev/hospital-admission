import React from 'react';
import type { FC } from 'react';
import styles from './Modal.module.scss';

export interface IModalProps {
  children: JSX.Element
  title: string
  buttonSettings: [text: string, callBack: () => void]
  isOpened: boolean
  setIsOpened: (value: boolean) => void
}

const Modal: FC<IModalProps> = (props): JSX.Element => {
  const { children, title, buttonSettings, isOpened, setIsOpened } = props;
  const closeModal = (): void => {
    setIsOpened(false);
  };
  const buttonHandler = (): void => {
    buttonSettings[1]();
    setIsOpened(false);
  };
  return (
    <div onClick={closeModal} className={isOpened ? styles.modal : styles.closed}>
      <div onClick={e => { e.stopPropagation(); }} className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          {title}
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
        <div className={styles.modalButtons}>
          <button onClick={closeModal} className="modalButton">Отмена</button>
          <button onClick={buttonHandler} className="modalButton">{buttonSettings[0]}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
