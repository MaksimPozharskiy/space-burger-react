import React from 'react';
import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ isModalOpened, closeModalOrder }) {
  return (
    <div onClick={closeModalOrder} className={`${styles.overlay} ${isModalOpened ? styles.overlayOpened : ''}`}></div>
  )
}

ModalOverlay.propTypes = {
  isModalOpened: PropTypes.bool.isRequired,
  closeModalOrder: PropTypes.func.isRequired, 
}

export default ModalOverlay;