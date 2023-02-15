import React from 'react';

import remove from './../../assets/images/remove.svg';
import { changeFilter, clearFilter } from '../../store/reducers/filterSlice';

import styles from './FilterMenu.module.scss';

import type { IFilterOptions } from '../../interfaces/IFilterOptions';
import type { IFilterMenuProps } from '../../interfaces/propTypes/IFilterMenuProps';
import { store } from '../../store/store';

interface IFilterMenuState {
  filter: IFilterOptions
}

class FilterMenu extends React.Component<IFilterMenuProps, IFilterMenuState> {
  constructor (props: IFilterMenuProps) {
    super(props);

    this.setFilter = this.setFilter.bind(this);
    this.filterButtonHandler = this.filterButtonHandler.bind(this);
    this.filterClearHandler = this.filterClearHandler.bind(this);
    this.changeFromInFilter = this.changeFromInFilter.bind(this);
    this.changeToInFilter = this.changeToInFilter.bind(this);

    this.state = {
      filter: { from: '', to: '' }
    };
  }

  setFilter (value: IFilterOptions): void {
    this.setState({
      filter: value
    });
  }

  filterButtonHandler (): void {
    store.dispatch(changeFilter(this.state.filter));
  }

  filterClearHandler (): void {
    store.dispatch(clearFilter());
    this.setFilter({ from: '', to: '' });
    this.props.setIsFilterHidden(true);
  };

  changeFromInFilter (e: React.ChangeEvent<HTMLInputElement>): void {
    this.setFilter({ ...this.state.filter, from: e.target.value });
  };

  changeToInFilter (e: React.ChangeEvent<HTMLInputElement>): void {
    this.setFilter({ ...this.state.filter, from: e.target.value });
  };

  render (): JSX.Element {
    return (
      <div className={this.props.isFilterHidden ? styles.hidden : styles.filter}>
        <div className={styles.filterContainer}>
          <div className={styles.filterInput}>
            <span>с: </span>
            <input
              type="date"
              value={this.state.filter.from}
              onChange={this.changeFromInFilter}
            />
          </div>
          <div className={styles.filterInput}>
            <span>по: </span>
            <input
              type="date"
              value={this.state.filter.to}
              onChange={this.changeToInFilter}
            />
          </div>
          <button onClick={this.filterButtonHandler} className={styles.filterButton}>Фильтровать</button>
          <button onClick={this.filterClearHandler} className={styles.filterRemove}><img src={remove} alt="remove" /></button>
        </div>
      </div>
    );
  }
}

export default FilterMenu;
