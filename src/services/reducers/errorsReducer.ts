import { SHOW_ERROR, HIDE_ERROR } from "../actions/modalActions";
import { TInitialStateError } from "./types";

export const initialStateError: TInitialStateError = {
  error: {},
};

export const errorsReducer = (state = initialStateError, action): TInitialStateError => {
  switch (action.type) {
    case SHOW_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case HIDE_ERROR: {
      return {
        ...state,
        error: {},
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};