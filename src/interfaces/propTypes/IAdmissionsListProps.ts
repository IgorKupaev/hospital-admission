import type { IAdmission } from '../IAdmission';

export interface IAdmissionsListProps {
  admissions: IAdmission[]
  setIsOpened: (value: boolean) => void
  setChangeId: (value: { _id: string }) => void
  setIsChangeOpened: (value: boolean) => void
  prepareChangeModal: (value: { _id: string }) => void
};
