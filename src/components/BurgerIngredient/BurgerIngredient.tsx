import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerIngredient.module.css';

function BurgerIngredient({ image, name, price }) {

  return (
    <li className={styles.ingredient}>
      <img src={image} alt={name} />
      <div className={styles['price-wrap']}>
        <p className="text text_type_digits-default mt-2 mb-2 mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      <Counter count={1} size="default" />
    </li>
  );
}

export default BurgerIngredient;