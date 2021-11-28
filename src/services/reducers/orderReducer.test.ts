import { getOrderReducer, initialStateOrder } from './orderReducer';
import * as types from '../actions/orderActions';

const testOrder = {
  createdAt: 123,
  ingredients: [],
  name: 'Test name',
  number: 321,
  status: 'done',
  updatedAt: 'check test',
  _id: 'id 72623',
}

const testOrderResponse = {
  name: 'Test order',
  order: testOrder,
  success: 'done'
}

describe('Order reducer', () => {
  it('should return the initial order state', () => {
    expect(getOrderReducer(undefined, {})).toEqual(
      initialStateOrder
    )
  })

  it('should handle GET_ORDER_REQUEST action', () => {
    expect(
      getOrderReducer(initialStateOrder, {
        type: types.GET_ORDER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        orderRequest: true,
      })
    )
  })

  it('should handle GET_ORDER_SUCCESS action', () => {
    expect(
      getOrderReducer(initialStateOrder, {
        type: types.GET_ORDER_SUCCESS,
        payload: testOrderResponse
      })
    ).toEqual(
      expect.objectContaining({
        orderFailed: false,
        orderRequest: false,
      })
    )
  })

  it('should handle GET_ORDER_FAILED action', () => {
    expect(
      getOrderReducer(initialStateOrder, {
        type: types.GET_ORDER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        orderFailed: true,
        orderRequest: false,
      })
    )
  })
}) 