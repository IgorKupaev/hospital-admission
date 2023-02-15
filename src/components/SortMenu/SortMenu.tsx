import React from 'react';

import { changeSort } from '../../store/reducers/sortSlice';

import styles from './SortMenu.module.scss';

import type { ISortMenu } from '../../interfaces/ISortMenu';
import { store } from '../../store/store';

interface SortMenuState {
  sortOptions: ISortMenu
  isDirectionHidden: boolean
}

class SortMenu extends React.Component<unknown, SortMenuState> {
  constructor (props: unknown) {
    super(props);

    this.setSortOptions = this.setSortOptions.bind(this);
    this.sortHandler = this.sortHandler.bind(this);
    this.directionHandler = this.directionHandler.bind(this);

    this.state = {
      sortOptions: { sort: 'none', direction: 'increase' },
      isDirectionHidden: true
    };
  }

  setSortOptions (value: ISortMenu): void {
    this.setState({
      sortOptions: value
    });
  }

  sortHandler (e: React.ChangeEvent<HTMLSelectElement>): void {
    if (e.target.value === 'none') {
      this.setSortOptions({ direction: 'increase', sort: 'none' });
      store.dispatch(changeSort({ direction: 'increase', sort: 'none' }));
      return;
    }
    this.setSortOptions({ ...this.state.sortOptions, sort: e.target.value });
    store.dispatch(changeSort({ ...this.state.sortOptions, sort: e.target.value }));
  }

  directionHandler (e: React.ChangeEvent<HTMLSelectElement>): void {
    this.setSortOptions({ ...this.state.sortOptions, direction: e.target.value });
    store.dispatch(changeSort({ ...this.state.sortOptions, direction: e.target.value }));
  }

  render (): JSX.Element {
    return (
      <div className={styles.sort}>
        <div className={styles.sortContainer}>
        <div className={styles.sortSelect}>
            <span className={styles.sortText}>Сортировать:</span>
            <select
              onChange={this.sortHandler}
              value={this.state.sortOptions.sort}
              className={styles.select}
            >
              <option value="none">None</option>
              <option value="pacient">По имени</option>
              <option value="doctor">По врачу</option>
              <option value="date">По дате</option>
            </select>
          </div>
          <div className={this.state.sortOptions.sort === '' || this.state.sortOptions.sort === 'none' ? styles.hidden : styles.sortDirection}>
            <span className={styles.sortText}>Направление:</span>
            <select
              value={this.state.sortOptions.direction}
              className={styles.select}
              onChange={this.directionHandler}
            >
              <option value="increase">По возрастанию</option>
              <option value="decrease">По убыванию</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default SortMenu;
