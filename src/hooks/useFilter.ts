import type { IAdmission } from '../interfaces/IAdmission';
import { store } from '../store/store';

export const useFilter = (admissions: IAdmission[]): IAdmission[] => {
  const filterOptions = store.getState().filterReducer;
  if (filterOptions.from === '' && filterOptions.to === '') {
    return admissions;
  }
  if (filterOptions.from !== '' && filterOptions.to === '') {
    const parsedDate = Date.parse(filterOptions.from);
    return [...admissions].filter((item) => Date.parse(item.date) >= parsedDate);
  }
  if (filterOptions.from === '' && filterOptions.to !== '') {
    const parsedDate = Date.parse(filterOptions.to);
    return [...admissions].filter((item) => Date.parse(item.date) <= parsedDate);
  }
  if (filterOptions.from !== '' && filterOptions.to !== '') {
    const parsedDateFrom = Date.parse(filterOptions.from);
    const parsedDateTo = Date.parse(filterOptions.to);
    return [...admissions].filter((item) => Date.parse(item.date) <= parsedDateTo && Date.parse(item.date) >= parsedDateFrom);
  }
  return admissions;
};
