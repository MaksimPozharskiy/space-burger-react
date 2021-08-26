import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import styles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';

function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = React.useState('buns')

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
        <ul className={styles['list-ingredients']}>
          {ingredients.map((ingredient) => {
            return ingredient.type === 'bun' ? 
              <BurgerIngredient
                key={ingredient._id}
                image={ingredient.image}
                name={ingredient.name}
                price={ingredient.price}
              /> : '';
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles['list-ingredients']}>
          {ingredients.map((ingredient) => {
            return ingredient.type === 'sauce' ? 
              <BurgerIngredient
                key={ingredient._id}
                image={ingredient.image}
                name={ingredient.name}
                price={ingredient.price}
              /> : '';
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles['list-ingredients']}>
          {ingredients.map((ingredient) => {
            return ingredient.type === 'main' ? 
              <BurgerIngredient
                key={ingredient._id}
                image={ingredient.image}
                name={ingredient.name}
                price={ingredient.price}
              /> : '';
          })}
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    }).isRequired
  ).isRequired
}

export default BurgerIngredients;