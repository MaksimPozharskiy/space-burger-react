import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import styles from './BurgerIngredients.module.css';
import { useSelector } from 'react-redux';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('buns')
  const buns: any = document.getElementById("buns");
  const sauces: any = document.getElementById("sauces");
  const toppings: any = document.getElementById("toppings");
  const headerOfIngredients: any = document.getElementById("ingredients");
  const { ingredients, constructorIngredients, IsBun } = useSelector(
    (store: any) => ({
      ingredients: store.burgerIngredients.ingredients,
      constructorIngredients: store.constructorOfOrder.constructorIngredients,
      IsBun: store.constructorOfOrder.isBuns,
    })
  );
  
  const handleClickTypes = (e, type) => {
    setCurrent(e)
    document.getElementById(type)?.scrollIntoView();
  }

  const countOfIngredients = useMemo(() => {
    return ingredients.map((ingredient) => {
      ingredient.count = constructorIngredients.filter(
        (item) => item._id === ingredient._id
      ).length;
      if (IsBun && IsBun._id === ingredient._id) ingredient.count += 2;
      return ingredient;
    });
  }, [ingredients, constructorIngredients, IsBun]);

  const onScrollIngredients = () => {
    if (headerOfIngredients) {
      const bunsPos = Math.abs(
        buns.getBoundingClientRect().top -
        headerOfIngredients.getBoundingClientRect().top
      );
      const saucePos = Math.abs(
        sauces.getBoundingClientRect().top -
        headerOfIngredients.getBoundingClientRect().top
      );
      const fillingPos = Math.abs(
        toppings.getBoundingClientRect().top -
        headerOfIngredients.getBoundingClientRect().top
      );
  
      if (bunsPos < saucePos && bunsPos < fillingPos) {
        setCurrent("buns");
      }
      if (saucePos < bunsPos && saucePos < fillingPos) {
        setCurrent("sauces");
      }
      if (fillingPos < bunsPos && fillingPos < saucePos) {
        setCurrent("toppings");
      }
    }
    
  };
  return (
    <section>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`${styles.tabs} pt-5`}>
        <Tab value="buns" active={current === 'buns'} onClick={(e)=>handleClickTypes(e, 'buns')}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={(e)=>handleClickTypes(e, 'sauces')}>
          Соусы
        </Tab>
        <Tab value="toppings" active={current === 'toppings'} onClick={(e)=>handleClickTypes(e, 'toppings')}>
          Начинки
        </Tab>
      </div>
      <div id="ingredients" className={styles.ingredients} onScroll={onScrollIngredients}>
        <h2 id="buns" className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        {ingredients && <ul className={styles['list-ingredients']}>
          {countOfIngredients.map((ingredient) => {
            return ingredient.type === 'bun' ? 
              <BurgerIngredient
                key={ingredient._id}
                image={ingredient.image}
                name={ingredient.name}
                price={ingredient.price}
                ingredient={ingredient}
                count={ingredient.count}
              /> : '';
          })}
        </ul>}
        <h2 id="sauces" className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles['list-ingredients']}>
          {countOfIngredients.map((ingredient) => {
            return ingredient.type === 'sauce' ? 
              <BurgerIngredient
                key={ingredient._id}
                image={ingredient.image}
                name={ingredient.name}
                price={ingredient.price}
                ingredient={ingredient}
                count={ingredient.count}
              /> : '';
          })}
        </ul>
        <h2 id="toppings" className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles['list-ingredients']}>
          {countOfIngredients.map((ingredient) => {
            return ingredient.type === 'main' ? 
              <BurgerIngredient
                key={ingredient._id}
                image={ingredient.image}
                name={ingredient.name}
                price={ingredient.price}
                ingredient={ingredient}
                count={ingredient.count}
              /> : '';
          })}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;