import type { IAdmission } from '../interfaces/IAdmission';
import { store } from '../store/store';

export const useSort = (admissions: any): IAdmission[] => {
  const sortOptions = store.getState().sortReducer;
  if (sortOptions.sort === 'none') {
    return admissions;
  }
  const sorted = [...admissions].sort((a, b) => a[sortOptions.sort].localeCompare(b[sortOptions.sort]));
  if (sortOptions.direction === 'decrease') {
    return sorted.reverse();
  }
  return sorted;
};
