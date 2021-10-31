import React from 'react';
import styles from './ModalOverlay.module.css';

interface IModalOverlay {
  isModalOpened: boolean;
  closeModalOrder: () => void;
}

function ModalOverlay({ isModalOpened, closeModalOrder }: IModalOverlay): JSX.Element | null {
  return (
    <div onClick={closeModalOrder} className={`${styles.overlay} ${isModalOpened ? styles.overlayOpened : ''}`}></div>
  )
}

export default ModalOverlay;