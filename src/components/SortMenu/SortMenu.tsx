import React, { useState } from 'react';

import { changeSort } from '../../store/reducers/sortSlice';
import { useAppDispatch } from '../../hooks/redux';

import styles from './SortMenu.module.scss';

import type { ISortMenu } from '../../interfaces/ISortMenu';

const SortMenu = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [sortOptions, setSortOptions] = useState<ISortMenu>({ sort: 'none', direction: 'increase' });
  const isDirectionHidden = !!(sortOptions.sort === '' || sortOptions.sort === 'none');

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (e.target.value === 'none') {
      setSortOptions({ direction: 'increase', sort: 'none' });
      dispatch(changeSort({ direction: 'increase', sort: 'none' }));
      return;
    }
    setSortOptions({ ...sortOptions, sort: e.target.value });
    dispatch(changeSort({ ...sortOptions, sort: e.target.value }));
  };

  const directionHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortOptions({ ...sortOptions, direction: e.target.value });
    dispatch(changeSort({ ...sortOptions, direction: e.target.value }));
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sortContainer}>
      <div className={styles.sortSelect}>
          <span className={styles.sortText}>Сортировать:</span>
          <select
            onChange={sortHandler}
            value={sortOptions.sort}
            className={styles.select}
          >
            <option value="none">None</option>
            <option value="pacient">По имени</option>
            <option value="doctor">По врачу</option>
            <option value="date">По дате</option>
          </select>
        </div>
        <div className={isDirectionHidden ? styles.hidden : styles.sortDirection}>
          <span className={styles.sortText}>Направление:</span>
          <select
            value={sortOptions.direction}
            className={styles.select}
            onChange={directionHandler}
          >
            <option value="increase">По возрастанию</option>
            <option value="decrease">По убыванию</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortMenu;
