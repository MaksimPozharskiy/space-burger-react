import { getConstructorIngredientsReducer, initialStateConstructor } from './constructorIngredientsReducer';
import * as types from '../actions/burgerActions';

describe('Burger constructor reducer', () => {
  it('should return the initial constructor state', () => {
    expect(getConstructorIngredientsReducer(undefined, {})).toEqual(
      initialStateConstructor
    )
  });

  it('should handle DELETE_CONSTRUCTOR_INGREDIENT action', () => {
    expect(
      getConstructorIngredientsReducer(initialStateConstructor, {
        type: types.DELETE_CONSTRUCTOR_INGREDIENT,
      })
    ).toEqual(
      expect.objectContaining({
        constructorIngredients: []
      })
    )
  });

  it('should handle MOVE_CONSTRUCTOR_INGREDIENT action', () => {
    expect(
      getConstructorIngredientsReducer(initialStateConstructor, {
        type: types.MOVE_CONSTRUCTOR_INGREDIENT,
        payload: {
          dragIndex: 2,
          hoverIndex: 3,
        }
      })
    ).toEqual(
      expect.objectContaining({
        constructorIngredients: [undefined],
        isBuns: null
      })
    )
  });
});
