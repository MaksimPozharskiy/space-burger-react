import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import styles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../contexts/ingredientsContext';

function BurgerIngredients({ openModalIngredient, addItemInOrder }) {
  const [current, setCurrent] = React.useState('buns')
  
  const ingredients = React.useContext(IngredientsContext);
  let dataIngredients;
  if(ingredients.length > 0) {
    dataIngredients = ingredients
  }

  return (
    <section>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`${styles.tabs} pt-5`}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="toppings" active={current === 'toppings'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients}>
        <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        {dataIngredients && <ul className={styles['list-ingredients']}>
          {dataIngredients.map((ingredient) => {
            return ingredient.type === 'bun' ? 
              <BurgerIngredient
                key={ingredient._id}
                image={ingredient.image}
                name={ingredient.name}
                price={ingredient.price}
                openModalIngredient={openModalIngredient}
                addItemInOrder={addItemInOrder}
                ingredient={ingredient}
              /> : '';
          })}
        </ul>}
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles['list-ingredients']}>
          {dataIngredients.map((ingredient) => {
            return ingredient.type === 'sauce' ? 
              <BurgerIngredient
                key={ingredient._id}
                image={ingredient.image}
                name={ingredient.name}
                price={ingredient.price}
                openModalIngredient={openModalIngredient}
                addItemInOrder={addItemInOrder}
                ingredient={ingredient}
              /> : '';
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles['list-ingredients']}>
          {dataIngredients.map((ingredient) => {
            return ingredient.type === 'main' ? 
              <BurgerIngredient
                key={ingredient._id}
                image={ingredient.image}
                name={ingredient.name}
                price={ingredient.price}
                openModalIngredient={openModalIngredient}
                addItemInOrder={addItemInOrder}
                ingredient={ingredient}
              /> : '';
          })}
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  openModalIngredient: PropTypes.func.isRequired,
  addItemInOrder: PropTypes.func.isRequired,
}

export default BurgerIngredients;