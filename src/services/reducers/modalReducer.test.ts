import { modalReducer, initialStateModal } from './modalReducer';
import * as types from '../actions/modalActions';

describe('Modal reducer', () => {
  it('should return the initial modal state', () => {
    expect(modalReducer(undefined, {})).toEqual(
      initialStateModal
    )
  })

  it('should handle SHOW_MODAL action', () => {
    expect(
      modalReducer(initialStateModal, {
        type: types.SHOW_MODAL,
      })
    ).toEqual(
      expect.objectContaining({
        isModalOpened: true,
        isModalOpenedOrder: false,
        isModalOpenedError: false,
      })
    )
  })

  it('should handle HIDE_MODAL action', () => {
    expect(
      modalReducer(initialStateModal, {
        type: types.HIDE_MODAL,
      })
    ).toEqual(
      expect.objectContaining({
        isModalOpened: false,
        isModalOpenedOrder: false,
        isModalOpenedError: false,
      })
    )
  })

  it('should handle SHOW_MODAL_ORDER action', () => {
    expect(
      modalReducer(initialStateModal, {
        type: types.SHOW_MODAL_ORDER,
      })
    ).toEqual(
      expect.objectContaining({
        isModalOpenedOrder: true,
        isModalOpened: false,
        isModalOpenedError: false,
      })
    )
  })

  it('should handle HIDE_MODAL_ORDER action', () => {
    expect(
      modalReducer(initialStateModal, {
        type: types.HIDE_MODAL_ORDER,
      })
    ).toEqual(
      expect.objectContaining({
        isModalOpenedOrder: false,
        isModalOpened: false,
        isModalOpenedError: false,
      })
    )
  })

  it('should handle SHOW_MODAL_ERROR action', () => {
    expect(
      modalReducer(initialStateModal, {
        type: types.SHOW_MODAL_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        isModalOpenedOrder: false,
        isModalOpened: false,
        isModalOpenedError: true,
      })
    )
  })

  it('should handle HIDE_MODAL_ERROR action', () => {
    expect(
      modalReducer(initialStateModal, {
        type: types.HIDE_MODAL_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        isModalOpenedOrder: false,
        isModalOpened: false,
        isModalOpenedError: false,
      })
    )
  })
}) 