import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { mainApiUrl, keyCodeEsc } from '../../utils/constants';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

function App() {
  const [ingredients, setIngredients] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isModalOpened, setIsModalOpened] = React.useState(false);

  
  React.useEffect(() => {
    getIngredientData();
    
    document.addEventListener('keydown', closeModalEsc);

    return (()=> {
      document.removeEventListener('keydown', closeModalEsc);
    })
  }, [])
  
  const getIngredientData = async () => {
    try {
      const res = await fetch(mainApiUrl);
      const data = await res.json();
      setIngredients(data.data);
      setIsLoading(true)
    }
    catch(err) {
      console.log(err)
    }
  }

  function closeModal() {
    setIsModalOpened(false);
  };

  function openModal() {
    setIsModalOpened(true);
  };

  function closeModalEsc(e) {
    if (e.keyCode === keyCodeEsc) {
      setIsModalOpened(false);
    }
  };

  return (
    <>
      <AppHeader />
      <div className={`${styles.wrap} pl-5 pr-5 pt-10`}>
        { isLoading ? 
          <>
            <BurgerIngredients openModal={openModal} ingredients={ingredients}/> 
            <BurgerConstructor openModal={openModal} ingredients={ingredients}/>
          </>
          : <div>Loading...</div>
        }
      </div>
      <OrderDetails 
        closeModal={closeModal}
        isModalOpened={isModalOpened} />
    </>
  );
}

export default App;
