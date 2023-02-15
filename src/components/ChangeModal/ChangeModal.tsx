import React from 'react';

import Modal from '../Modal/Modal';
import ChangeForms from '../ChangeForms/ChangeForms';
import { editAdmissions } from '../../store/reducers/actionCreators';

import type { IChangeModalProps } from '../../interfaces/propTypes/IChangeModalProps';
import { store } from '../../store/store';

interface ChangeModalState {
  isDisabled: boolean
}

class ChangeModal extends React.Component<IChangeModalProps, ChangeModalState> {
  constructor (props: IChangeModalProps) {
    super(props);

    this.setIsDisabled = this.setIsDisabled.bind(this);
    this.editAdmission = this.editAdmission.bind(this);

    this.state = {
      isDisabled: false
    };
  }

  setIsDisabled (value: boolean): void {
    this.setState({
      isDisabled: value
    });
  }

  editAdmission (): void {
    store.dispatch(editAdmissions({ data: this.props.changeForms }));
  };

  componentDidUpdate (prevProps: IChangeModalProps, prevState: ChangeModalState): void {
    if (prevProps.changeForms !== this.props.changeForms) {
      this.setIsDisabled(false);
      for (const value of Object.values(this.props.changeForms)) {
        if (value.length < 6) {
          this.setIsDisabled(true);
          break;
        }
      };
    }
  }

  render (): JSX.Element {
    return (
      <Modal
        isDisabled={this.state.isDisabled}
        isOpened={this.props.isChangeOpened}
        setIsOpened={this.props.setIsChangeOpened}
        title='Изменить прием'
        buttonSettings={['Сохранить', this.editAdmission]}
      >
        <ChangeForms changeForms={this.props.changeForms} setChangeForms={this.props.setChangeForms} />
      </Modal>
    );
  }
}

export default ChangeModal;
