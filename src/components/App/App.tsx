import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { IngredientsContext } from '../../contexts/ingredientsContext';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions';

function App() {
  const [ingredients, setIngredients] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isModalOrderOpened, setIsModalOrderOpened] = React.useState(false);
  const [isModalIngredientOpened, setIsModalIngredientOpened] = React.useState(false);
  const [detailsIngredient, setDetailsIngredient] = React.useState();
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [ingredientsOfOrder, setIngredientsOfOrder] = React.useState<object[]>([]);
  const [bunsOfOrder, setBunsOfOrder] = React.useState({})
  
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients())
    setIsLoading(true)
  }, [])

  function closeModalOrder() {
    setIsModalOrderOpened(false);
  };

  function openModalOrder() {
    setIsModalOrderOpened(true);
  };

  function openModalIngredient(detailsIngredient) {
    setDetailsIngredient(detailsIngredient);
    setIsModalIngredientOpened(true);
  };

  function closeModalIngredient() {
    setIsModalIngredientOpened(false);
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
      <IngredientsContext.Provider value={ingredients}>
        <AppHeader />
        <div className={`${styles.wrap} pl-5 pr-5 pt-10`}>
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
        </div>
        {detailsIngredient && 
        <Modal
          closeModalOrder={closeModalIngredient}
          isModalOrderOpened={isModalIngredientOpened}
          title="Детали ингредиента">
          <IngredientDetails 
            detailsIngredient={detailsIngredient} />
        </Modal>}
        <Modal
          closeModalOrder={closeModalOrder}
          isModalOrderOpened={isModalOrderOpened}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      </IngredientsContext.Provider>
    </>
  );
}

export default App;
