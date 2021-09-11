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
  const [ingredientsOfOrder, setIngredientsOfOrder] = React.useState<object[]>([]);
  const [bunsOfOrder, setBunsOfOrder] = React.useState({})
  
  React.useEffect(() => {
    getIngredientData();
  }, [])
  
  const getIngredientData = async () => {
    try {
      const res = await fetch(`${mainApiUrl}/ingredients`);
      if (res.status === 200) {
        const data = await res.json();
        setIngredients(data.data);
        setIsLoading(true)
      } else {
        throw new Error('Произошла ошибка ');
      }
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
