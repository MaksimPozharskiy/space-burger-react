import React from "react";
import styles from "./Order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateDate } from "../../utils/helpers";
import { optionsDate } from "../../utils/constants";
import { getSelectedOrder } from "../../services/actions/orderActions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { RootState } from "../../services/store";

interface IItem {
  image: string;
  image_mobile: string;
  name: string;
  price: number;
  _id: string;
  count: number;
};

interface IOrderProps {
  order?: any;
  date?: number;
  number?: number;
  name?: string;
  status?: string;
  price?: number;
};

function Order(props: IOrderProps) {
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((store: RootState) => ({
    ingredients: store.burgerIngredients.ingredients,
  }));
  const handleClick = () => {
    dispatch(getSelectedOrder(props.order));
  };
  const orderIngredientsId = props.order.ingredients;
  const orderIngredients = orderIngredientsId.map((id: string) =>
    ingredients.find((item: IItem) => item._id === id)
  );

  const orderPrice = orderIngredients.reduce(function (
    prevValue: number,
    item: any
  ) {
    return prevValue + item.price;
  },
  0);
  const orderDate = updateDate(props.order.createdAt, optionsDate);

  return orderIngredients && (
    <section className={styles.order} onClick={handleClick}>
      <div className={styles.order_header}>
        <p className={styles.order_number}>#{props.order.number}</p>
        <p className={styles.order_date}>{orderDate}</p>
      </div>
      <p className={styles.order_name}>{props.order.name}</p>
      <p
        className={`${styles.order_status} ${
          props.order.status === "done" && styles.order_status_finished
        } ${props.order.status === "pending" && styles.order_status_cancelled}`}
      >
        {props.order.status === "done" ? "Выполнен" : "Готовится"}
      </p>
      <div className={styles.order_ingredients}>
        <div className={styles.order_img_container}>
          {orderIngredients.map((item: IItem, index: number) => {
            return (
              <img
                className={`${styles.order_img}`}
                src={item.image_mobile}
                alt={item.name}
                key={index}
                style={{ zIndex: Math.abs(index - 100) }}
              />
            );
          })}
        </div>
        <div className={styles.order_price_container}>
          <p className={styles.order_price}>{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}

export default Order;