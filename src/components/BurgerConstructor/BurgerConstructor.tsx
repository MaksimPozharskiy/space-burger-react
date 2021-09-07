import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { mainApiUrl } from '../../utils/constants';

function BurgerConstructor({ 
    openModalOrder,
    setOrderNumber,
    ingredientsOfOrder,
    bunsOfOrder
  }) {
  
  // get total price
  const [totalPrice, dispatchPrice] = React.useReducer(reducer, {totalPrice: 0}, undefined )
  function reducer(state, action) {
    switch (action.type) {
      case "сount":
        return { totalPrice: ingredientsOfOrder.reduce((acc, curr) => acc + curr.price, 0 )}
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const getBunsPrice = () => {
    if (Object.keys(bunsOfOrder).length === 0) return 0;
    return bunsOfOrder.price * 2;
  }

  React.useEffect(() => {
    dispatchPrice({type: 'сount'})
  }, [ingredientsOfOrder])

    const handleCreateOrder = async () => {
      try {
        const res = await fetch(`${mainApiUrl}/orders`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients: ingredientsOfOrder }),
        })
        const data = await res.json();
        if (res.status === 200) {
          setOrderNumber(data.order.number)
          console.log(data)
        } else {
          throw new Error('Произошла ошибка ');
        }
      }
      catch(err) {
        console.log(err)
      }
    }

  return (
    <section className={`${styles.construct} mt-10`}>
      <div className="ml-4 mt-4">
        {Object.keys(bunsOfOrder).length !== 0 && <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bunsOfOrder.name} (верх)`}
          price={bunsOfOrder.price}
          thumbnail={bunsOfOrder.image}
        />}
      </div>
      
      <ul className={styles['list-ingredients']}>
        {ingredientsOfOrder.map(element => {
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
        {Object.keys(bunsOfOrder).length !== 0 && <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunsOfOrder.name} (низ)`}
            price={bunsOfOrder.price}
            thumbnail={bunsOfOrder.image}
          />}
      </div>
      <div className={`${styles['order-wrap']} mt-10`}>
        <div className={styles['price-wrap']}>
          <p className="text text_type_digits-medium">{totalPrice.totalPrice + getBunsPrice()}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large"  onClick={() => {
          if (bunsOfOrder.length !== 0 && ingredientsOfOrder.length > 0) {
            handleCreateOrder()
            openModalOrder()
          }
        }}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  openModalOrder: PropTypes.func.isRequired,
  setOrderNumber: PropTypes.func.isRequired,
  ingredientsOfOrder: PropTypes.array,
  bunsOfOrder: PropTypes.object,
}

export default BurgerConstructor;