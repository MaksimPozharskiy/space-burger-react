import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { Dispatch, SetStateAction } from 'react';
import styles from './BurgerConstructor.module.css';
import { mainApiUrl } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop} from "react-dnd";
import { addConstructorIngredient, showError, showModalError } from '../../services/actions';
import ConstructorItem from '../ConstructorItem/ConstructorItem';
import { useHistory } from "react-router-dom";
import { getCookie } from '../../utils/helpers';

interface IBurgerConstructor {
  openModalOrder: () => void;
  setOrderNumber: Dispatch<SetStateAction<number>>;
}

function BurgerConstructor({ 
    openModalOrder,
    setOrderNumber,
  }: IBurgerConstructor): JSX.Element {
  const dispatch = useDispatch();
  const {constructorIngredients, IsBun } = useSelector(
    (store: any) => ({
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
      try {
        const res = await fetch(`${mainApiUrl}/orders`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
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
      if ((IsBun && !isToken) || (!IsBun && !isToken)) {
        history.push("/login");
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
            openModalOrder()
          } else {openModalError({error: 'Для создания бургера необходимы 2 булки и минимум 1 наполнитель'})}
        }}> 
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;