import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { mainApiUrl } from '../../utils/constants';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { IngredientsContext } from '../../contexts/ingredientsContext';

function App() {
  const [ingredients, setIngredients] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isModalOrderOpened, setIsModalOrderOpened] = React.useState(false);
  const [isModalIngredientOpened, setIsModalIngredientOpened] = React.useState(false);
  const [detailsIngredient, setDetailsIngredient] = React.useState();
  const [orderNumber, setOrderNumber] = React.useState(0);
  
  React.useEffect(() => {
    getIngredientData();
  }, [])
  
  const getIngredientData = async () => {
    try {
      const res = await fetch(`${mainApiUrl}/ingredients`);
      const data = await res.json();
      setIngredients(data.data);
      setIsLoading(true)
    }
    catch(err) {
      console.log(err)
    }
  }

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

  return (
    <>
      <IngredientsContext.Provider value={ingredients}>
        <AppHeader />
        <div className={`${styles.wrap} pl-5 pr-5 pt-10`}>
          { isLoading ? 
            <>
              <BurgerIngredients openModalIngredient={openModalIngredient} /> 
              <BurgerConstructor openModalOrder={openModalOrder} setOrderNumber={setOrderNumber} />
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
