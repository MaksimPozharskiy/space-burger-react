import React from 'react';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

function IngredientDetails({ closeModalIngredient, isModalIngredientOpened, detailsIngredient }) {

  return (
    <Modal
      closeModalOrder={closeModalIngredient}
      isModalOrderOpened={isModalIngredientOpened}
      title="Детали ингредиента">
      {detailsIngredient && <div className={`${styles.container} mb-15`}>
        <img src={detailsIngredient.image_large} alt={detailsIngredient.name}/>
        <p className="text text_type_main-medium mt-6 mb-10">{detailsIngredient.name}</p>
          <ul className={styles.details}>
            <li className={styles.list}>
              <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
              <p className="text ttext_type_digits-default text_color_inactive">{detailsIngredient.calories}</p>
            </li>
            <li>
              <p className="text text_type_main-default text_color_inactive">Белки, г</p>
              <p className="text text_type_digits-default text_color_inactive">{detailsIngredient.proteins}</p>
            </li>
            <li>
              <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
              <p className="text text_type_digits-default text_color_inactive">{detailsIngredient.fat}</p>
            </li>
            <li>
              <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className="text text_type_digits-default text_color_inactive">{detailsIngredient.carbohydrates}</p>
            </li>
          </ul>
      </div>}
    </Modal>
    )
}

IngredientDetails.propTypes = {
  closeModalIngredient: PropTypes.func,
  isModalIngredientOpened: PropTypes.bool,
  detailsIngredient: PropTypes.object
}

export default IngredientDetails;