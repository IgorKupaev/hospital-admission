import type { IAdmission } from '../IAdmission';

export interface IChangeFormsProps {
  changeForms: IAdmission
  setChangeForms: (val: IAdmission) => void
};
