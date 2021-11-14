import React from "react";
import styles from "./feed.module.css";
import Order from "../../components/Order/Order";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions";
import { wsActions } from "../../services/store";

interface IItem {
  image: string;
  image_mobile: string;
  name: string;
  price: number;
  _id: string;
  count: number;
  number: number;
};

interface IOrderProps {
  order?: any;
  date?: number;
  number?: number;
  name?: string;
  status?: string;
  price?: number;
};

function Feed() {
  const dispatch = useDispatch();
  const { dataOrders, wsConnected } = useSelector((store: any) => ({
    dataOrders: store.ws.Data,
    wsConnected: store.ws.wsConnected,
  }));
  const location = useLocation();

  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch({
      type: wsActions.wsStart,
      payload: "wss://norma.nomoreparties.space/orders/all",
    });
    return () => {
      dispatch({ type: wsActions.wsClose });
    };
  }, [dispatch]);

  const data = dataOrders && dataOrders.data && dataOrders.data.orders;
  const ReadyOrders =
    data && data.filter((item: IOrderProps) => item.status === "done");
  const WorkOrders =
    data && data.filter((item: IOrderProps) => item.status === "pending");

  return wsConnected && data ? (
    <section className={styles.feed}>
      <h1 className={styles.feed_title}>Лента заказов</h1>
      <div className={styles.feed_orders}>
        <ul className={styles.feed_orders_list}>
          {data.map((item: IItem) => {
            return (
              <li className={styles.feed_order} key={item._id}>
                <Link
                  to={{
                    pathname: `/feed/${item.number}`,
                    state: { backgroundOrder: location },
                  }}
                >
                  <Order order={item} />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.feed_orders_summury}>
          <div className={styles.feed_orders_status}>
            <div className={styles.feed_orders_ready}>
              <p className={styles.feed_orders_title}>Готовы:</p>
              <ul className={styles.feed_list}>
                {ReadyOrders.map((item: IItem, index: number) => {
                  if (index < 10) {
                    return (
                      <li
                        className={styles.feed_orders_ready_item}
                        key={item._id}
                      >
                        {item.number}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
            <div className={styles.feed_orders_ready}>
              <p className={styles.feed_orders_title}>Готовы:</p>
              <ul className={styles.feed_list}>
                {ReadyOrders.map((item: IItem, index: number) => {
                  if (index > 9 && index < 20) {
                    return (
                      <li
                        className={styles.feed_orders_ready_item}
                        key={item._id}
                      >
                        {item.number}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
            <div className={styles.feed_orders_work}>
              <p className={styles.feed_orders_title}>В работе:</p>
              <ul className={styles.feed_list}>
                {WorkOrders.map((item: IItem, index: number) => {
                  if (index > 10) {
                    return null;
                  }
                  return (
                    <li className={styles.feed_orders_work_item} key={item._id}>
                      {item.number}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={styles.order_count}>
            <p className={styles.feed_orders_title}>Выполнено за все время:</p>
            <p className={styles.feed_orders_count}>
              {dataOrders.data ? dataOrders.data.total - 1 : "none"}
            </p>
          </div>
          <div className={styles.order_count}>
            <p className={styles.feed_orders_title}>Выполнено за сегодня:</p>
            <p className={styles.feed_orders_count}>
              {dataOrders.data ? dataOrders.data.totalToday - 1 : "none"}
            </p>
          </div>
        </div>
      </div>
    </section>
  ) : null;
}

export default React.memo(Feed);