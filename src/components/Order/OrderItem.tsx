import React from "react";
import styles from "./Order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { updateDate } from "../../utils/helpers";
import { optionsDate } from "../../utils/constants";
import { authApi } from "../../services/actions";
import { showError } from "../../services/actions/modalActions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { RootState } from "../../services/store";
import { TIngredient } from "../../services/actions/types";

interface IOrderProps {
  order: any;
  date: number;
  number: number;
  name: string;
  status: string;
  price: number;
  ingredients: [string];
  createdAt: number;
};

function OrderItem() {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<IOrderProps>();
  const { id } = useParams<{ id?: string }>();
  const { ingredients } = useAppSelector((store: RootState) => ({
    ingredients: store.burgerIngredients.ingredients,
  }));
  const orderIngredients: any =
    ingredients &&
    order &&
    order.ingredients.map((id: string) =>
      ingredients.find((item: TIngredient) => item._id === id)
    );
  const orderDate = order && updateDate(order.createdAt, optionsDate);
  const orderPrice =
    orderIngredients &&
    ingredients &&
    orderIngredients.reduce(function (prevValue: number, item: TIngredient) {
      return prevValue + item.price;
    }, 0);

  React.useEffect(() => {
    authApi
      .getCurrentOrder(id)
      .then((res) => {
        setOrder(res.orders[0]);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showError(error));
      });
  }, [dispatch, id]);

  return order ? (
    <section className={styles.order_item}>
      <p className={styles.order_number}>#{order.number}</p>
      <p className={styles.order_item_name}>{order.name}</p>
      <p
        className={`${styles.order_status} ${
          order.status === "Выполнен" && styles.order_status_finished
        } ${order.status === "Отменен" && styles.order_status_cancelled}`}
      >
        {order.status === "done" ? "Выполнен" : "Готовится"}
      </p>
      <p className={styles.order_title}>Состав:</p>
      <div className={styles.order_ingredients_container}>
        {order &&
          orderIngredients &&
          orderIngredients.map((item: TIngredient, index: number) => {
            return (
              <div className={styles.order_ingredient_item} key={index}>
                <div className={styles.order_ingredient_container}>
                  <img
                    className={`${styles.order_ingredient_img}`}
                    src={item.image_mobile}
                    alt={item.name}
                  />
                  <p className={styles.order_ingredient_name}>{item.name}</p>
                </div>
                <div className={styles.order_price_container}>
                  <p className={styles.order_price}>1 x {item.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.order_total}>
        <p className={styles.order_date}>{orderDate}</p>
        <div className={styles.order_price_container}>
          <p className={styles.order_price}>{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  ) : null;
}

export default OrderItem;