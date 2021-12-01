import { errorsReducer, initialStateError } from './errorsReducer';
import * as types from '../actions/modalActions';

const testError = 'error';

describe('Errors reducer', () => {
  it('should return the initial errors state', () => {
    expect(errorsReducer(undefined, {})).toEqual(
      initialStateError
    )
  })

  it('should handle SHOW_ERROR action', () => {
    expect(
      errorsReducer(initialStateError, {
        type: types.SHOW_ERROR,
        payload: testError
      })
    ).toEqual(
      expect.objectContaining({
        error: testError,
      })
    )
  })

  it('should handle HIDE_ERROR action', () => {
    expect(
      errorsReducer(initialStateError, {
        type: types.HIDE_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        error: {},
      })
    )
  })
}) 