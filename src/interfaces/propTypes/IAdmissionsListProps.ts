import type { IAdmission } from '../IAdmission';

export interface IAdmissionsListProps {
  admissions: IAdmission[]
  setIsOpened: (value: boolean) => void
  setChangeId: (value: any) => void
  setIsChangeOpened: (value: boolean) => void
  prepareChangeModal: (value: any) => void
};
