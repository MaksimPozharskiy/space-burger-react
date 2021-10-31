import React from 'react';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { keyCodeEsc } from '../../utils/constants';

const modalRoot = document.getElementById("modal");

interface IModal {
  title?: string;
  children: JSX.Element | null;
  closeModal: () => void;
  isModalOpened: boolean;
}

function Modal({ title, children, closeModal, isModalOpened }: IModal): JSX.Element | null {
  const closeModalEsc = React.useCallback((e) => {
    if (e.keyCode === keyCodeEsc) {
      closeModal();
    }
  }, [closeModal]);

  React.useEffect(() => {
    document.addEventListener('keydown', closeModalEsc);

    return (()=> {
      document.removeEventListener('keydown', closeModalEsc);
    })
  }, [closeModalEsc])

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
        <ModalOverlay isModalOpened={isModalOpened} closeModalOrder={closeModal}/>
      </>
    ), modalRoot)
    : null;
}

export default Modal;