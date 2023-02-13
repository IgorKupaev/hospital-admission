import type { IAdmission } from '../IAdmission';

export interface IChangeModalProps {
  isChangeOpened: boolean
  setIsChangeOpened: (value: boolean) => void
  changeForms: IAdmission
  setChangeForms: (value: IAdmission) => void
};
