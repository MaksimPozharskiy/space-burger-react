import React from "react";
import styles from "./profile.module.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import Order from "../../components/Order/Order";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions";
import { wsActions } from "../../services/store";
import { getCookie } from "../../utils/helpers";

interface IItem {
  image: string;
  image_mobile: string;
  name: string;
  price: number;
  _id: string;
  count: number;
  number: number;
};

function ProfileOrders() {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = getCookie("token");

  const { dataOrders, wsConnected } = useSelector((store: any) => ({
    dataOrders: store.ws.Data,
    wsConnected: store.ws.wsConnected,
  }));
  const data = dataOrders && dataOrders.data && dataOrders.data.orders;

  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch({
      type: wsActions.wsStart,
      payload: `wss://norma.nomoreparties.space/orders?token=${token}`,
    });
    return () => {
      dispatch({ type: wsActions.wsClose });
    };
  }, [dispatch, token]);

  return wsConnected && data ? (
    <section className={styles.profile_orders_container}>
      <div className={styles.profile_orders_menu}>
        <ProfileMenu />
      </div>
      <div className={styles.profile_orders}>
        <ul className={styles.profile_orders_list}>
          {data.map((item: IItem, index: number) => {
            return (
              <li className={styles.profile_order} key={index}>
                <Link
                  to={{
                    pathname: `/profile/orders/${item.number}`,
                    state: { backgroundOrder: location },
                  }}
                >
                  <Order order={item} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  ) : null;
}

export default ProfileOrders;