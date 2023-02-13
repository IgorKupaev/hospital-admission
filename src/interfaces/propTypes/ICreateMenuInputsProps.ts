import type { INewAdmission } from '../INewAdmission';

export interface ICreateMenuInputsProps {
  newAdmission: INewAdmission
  setNewAdmission: (value: INewAdmission) => void
};
