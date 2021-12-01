import { getIngredientsListReducer, initialStateIngredients } from './ingredientsListReducer';
import * as types from '../actions/burgerActions';


describe('ingredient list reducer', () => {
  it('should return the initial ingredient list state', () => {
    expect(getIngredientsListReducer(undefined, {})).toEqual(
      initialStateIngredients
    )
  })

  it('should handle GET_INGREDIENTS_REQUEST action', () => {
    expect(
      getIngredientsListReducer(initialStateIngredients, {
        type: types.GET_INGREDIENTS_REQUEST,
        payload: true
      })
    ).toEqual(
      expect.objectContaining({
        ingredientsRequest: true,
      })
    )
  })

  it('should handle GET_INGREDIENTS_SUCCESS action', () => {
    expect(
      getIngredientsListReducer(initialStateIngredients, {
        type: types.GET_INGREDIENTS_SUCCESS,
        payload: []
      })
    ).toEqual(
      expect.objectContaining({
        ingredientsFailed: false,
        ingredientsRequest: false,
        isLoading: true,
      })
    )
  })

  it('should handle GET_INGREDIENTS_FAILED action', () => {
    expect(
      getIngredientsListReducer(initialStateIngredients, {
        type: types.GET_INGREDIENTS_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ingredientsFailed: true,
        ingredientsRequest: false,
        isLoading: false,
      })
    )
  })
}) 