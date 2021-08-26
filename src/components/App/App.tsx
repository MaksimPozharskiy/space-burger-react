import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { mainApiUrl } from '../../utils/constants';

function App() {
  const [ingredients, setIngredients] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
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

    getIngredientData();
  }, [])

  return (
    <>
      <AppHeader />
      <div className={`${styles.wrap} pl-5 pr-5 pt-10`}>
        { isLoading ? 
          <>
            <BurgerIngredients ingredients={ingredients}/> 
            <BurgerConstructor ingredients={ingredients}/>
          </>
          : <div>Loading...</div>
        }
      </div>
    </>
  );
}

export default App;
