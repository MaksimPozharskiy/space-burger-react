import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, hideError, hideModal, hideModalOrder, showModalOrder } from '../../services/actions';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [orderNumber, setOrderNumber] = React.useState(0);
  const { isModalOpened, isModalOpenedOrder, currentIngredient, error, isModalOpenedError } = useSelector(
    (store: any) => ({
      isModalOpened: store.modal.isModalOpened,
      isModalOpenedOrder: store.modal.isModalOpenedOrder,
      isModalOpenedError: store.modal.isModalOpenedError,
      currentIngredient: store.burgerIngredient.currentIngredient,
      error: store.errors.error
    })
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients())
    setIsLoading(true)
  }, [dispatch])

  function closeModalOrder() {
    dispatch(hideModalOrder())
  };

  function openModalOrder() {
    dispatch(showModalOrder())
  };

  function closeModalIngredient() {
    dispatch(hideModal())
  };


  function closeModalError() {
    dispatch(hideError())
  };

  return (
    <>
      <AppHeader />
      <div className={`${styles.wrap} pl-5 pr-5 pt-10`}>
        <DndProvider backend={HTML5Backend}>
          { isLoading ? 
            <>
              <BurgerIngredients /> 
              <BurgerConstructor 
                openModalOrder={openModalOrder} 
                setOrderNumber={setOrderNumber} />
            </>
            : <div>Loading...</div>
          }
        </DndProvider>
      </div>
      {currentIngredient && <Modal
        closeModal={closeModalIngredient}
        isModalOpened={isModalOpened}
        title="Детали ингредиента">
        <IngredientDetails />
      </Modal>}
      <Modal
        closeModal={closeModalOrder}
        isModalOpened={isModalOpenedOrder}>
        <OrderDetails orderNumber={orderNumber} />
      </Modal>
      <Modal
        closeModal={closeModalError}
        isModalOpened={isModalOpenedError}>
        <p className={styles.error}>{error.error}</p>
      </Modal>
    </>
  );
}

export default App;
