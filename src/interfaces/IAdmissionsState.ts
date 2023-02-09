import type { IAdmission } from './IAdmission';

export interface IAdmissionsState {
  admissions: IAdmission[]
  isLoading: boolean
  error: string
};
