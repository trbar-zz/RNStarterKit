import { AUTH_URL } from '../../config/secrets'

import NavigationService from '../../NavigationService'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function login(email, password) {
  return async (dispatch) => {
    dispatch(loginRequest())
    const loginUrl = AUTH_URL + 'login';
    const options = {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify({
        'provider': 'email',
        'data': {
          'username': email,
          'password': password
        }
      })
    };
    try {
      const response = await fetch(loginUrl, options);
      const respObj = await response.json();
      if (response.status == 200) {
        respObj['success'] = true;
      }
      dispatch(loginSuccess(respObj))
      return respObj;
    } catch (e) {
      console.error(e);
      dispatch(loginFailure(e))
      return e;
    }
  }
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  }
}

export function loginSuccess(response) {
  return {
    type: LOGIN_SUCCESS,
    payload: response,
  }
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  }
}
