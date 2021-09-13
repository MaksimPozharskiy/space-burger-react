import React from 'react';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedIngredient, showModal } from '../../services/actions';

function IngredientDetails({ detailsIngredient }) {
  const dispatch = useDispatch();
  const { currentIngredient } = useSelector((store: any) => ({
    currentIngredient: store.burgerIngredient.currentIngredient,
  }));
  

  return (
    <div className={`${styles.container} mb-15`}>
      <img src={currentIngredient.image_large} alt={currentIngredient.name}/>
      <p className="text text_type_main-medium mt-6 mb-10">{currentIngredient.name}</p>
        <ul className={styles.details}>
          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className="text ttext_type_digits-default text_color_inactive">{currentIngredient.calories}</p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient.proteins}</p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient.fat}</p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient.carbohydrates}</p>
          </li>
        </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  detailsIngredient: PropTypes.object
}

export default IngredientDetails;