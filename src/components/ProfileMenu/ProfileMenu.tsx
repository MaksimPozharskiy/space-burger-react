import React from "react";
import styles from "../../pages/profile/profile.module.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions";

function ProfileMenu() {
  const refreshToken = localStorage.getItem("refreshToken");
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();
  
  const handleLogout = () => {
    dispatch(logout(refreshToken));
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    history.push("/login");
  };

  return (
    <div className={styles.profile_menu}>
      <ul className={styles.profile_menu_list}>
        <Link to="/profile">
          <li
            className={`${styles.profile_menu_item} ${
              location.pathname === "/profile" &&
              styles.profile_menu_item_active
            }`}
          >
            Профиль
          </li>
        </Link>
        <Link to="/profile/orders">
          <li
            className={`${styles.profile_menu_item} ${
              location.pathname === "/profile/orders" &&
              styles.profile_menu_item_active
            }`}
          >
            История заказов
          </li>
        </Link>
        <li className={styles.profile_menu_item} onClick={handleLogout}>
          Выход
        </li>
      </ul>
      <p className={styles.profile_info}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}

export default ProfileMenu;