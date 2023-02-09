import type { IAdmission } from '../IAdmission';

export interface ICreateMenuProps {
  ads: IAdmission[]
  setAds: (value: IAdmission[]) => void
};
