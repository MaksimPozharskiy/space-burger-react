import React from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
const modalRoot = document.getElementById("modal");

function Modal({ title, children, closeModalOrder, isModalOrderOpened }) {


  return modalRoot ? ReactDOM.createPortal(
    (
      <>
        <div className={`${styles.popup} ${isModalOrderOpened ? styles.popupOpened : ''}`}>
          <div className={`${styles.titleWrap} mt-10 ml-10 mr-10`}>
            <h2 className="text text_type_main-large">{title}</h2>
            <CloseIcon type="primary" onClick={closeModalOrder}/>
          </div>
          {children}
        </div>
        <ModalOverlay isModalOpened={isModalOrderOpened} closeModalOrder={closeModalOrder}/>
      </>
    ), modalRoot)
    : null;
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object.isRequired,
  closeModalOrder: PropTypes.func.isRequired,
  isModalOrderOpened: PropTypes.bool.isRequired
}

export default Modal;