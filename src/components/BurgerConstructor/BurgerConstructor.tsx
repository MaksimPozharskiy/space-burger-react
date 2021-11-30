import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerConstructor.module.css';
import { useDrop} from "react-dnd";
import ConstructorItem from '../ConstructorItem/ConstructorItem';
import { useHistory } from "react-router-dom";
import { addConstructorIngredient, resetConstructorIngredient } from '../../services/actions/burgerActions';
import { getOrder, hideOrder } from '../../services/actions/orderActions';
import { showError, showModalError } from '../../services/actions/modalActions';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

interface IBurgerConstructor {
  openModalOrder: () => void;
}

function BurgerConstructor({ 
    openModalOrder,
  }: IBurgerConstructor): JSX.Element {
  const dispatch = useAppDispatch();
  const {constructorIngredients, IsBun } = useAppSelector(
    (store) => ({
      constructorIngredients: store.constructorOfOrder.constructorIngredients,
      IsBun: store.constructorOfOrder.isBuns,
      error: store.errors.error
    })
  );
  const isToken = localStorage.getItem("refreshToken");
  const history = useHistory();

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

  const [, dropTarget] = useDrop({
    accept: "dragIngredient",
    drop(ingredient) {
      dispatch(addConstructorIngredient(ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const getBunsPrice = (): number => {
    if (IsBun === null) return 0;
    return IsBun.price * 2;
  }

  function openModalError(error) {
    dispatch(showError(error))
    dispatch(showModalError())
  };

  React.useEffect(() => {
    dispatchPrice({type: 'сount'})
  }, [constructorIngredients])

  const handleCreateOrder = async () => {
    if (IsBun === null) return;
    constructorIngredients.push(IsBun);
    if ((IsBun && !isToken) || (!IsBun && !isToken)) {
      history.push("/login");
    } else {
      openModalOrder()
      dispatch(getOrder(constructorIngredients));
      dispatch(hideOrder());
      dispatch(resetConstructorIngredient());
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
        {constructorIngredients && constructorIngredients.map((element, index) => {
          return element.type === 'bun' ? '' :
            <ConstructorItem ingredient={element} key={element.ingredientId} index={index}/>
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
          if (IsBun !== null && constructorIngredients.length > 0) {
            handleCreateOrder()
          } else {openModalError({error: 'Для создания бургера необходимы 2 булки и минимум 1 наполнитель'})}
        }}> 
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;