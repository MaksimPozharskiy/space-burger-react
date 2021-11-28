import { wsReducer, initialStateWS } from './wsReducer';
import * as types from '../actions/wsActions';

describe('wsReducer reducer', () => {
  it('should return the initial wsReducer state', () => {
    expect(wsReducer(undefined, {})).toEqual(
      initialStateWS
    )
  });

  it('should handle WS_CONNECTION_SUCCESS action', () => {
    expect(
      wsReducer(initialStateWS, {
        type: types.WS_CONNECTION_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        wsConnected: true,
      })
    )
  });

  it('should handle WS_CONNECTION_ERROR action', () => {
    expect(
      wsReducer(initialStateWS, {
        type: types.WS_CONNECTION_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        wsConnected: false,
        wsError: true,
      })
    )
  });

  it('should handle WS_CONNECTION_CLOSED action', () => {
    expect(
      wsReducer(initialStateWS, {
        type: types.WS_CONNECTION_CLOSED,
      })
    ).toEqual(
      expect.objectContaining({
        wsConnected: false,
        wsError: false,
      })
    )
  });

  it('should handle WS_GET_ORDERS action', () => {
    expect(
      wsReducer(initialStateWS, {
        type: types.WS_GET_ORDERS,
        payload: {
          data: {
            orders: [],
            total: 0,
            totalToday: 0,
          }
        }
      })
    ).toEqual(
      expect.objectContaining({})
    )
  });
});
