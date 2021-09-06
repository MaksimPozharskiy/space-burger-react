import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../contexts/ingredientsContext';
import { mainApiUrl } from '../../utils/constants';

function BurgerConstructor({ openModalOrder, setOrderNumber }) {

  const ingredients = React.useContext(IngredientsContext);

  let dataIngredients;
  if(ingredients.length > 0) {
    dataIngredients = ingredients
  }
  // get buns from ingredients
  const arrayBuns = dataIngredients.filter(item => item.type === 'bun');
  
  // get total price
  const [totalPrice, dispatchPrice] = React.useReducer(reducer, {totalPrice: 0}, undefined )
  function reducer(state, action) {
    switch (action.type) {
      case "testCount":
        return { totalPrice: dataIngredients.reduce((acc, curr) => acc + curr.price, 0 )}
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  React.useEffect(() => {
    dispatchPrice({type: 'testCount'})
  }, [])

    const handleCreateOrder = async () => {
      try {
        const res = await fetch(`${mainApiUrl}/orders`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients: dataIngredients }),
        })
        const data = await res.json();
        setOrderNumber(data.order.number)
        console.log(data)
      }
      catch(err) {
        console.log(err)
      }
    }

  return (
    <section className={`${styles.construct} mt-10`}>
      <div className="ml-4 mt-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${arrayBuns[0].name} (верх)`}
          price={arrayBuns[0].price}
          thumbnail={arrayBuns[0].image}
        />
      </div>
      
      <ul className={styles['list-ingredients']}>
        {dataIngredients.map(element => {
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
            text={`${arrayBuns[0].name} (низ)`}
            price={arrayBuns[0].price}
            thumbnail={arrayBuns[0].image}
          />
      </div>
      <div className={`${styles['order-wrap']} mt-10`}>
        <div className={styles['price-wrap']}>
          <p className="text text_type_digits-medium">{totalPrice.totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large"  onClick={() => {
            handleCreateOrder()
            openModalOrder()
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
}

export default BurgerConstructor;