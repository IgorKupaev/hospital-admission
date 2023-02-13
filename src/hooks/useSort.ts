import type { IAdmission } from '../interfaces/IAdmission';
import { useAppSelector } from './redux';

export const useSort = (admissions: any): IAdmission[] => {
  const sortOptions = useAppSelector(state => state.sortReducer);
  if (sortOptions.sort === 'none') {
    return admissions;
  }
  const sorted = [...admissions].sort((a, b) => a[sortOptions.sort].localeCompare(b[sortOptions.sort]));
  if (sortOptions.direction === 'decrease') {
    return sorted.reverse();
  }
  return sorted;
};
