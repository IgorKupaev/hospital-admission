import React, { useState } from 'react';
import type { FC } from 'react';
import styles from './FilterMenu.module.scss';
import remove from './../../assets/images/remove.svg';
import { useAppDispatch } from '../../hooks/redux';
import { changeFilter, clearFilter } from '../../store/reducers/filterSlice';
import type { IFilterOptions } from '../../models/IFilterOptions';

export interface IFilterMenuProps {
  isFilterHidden: boolean
  setIsFilterHidden: (value: boolean) => void
}

const FilterMenu: FC<IFilterMenuProps> = ({ isFilterHidden, setIsFilterHidden }): JSX.Element => {
  const [filter, setFilter] = useState<IFilterOptions>({ from: '', to: '' });
  const dispatch = useAppDispatch();

  const filterHandler = (options: IFilterOptions): void => {
    setFilter(options);
  };
  const filterButtonHandler = (): void => {
    dispatch(changeFilter(filter));
  };
  const filterClearHandler = (): void => {
    dispatch(clearFilter());
    setFilter({ from: '', to: '' });
    setIsFilterHidden(true);
  };
  return (
    <div className={isFilterHidden ? styles.hidden : styles.filter}>
      <div className={styles.filterContainer}>
        <div className={styles.filterInput}>
          <span>с: </span>
          <input
            type="date"
            value={filter.from}
            onChange={e => { filterHandler({ ...filter, from: e.target.value }); }}
          />
        </div>
        <div className={styles.filterInput}>
          <span>по: </span>
          <input
            type="date"
            value={filter.to}
            onChange={e => { filterHandler({ ...filter, to: e.target.value }); }}
          />
        </div>
        <button onClick={filterButtonHandler} className={styles.filterButton}>Фильтровать</button>
        <button onClick={filterClearHandler} className={styles.filterRemove}><img src={remove} alt="remove" /></button>
      </div>
    </div>
  );
};

export default FilterMenu;
