import React from "react";
import styles from "./feed.module.css";
import Order from "../../components/Order/Order";
import { Link, useLocation } from "react-router-dom";
import { RootState, wsActions, wsUrl } from "../../services/store";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { wsConnectionStart } from "../../services/actions/wsActions";
import { TOrder } from "../../services/actions/types";

function Feed() {
  const dispatch = useAppDispatch();
  const { wsDataOrders, wsConnected } = useAppSelector((store: RootState) => ({
    wsDataOrders: store.ws.data,
    wsConnected: store.ws.wsConnected,
  }));
  const location = useLocation();

  React.useEffect(() => {
    dispatch(wsConnectionStart(wsUrl));
    return () => {
      dispatch({ type: wsActions.wsClose });
    };
  }, [dispatch]);

  const dataOrders = wsDataOrders && wsDataOrders && wsDataOrders.data.orders;
  const ReadyOrders =
    dataOrders && dataOrders.filter((item: TOrder) => item.status === "done");
  const WorkOrders =
    dataOrders &&
    dataOrders.filter((item: TOrder) => item.status === "pending");

  return wsConnected && dataOrders ? (
    <section className={styles.feed}>
      <h1 className={styles.feed_title}>Лента заказов</h1>
      <div className={styles.feed_orders}>
        <ul className={styles.feed_orders_list}>
          {dataOrders.map((item: TOrder) => {
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
                {ReadyOrders.map((item: TOrder, index: number) => {
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
                {ReadyOrders.map((item: TOrder, index: number) => {
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
                {WorkOrders.map((item: TOrder, index: number) => {
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
              {wsDataOrders.data ? wsDataOrders.data.total - 1 : "none"}
            </p>
          </div>
          <div className={styles.order_count}>
            <p className={styles.feed_orders_title}>Выполнено за сегодня:</p>
            <p className={styles.feed_orders_count}>
              {wsDataOrders.data ? wsDataOrders.data.totalToday - 1 : "none"}
            </p>
          </div>
        </div>
      </div>
    </section>
  ) : null;
}

export default React.memo(Feed);