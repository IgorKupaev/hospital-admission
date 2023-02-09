import React from 'react';

import CreateMenu from '../CreateMenu/CreateMenu';
import FilterMenu from '../FilterMenu/FilterMenu';
import SortMenu from '../SortMenu/SortMenu';
import addPicture from '../../assets/images/add.svg';

import styles from './Menu.module.scss';

import type { IMenuProps } from '../../interfaces/propTypes/IMenuProps';
import type { FC } from 'react';

const Menu: FC<IMenuProps> = ({ ads, setAds, isFilterHidden, setIsFilterHidden }): JSX.Element => {
  return (
    <div>
      <CreateMenu ads={ads} setAds={setAds} />
      <div className={styles.container}>
        <SortMenu />
        <div className={isFilterHidden ? styles.openFilter : styles.hidden}>
          <span>
            Добавить фильтр по дате:
          </span>
          <div onClick={() => { setIsFilterHidden(false); }}>
            <img src={addPicture} alt="add" />
          </div>
        </div>
      </div>
      <FilterMenu isFilterHidden={isFilterHidden} setIsFilterHidden={setIsFilterHidden} />
    </div>
  );
};

export default Menu;
