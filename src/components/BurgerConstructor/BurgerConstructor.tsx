import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';

function BurgerConstructor({ ingredients, openModalOrder }) {
  return (
    <section className={`${styles.construct} mt-10`}>
      <div className="ml-4 mt-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={20}
          thumbnail={ingredients[0].image}
        />
      </div>
      
      <ul className={styles['list-ingredients']}>
        {ingredients.map(element => {
          return element.type === 'bun' ? '' :
            <div className={styles['list-item-wrap']} key={element._id}>
              <DragIcon type="primary" />
              <li className={styles.ingredient}>
                <ConstructorElement
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />
              </li>
            </div>
          }
        )}
      </ul>
      <div className="ml-4">
        <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={20}
            thumbnail={ingredients[0].image}
          />
      </div>
      <div className={`${styles['order-wrap']} mt-10`}>
        <div className={styles['price-wrap']}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large"  onClick={openModalOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}


BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    }).isRequired
  ).isRequired
}

export default BurgerConstructor;