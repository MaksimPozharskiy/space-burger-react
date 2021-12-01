import { getIngredientInfoReducer, initialStateIngredient } from './ingredientInfoReducer';
import * as types from '../actions/modalActions';

const testIngredient = {
  calories: 256,
  carbohydrates: 532,
  count: 23,
  fat: 65,
  image: 'test link',
  image_large: 'test link',
  image_mobile: 'test link',
  name: 'tasty bun',
  proteins: 235,
  type: 'bun',
  _id: '34295',
  price: 300,
  index: 3,
  bunLock: true,
  bunLock_top: true,
  bunLock_bottom: true,
  ingredientId: 'asds332d3',
}

describe('ingredient info reducer', () => {
  it('should return the initial ingredient info state', () => {
    expect(getIngredientInfoReducer(undefined, {})).toEqual(
      initialStateIngredient
    )
  })

  it('should handle GET_SELECTED_INGREDIENT_INFO action', () => {
    expect(
      getIngredientInfoReducer(initialStateIngredient, {
        type: types.GET_SELECTED_INGREDIENT_INFO,
        payload: testIngredient
      })
    ).toEqual(
      expect.objectContaining({
        currentIngredient: testIngredient,
      })
    )
  })

  it('should handle DELETE_SELECTED_INGREDIENT_INFO action', () => {
    expect(
      getIngredientInfoReducer(initialStateIngredient, {
        type: types.DELETE_SELECTED_INGREDIENT_INFO,
      })
    ).toEqual(
      expect.objectContaining({
        currentIngredient: null,
      })
    )
  })

}) 