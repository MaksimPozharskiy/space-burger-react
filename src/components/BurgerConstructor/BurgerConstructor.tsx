import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';

function BurgerConstructor({ data }) {
  return (
    <section className={`${styles.construct} mt-10`}>
      <div className="ml-4 mt-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={20}
          thumbnail={data[0].image}
        />
      </div>
      
      <ul className={styles['list-ingredients']}>
        {data.map(element =>
        <div className={styles['list-item-wrap']}>
          <DragIcon type="primary" />
          <li key={element._id}>
            <ConstructorElement
              text={element.name}
              price={element.price}
              thumbnail={element.image}
            />
          </li>
        </div>
        )}
      </ul>
      <div className="ml-4">
        <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={20}
            thumbnail={data[0].image}
          />
      </div>
      <div className={`${styles['order-wrap']} mt-10`}>
        <div className={styles['price-wrap']}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.array
}; 

export default BurgerConstructor;