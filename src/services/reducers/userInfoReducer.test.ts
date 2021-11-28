import { userInfoReducer, initialUserInfo } from './userInfoReducer';
import * as authTypes from '../actions/authActions';
import * as userTypes from '../actions/userActions';

const testUser = {
  email: 'test email',
  name: 'test name',
  password: 'test password'
}

const testMessage = {
  success: true,
  message: 'test message',
}

describe('User info reducer', () => {
  it('should return the initial user info state', () => {
    expect(userInfoReducer(undefined, {})).toEqual(
      initialUserInfo
    )
  });

  it('should handle CREATE_USER_REQUEST action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: authTypes.CREATE_USER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        userRequest: true,
      })
    )
  });

  it('should handle CREATE_USER_SUCCESS action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: authTypes.CREATE_USER_SUCCESS,
        payload: {
          success: true,
          user: testUser,
          accessToken: 'test token',
          refreshToken: 'test token',
        }
      })
    ).toEqual(
      expect.objectContaining({
        userRequest: false,
        userRequestFail: false,
      })
    )
  });

  it('should handle CREATE_USER_FAILED action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: authTypes.CREATE_USER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        userRequest: false,
        userRequestFail: true,
      })
    )
  });

  it('should handle LOGIN_USER_REQUEST action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: authTypes.LOGIN_USER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        userRequest: true,
      })
    )
  });

  it('should handle LOGIN_USER_SUCCESS action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: authTypes.LOGIN_USER_SUCCESS,
        payload: {
          success: true,
          user: testUser,
          accessToken: 'test token',
          refreshToken: 'test token',
        }
      })
    ).toEqual(
      expect.objectContaining({
        userRequest: false,
        userRequestFail: false,
      })
    )
  });

  it('should handle LOGIN_USER_FAILED action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: authTypes.LOGIN_USER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        userRequest: false,
        userRequestFail: true,
      })
    )
  });

  it('should handle FORGET_PASSWORD_CODE action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: authTypes.FORGET_PASSWORD_CODE,
        payload: testMessage
      })
    ).toEqual(
      expect.objectContaining({})
    )
  });

  it('should handle RESET_USER_PASSWORD action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: authTypes.RESET_USER_PASSWORD,
        payload: testMessage
      })
    ).toEqual(
      expect.objectContaining({})
    )
  });

  it('should handle LOGOUT_USER_INFO action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: authTypes.LOGOUT_USER_INFO,
        payload: testMessage
      })
    ).toEqual(
      expect.objectContaining({
        userRequest: false,
        userRequestFail: false,
        accessToken: null,
        refreshToken: null,
      })
    )
  });

  it('should handle UPDATE_USER_INFO_REQUEST action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: userTypes.UPDATE_USER_INFO_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        userRequest: true,
      })
    )
  });

  it('should handle UPDATE_USER_INFO_SUCCESS action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: userTypes.UPDATE_USER_INFO_SUCCESS,
        payload: {
          success: true,
          user: testUser,
        }
      })
    ).toEqual(
      expect.objectContaining({
        userRequest: false,
        userRequestFail: false,
      })
    )
  });

  it('should handle UPDATE_USER_INFO_FAILED action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: userTypes.UPDATE_USER_INFO_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        userRequest: false,
        userRequestFail: true,
      })
    )
  });

  it('should handle REFRESH_USER_TOKEN action', () => {
    expect(
      userInfoReducer(initialUserInfo, {
        type: authTypes.REFRESH_USER_TOKEN,
        payload: {
          success: true,
          accessToken: 'test token',
          refreshToken: 'test token',
        }
      })
    ).toEqual(
      expect.objectContaining({
        userRequest: false,
        userRequestFail: false,
      })
    )
  });
});