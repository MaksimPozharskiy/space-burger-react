import React from 'react';
import styles from './OrderDetails.module.css';
import PropTypes from 'prop-types';

function OrderDetails({ orderNumber }) {

  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large mt-9">{orderNumber}</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <div className={styles.wrapIcon}>
      </div>
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
}

export default OrderDetails;