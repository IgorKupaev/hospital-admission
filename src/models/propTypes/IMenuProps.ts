import type { IAdmission } from '../IAdmission';

export interface IMenuProps {
  ads: IAdmission[]
  setAds: (value: IAdmission[]) => void
  isFilterHidden: boolean
  setIsFilterHidden: (value: boolean) => void
};
