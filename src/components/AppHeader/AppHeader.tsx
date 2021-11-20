import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './AppHeader.module.css';
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from '../../utils/hooks';

function AppHeader() {
  const [userName, setUserName] = React.useState<string>("");
  const location = useLocation();

  const nameInfo = useAppSelector(
    (store) => ({
      nameInfo: store.authInfoUser.user.name,
    })
  );

  React.useEffect(() => {
    const currentUserName = localStorage.getItem("userName");
    currentUserName && setUserName(currentUserName);
  }, [nameInfo]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={`${styles['list-item']} pr-5 pl-5 pt-4 pb-4`}>
            <Link to="/" className={styles.link}>
              <BurgerIcon type="primary" />
              <p className={`text text_type_main-default p-2 ${location.pathname === "/" && styles.active}`}>Конструктор</p>
            </Link>
          </li>
          <li className={`${styles['list-item']} pr-5 pl-5 pt-4 pb-4`}>
            <Link to="/feed" className={styles.link}>
              <ListIcon type={
                location.pathname.indexOf("/feed") >= 0
                  ? "primary"
                  : "secondary"
                }
              />
              <p className="text text_type_main-default text_color_inactive p-2">Лента заказов</p>
            </Link>
          </li>
          <li className={`${styles['list-item']} ${styles['list-item_profile']} pr-5 pl-5 pt-4 pb-4`}>
            <Link to="/profile" className={styles.link}>
              <ProfileIcon type={
                  location.pathname.indexOf("/profile") >= 0
                    ? "primary"
                    : "secondary"
                } 
              />
              <p className={`text text_type_main-default text_color_inactive p-2 ${location.pathname === "/profile" && styles.active}`}>{userName ? userName : "Личный кабинет"}</p>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.logo}>
        {/* Logo here because in tag ul not li can be used */}
        <Link to="/">
          <Logo /> 
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;