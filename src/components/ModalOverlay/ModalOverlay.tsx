import React from 'react';
import styles from './ModalOverlay.module.css';

function ModalOverlay({ isModalOpened, closeModalOrder }) {
  return (
    <div onClick={closeModalOrder} className={`${styles.overlay} ${isModalOpened ? styles.overlayOpened : ''}`}></div>
  )
}

export default ModalOverlay;