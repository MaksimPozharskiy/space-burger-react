import React from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
const modalRoot = document.getElementById("modal");

function Modal({ title, children, closeModal, isModalOpened }) {


  return modalRoot ? ReactDOM.createPortal(
    (
      <>
        <div className={`${styles.popup} ${isModalOpened ? styles.popupOpened : ''}`}>
          <div className={`${styles.titleWrap} mt-10 ml-10 mr-10`}>
            <h2 className="text text_type_main-large">{title}</h2>
            <CloseIcon type="primary" onClick={closeModal}/>
          </div>
          {children}
        </div>
        <ModalOverlay isModalOpened={isModalOpened} closeModal={closeModal}/>
      </>
    ), modalRoot)
    : null;
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
  closeModal: PropTypes.func,
  isModalOpened: PropTypes.bool
}

export default Modal;