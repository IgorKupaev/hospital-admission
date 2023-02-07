import { useAppSelector } from './redux';

export const useSort = (admissions: any): any => {
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
