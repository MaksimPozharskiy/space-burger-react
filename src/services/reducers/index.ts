import { combineReducers } from "redux";
import { errorsReducer } from "./errorsReducer";
import { getIngredientsListReducer } from "./ingredientsListReducer";
import { getConstructorIngredientsReducer } from "./constructorIngredientsReducer";
import { getIngredientInfoReducer } from "./ingredientInfoReducer";
import { modalReducer } from "./modalReducer";
import { getOrderReducer } from "./orderReducer";
import { userInfoReducer } from "./userInfoReducer";
import { wsReducer } from "./wsReducer";

const rootReducer = combineReducers({
  burgerIngredients: getIngredientsListReducer,
  constructorOfOrder: getConstructorIngredientsReducer,
  burgerIngredient: getIngredientInfoReducer,
  order: getOrderReducer,
  modal: modalReducer,
  errors: errorsReducer,
  authInfoUser: userInfoReducer,
  ws: wsReducer,
});

export default rootReducer;