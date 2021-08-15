import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './AppHeader.module.css';

function AppHeader() {

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={`${styles['list-item']} p-5`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default p-2">Конструктор</p>
          </li>
          <li className={`${styles['list-item']} p-5`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive p-2">Лента заказов</p>
          </li>
          <li className={`${styles['list-item']} ${styles['list-item_profile']} p-5`}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive p-2">Личный кабинет</p>
          </li>
        </ul>
      </nav>
      <div className={styles.logo}>
        {/* Logo here because in tag ul not li can be used */}
        <Logo /> 
      </div>
    </header>
  );
}

export default AppHeader;