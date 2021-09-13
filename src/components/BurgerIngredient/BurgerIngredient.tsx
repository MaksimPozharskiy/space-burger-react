import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedIngredient, closeModals, showModal } from '../../services/actions';

function BurgerIngredient({ image, name, price, openModalIngredient, addItemInOrder, ingredient }) {

  const handleOpenModal = () => {
    openModalIngredient(ingredient);
    addItemInOrder(ingredient);
  }

  const dispatch = useDispatch();
  
  function handleAddIngredient() {
    dispatch(getSelectedIngredient(ingredient));
    dispatch(showModal())
  }

  return (
    <li className={styles.ingredient} onClick={handleAddIngredient}>
      <img src={image} alt={name} />
      <div className={styles['price-wrap']}>
        <p className="text text_type_digits-default mt-2 mb-2 mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      <Counter count={1} size="default" />
    </li>
  );
}

BurgerIngredient.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, 
  price: PropTypes.number.isRequired,
  openModalIngredient: PropTypes.func.isRequired,
  addItemInOrder: PropTypes.func,
  ingredient: PropTypes.object.isRequired,
}

export default BurgerIngredient;