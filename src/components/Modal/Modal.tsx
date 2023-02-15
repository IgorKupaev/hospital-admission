import React from 'react';

import styles from './Modal.module.scss';

import type { IModalProps } from '../../interfaces/propTypes/IModalProps';
import type { MouseEvent } from 'react';

class Modal extends React.Component<IModalProps> {
  constructor (props: IModalProps) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  closeModal (): void {
    this.props.setIsOpened(false);
  };

  buttonHandler (): void {
    this.props.buttonSettings[1]();
    this.props.setIsOpened(false);
  };

  stopPropogationHandler (e: MouseEvent<HTMLDivElement>): void {
    e.stopPropagation();
  };

  render (): JSX.Element {
    return (
      <div onClick={this.closeModal} className={this.props.isOpened ? styles.modal : styles.closed}>
        <div onClick={this.stopPropogationHandler} className={styles.modalContainer}>
          <div className={styles.modalTitle}>
            {this.props.title}
          </div>
          <div className={styles.modalBody}>
            {this.props.children}
          </div>
          <div className={styles.modalButtons}>
            <button onClick={this.closeModal} className="modalButton">Отмена</button>
            <button
              disabled={typeof this.props.isDisabled === 'boolean' ? this.props.isDisabled : false}
              onClick={this.buttonHandler}
              className="modalButton"
            >
              {this.props.buttonSettings[0]}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
