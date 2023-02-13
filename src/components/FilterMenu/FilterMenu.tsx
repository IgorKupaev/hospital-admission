import React, { useState } from 'react';

import remove from './../../assets/images/remove.svg';
import { useAppDispatch } from '../../hooks/redux';
import { changeFilter, clearFilter } from '../../store/reducers/filterSlice';

import styles from './FilterMenu.module.scss';

import type { FC } from 'react';
import type { IFilterOptions } from '../../interfaces/IFilterOptions';
import type { IFilterMenuProps } from '../../interfaces/propTypes/IFilterMenuProps';

const FilterMenu: FC<IFilterMenuProps> = ({ isFilterHidden, setIsFilterHidden }): JSX.Element => {
  const initialFilter: IFilterOptions = { from: '', to: '' };
  const [filter, setFilter] = useState<IFilterOptions>(initialFilter);
  const dispatch = useAppDispatch();

  const filterButtonHandler = (): void => {
    dispatch(changeFilter(filter));
  };
  const filterClearHandler = (): void => {
    dispatch(clearFilter());
    setFilter(initialFilter);
    setIsFilterHidden(true);
  };

  const changeFromInFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter({ ...filter, from: e.target.value });
  };
  const changeToInFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter({ ...filter, from: e.target.value });
  };
  return (
    <div className={isFilterHidden ? styles.hidden : styles.filter}>
      <div className={styles.filterContainer}>
        <div className={styles.filterInput}>
          <span>с: </span>
          <input
            type="date"
            value={filter.from}
            onChange={changeFromInFilter}
          />
        </div>
        <div className={styles.filterInput}>
          <span>по: </span>
          <input
            type="date"
            value={filter.to}
            onChange={changeToInFilter}
          />
        </div>
        <button onClick={filterButtonHandler} className={styles.filterButton}>Фильтровать</button>
        <button onClick={filterClearHandler} className={styles.filterRemove}><img src={remove} alt="remove" /></button>
      </div>
    </div>
  );
};

export default FilterMenu;
