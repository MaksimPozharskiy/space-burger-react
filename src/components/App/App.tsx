import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, hideModal, hideModalOrder, showModalOrder } from '../../services/actions';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [detailsIngredient, setDetailsIngredient] = React.useState();
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [ingredientsOfOrder, setIngredientsOfOrder] = React.useState<object[]>([]);
  const [bunsOfOrder, setBunsOfOrder] = React.useState({})
  const { isModalOpened, isModalOpenedOrder, currentIngredient } = useSelector(
    (store: any) => ({
      isModalOpened: store.modal.isModalOpened,
      isModalOpenedOrder: store.modal.isModalOpenedOrder,
      currentIngredient: store.burgerIngredient.currentIngredient,
    })
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients())
    setIsLoading(true)
  }, [])

  function closeModalOrder() {
    dispatch(hideModalOrder())
  };

  function openModalOrder() {
    dispatch(showModalOrder())
  };

  function openModalIngredient(detailsIngredient) {
    setDetailsIngredient(detailsIngredient);
  };

  function closeModalIngredient() {
    dispatch(hideModal())
  };

  function addItemInOrder(item) {
    if (item.type === 'bun') {
      setBunsOfOrder(item)
    } else if(ingredientsOfOrder.some(ingredient => ingredient['_id'] === item['_id'])) {
      return
    } else {
      setIngredientsOfOrder([...ingredientsOfOrder, item])
    }
  }

  return (
    <>
      <AppHeader />
      <div className={`${styles.wrap} pl-5 pr-5 pt-10`}>
        <DndProvider backend={HTML5Backend}>
          { isLoading ? 
            <>
              <BurgerIngredients openModalIngredient={openModalIngredient} addItemInOrder={addItemInOrder} /> 
              <BurgerConstructor 
                openModalOrder={openModalOrder} 
                setOrderNumber={setOrderNumber} 
                ingredientsOfOrder={ingredientsOfOrder}
                bunsOfOrder={bunsOfOrder} />
            </>
            : <div>Loading...</div>
          }
        </DndProvider>
      </div>
      {currentIngredient && <Modal
        closeModal={closeModalIngredient}
        isModalOpened={isModalOpened}
        title="Детали ингредиента">
        <IngredientDetails 
          detailsIngredient={detailsIngredient} />
      </Modal>}
      <Modal
        closeModal={closeModalOrder}
        isModalOpened={isModalOpenedOrder}>
        <OrderDetails orderNumber={orderNumber} />
      </Modal>
    </>
  );
}

export default App;
