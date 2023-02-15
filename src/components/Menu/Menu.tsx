import React from 'react';

import CreateMenu from '../CreateMenu/CreateMenu';
import FilterMenu from '../FilterMenu/FilterMenu';
import SortMenu from '../SortMenu/SortMenu';
import addPicture from '../../assets/images/add.svg';

import styles from './Menu.module.scss';

import type { IMenuProps } from '../../interfaces/propTypes/IMenuProps';

class Menu extends React.Component<IMenuProps> {
  constructor (props: IMenuProps) {
    super(props);
    this.addHandler = this.addHandler.bind(this);
  }

  addHandler (): void {
    this.props.setIsFilterHidden(false);
  };

  render (): JSX.Element {
    return (
      <div>
        <CreateMenu ads={this.props.ads} setAds={this.props.setAds} />
        <div className={styles.container}>
          <SortMenu />
          <div className={this.props.isFilterHidden ? styles.openFilter : styles.hidden}>
            <span>
              Добавить фильтр по дате:
            </span>
            <div onClick={this.addHandler}>
              <img src={addPicture} alt="add" />
            </div>
          </div>
        </div>
        <FilterMenu isFilterHidden={this.props.isFilterHidden} setIsFilterHidden={this.props.setIsFilterHidden} />
      </div>
    );
  }
}

export default Menu;
