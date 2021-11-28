import { SHOW_MODAL, HIDE_MODAL, SHOW_MODAL_ORDER, HIDE_MODAL_ORDER, SHOW_MODAL_ERROR, HIDE_MODAL_ERROR } from "../actions/modalActions";
import { TInitialStateModal } from "./types";

export const initialStateModal: TInitialStateModal = {
  isModalOpened: false,
  isModalOpenedOrder: false,
  isModalOpenedError: false
};

export const modalReducer = (state = initialStateModal, action): TInitialStateModal => {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        ...state,
        isModalOpened: true,
        isModalOpenedOrder: false,
        isModalOpenedError: false,
      };
    }
    case HIDE_MODAL: {
      return {
        ...state,
        isModalOpened: false,
        isModalOpenedOrder: false,
        isModalOpenedError: false,
      };
    }
    case SHOW_MODAL_ORDER: {
      return {
        ...state,
        isModalOpenedOrder: true,
        isModalOpened: false,
        isModalOpenedError: false,
      };
    }
    case HIDE_MODAL_ORDER: {
      return {
        ...state,
        isModalOpenedOrder: false,
        isModalOpened: false,
        isModalOpenedError: false,
      };
    }
    case SHOW_MODAL_ERROR: {
      return {
        ...state,
        isModalOpenedOrder: false,
        isModalOpened: false,
        isModalOpenedError: true,
      };
    }
    case HIDE_MODAL_ERROR: {
      return {
        ...state,
        isModalOpenedOrder: false,
        isModalOpened: false,
        isModalOpenedError: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};