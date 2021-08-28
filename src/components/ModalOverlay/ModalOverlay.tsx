import React from 'react';
import styles from './ModalOverlay.module.css';

function ModalOverlay({ isModalOpened, closeModal }) {
  return (
    <div onClick={closeModal} className={`${styles.overlay} ${isModalOpened ? styles.overlayOpened : ''}`}></div>
  )
}

export default ModalOverlay;