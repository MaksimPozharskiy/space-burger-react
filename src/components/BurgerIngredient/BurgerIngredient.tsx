import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerIngredient.module.css';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredient } from '../../interfaces/interfaces';
import { getSelectedIngredient, showModal } from '../../services/actions/modalActions';

interface IBurgerIngredient {
  image: string;
  name: string;
  price: number;
  ingredient: IIngredient;
  count: number;
}

function BurgerIngredient({ image, name, price, ingredient, count }: IBurgerIngredient): JSX.Element | null {
  const dispatch = useDispatch();
  const location = useLocation();

  function handleAddIngredient() {
    dispatch(getSelectedIngredient(ingredient));
    dispatch(showModal())
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: "dragIngredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return !isDrag ? (
    <Link
      className={styles.link}
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { backgroundIngredient: location },
      }}
    >
      <li className={styles.ingredient} onClick={handleAddIngredient} ref={dragRef}>
          <img src={image} alt={name} />
          <div className={styles['price-wrap']}>
            <p className="text text_type_digits-default mt-2 mb-2 mr-2">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${styles.name} text text_type_main-default`}>{name}</p>
          <Counter count={count} size="default" />
      </li>
    </Link>
  ): null;
}

export default BurgerIngredient;