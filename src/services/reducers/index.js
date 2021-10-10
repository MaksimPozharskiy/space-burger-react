import { combineReducers } from "redux";
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  MOVE_CONSTRUCTOR_INGREDIENT,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_SELECTED_INGREDIENT_INFO,
  DELETE_SELECTED_INGREDIENT_INFO,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  DELETE_ORDER,
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_MODAL_ORDER,
  HIDE_MODAL_ORDER,
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_MODAL_ERROR,
  HIDE_MODAL_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  FORGET_PASSWORD_CODE,
  RESET_USER_PASSWORD,
  LOGOUT_USER_INFO,
} from '../actions/index';

const initialStateIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

const initialStateConstructor = {
  constructorIngredients: [],
  isBuns: null,
};

const initialStateIngredient = {
  currentIngredient: null,
};

const initialStateOrder = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

const initialStateModal = {
  isModalOpened: false,
  isModalOpenedOrder: false,
  isModalOpenedError: false
};

const initialStateError = {
  error: {},
};

const initialUserInfo = {
  user: {},
  success: false,
  accessToken: null,
  refreshToken: null,
  message: null,
  userRequest: false,
  userRequestFail: false,
};

export const errorsReducer = (state = initialStateError, action) => {
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

const getIngredientsListReducer = (state = initialStateIngredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.payload,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

// Constructor of Burger Reducer
const getConstructorIngredientsReducer = (state = initialStateConstructor, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: {
      if (action.payload.type === "bun") {
        return {
          ...state,
          isBuns: action.payload,
        };
      }
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          { ...action.payload, ingredientId: uuidv4() },
        ],
      };
    }
    case DELETE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.filter(
            (item) => item.ingredientId !== action.payload
          ),
        ],
      };
    }
    case MOVE_CONSTRUCTOR_INGREDIENT: {
      const { dragIndex, hoverIndex } = action.payload;
      const ingredients = [...state.constructorIngredients];
      ingredients.splice(dragIndex, 0, ingredients.splice(hoverIndex, 1)[0]);
      return {
        ...state,
        constructorIngredients: ingredients,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const getIngredientInfoReducer = (state = initialStateIngredient, action) => {
  switch (action.type) {
    case GET_SELECTED_INGREDIENT_INFO: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case DELETE_SELECTED_INGREDIENT_INFO: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const getOrderReducer = (state = initialStateOrder, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        order: action.payload,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    case DELETE_ORDER: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        order: null,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

const modalReducer = (state = initialStateModal, action) => {
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

// Auth
const userInfoReducer = (state = initialUserInfo, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case CREATE_USER_SUCCESS: {
      const { success, user, accessToken, refreshToken } = action.payload;
      return {
        ...state,
        success: success,
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userRequest: false,
        userRequestFail: false,
      };
    }
    case CREATE_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userRequestFail: true,
      };
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case LOGIN_USER_SUCCESS: {
      const { success, user, accessToken, refreshToken } = action.payload;
      return {
        ...state,
        success: success,
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userRequest: false,
        userRequestFail: false,
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userRequestFail: true,
      };
    }
    case FORGET_PASSWORD_CODE: {
      const { success, message } = action.payload;
      return {
        ...state,
        success: success,
        message: message,
      };
    }
    case RESET_USER_PASSWORD: {
      const { success, message } = action.payload;
      return {
        ...state,
        success: success,
        message: message,
      };
    }
    case LOGOUT_USER_INFO: {
      const { success, message } = action.payload;
      return {
        ...state,
        user: {},
        success: success,
        accessToken: null,
        refreshToken: null,
        message: message,
        userRequest: false,
        userRequestFail: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
const rootReducer = combineReducers({
  burgerIngredients: getIngredientsListReducer,
  constructorOfOrder: getConstructorIngredientsReducer,
  burgerIngredient: getIngredientInfoReducer,
  order: getOrderReducer,
  modal: modalReducer,
  errors: errorsReducer,
  authInfoUser: userInfoReducer,
});

export default rootReducer;