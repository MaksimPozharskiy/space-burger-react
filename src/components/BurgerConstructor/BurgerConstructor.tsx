import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { mainApiUrl } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { addConstructorIngredient } from '../../services/actions';

function BurgerConstructor({ 
    openModalOrder,
    setOrderNumber,
    ingredientsOfOrder,
    bunsOfOrder
  }) {
  const dispatch = useDispatch();
  const {constructorIngredients, IsBun } = useSelector(
    (store: any) => ({
      constructorIngredients: store.constructorOfOrder.constructorIngredients,
      IsBun: store.constructorOfOrder.isBuns,
    })
  );

  // get total price
  const [totalPrice, dispatchPrice] = React.useReducer(reducer, {totalPrice: 0}, undefined )
  function reducer(state, action) {
    switch (action.type) {
      case "сount":
        return { totalPrice: constructorIngredients.reduce((acc, curr) => acc + curr.price, 0 )}
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: "dragIngredient",
    drop(ingredient) {
      dispatch(addConstructorIngredient(ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const getBunsPrice = () => {
    if (IsBun === null) return 0;
    return IsBun.price * 2;
  }

  React.useEffect(() => {
    dispatchPrice({type: 'сount'})
  }, [constructorIngredients])

    const handleCreateOrder = async () => {
      try {
        const res = await fetch(`${mainApiUrl}/orders`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients: constructorIngredients }),
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
    <section className={`${styles.construct} mt-10`}  id="dropTarget" ref={dropTarget}>
      <div className="ml-4 mt-4">
        { IsBun && <ConstructorElement
          type="top"
          isLocked={true}
          text={`${IsBun.name} (верх)`}
          price={IsBun.price}
          thumbnail={IsBun.image}
        />}
      </div>
      
      <ul className={styles['list-ingredients']}>
        {constructorIngredients && constructorIngredients.map(element => {
          return element.type === 'bun' ? '' :
            <div className={styles['list-item-wrap']} key={element.ingredientId}>
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
        {IsBun &&  <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${IsBun.name} (низ)`}
            price={IsBun.price}
            thumbnail={IsBun.image}
          />}
      </div>
      <div className={`${styles['order-wrap']} mt-10`}>
        <div className={styles['price-wrap']}>
          <p className="text text_type_digits-medium">{totalPrice.totalPrice + getBunsPrice()}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large"  onClick={() => {
          if (IsBun.length !== 0 && constructorIngredients.length > 0) {
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