import { facebook, google } from 'react-native-simple-auth'
import { AUTH_URL, FACEBOOK_CONFIG, GOOGLE_CONFIG } from '../../config/secrets'

import NavigationService from '../../NavigationService'

export const EMAIL_PASSWORD_LOGIN_REQUEST = 'EMAIL_PASSWORD_LOGIN_REQUEST'
export const EMAIL_PASSWORD_LOGIN_SUCCESS = 'EMAIL_PASSWORD_LOGIN_SUCCESS'
export const EMAIL_PASSWORD_LOGIN_FAILURE = 'EMAIL_PASSWORD_LOGIN_FAILURE'

export const EMAIL_PASSWORD_SIGNUP_REQUEST = 'EMAIL_PASSWORD_SIGNUP_REQUEST'
export const EMAIL_PASSWORD_SIGNUP_SUCCESS = 'EMAIL_PASSWORD_SIGNUP_SUCCESS'
export const EMAIL_PASSWORD_SIGNUP_FAILURE = 'EMAIL_PASSWORD_SIGNUP_FAILURE'

export const FACEBOOK_LOGIN_SIGNUP_REQUEST = 'FACEBOOK_LOGIN_SIGNUP_REQUEST'
export const FACEBOOK_LOGIN_SIGNUP_SUCCESS = 'FACEBOOK_LOGIN_SIGNUP_SUCCESS'
export const FACEBOOK_LOGIN_SIGNUP_FAILURE = 'FACEBOOK_LOGIN_SIGNUP_FAILURE'

export const GOOGLE_LOGIN_SIGNUP_REQUEST = 'GOOGLE_LOGIN_SIGNUP_REQUEST'
export const GOOGLE_LOGIN_SIGNUP_SUCCESS = 'GOOGLE_LOGIN_SIGNUP_SUCCESS'
export const GOOGLE_LOGIN_SIGNUP_FAILURE = 'GOOGLE_LOGIN_SIGNUP_FAILURE'

export function emailPasswordLogin(email, password) {
  return async (dispatch) => {
    dispatch(emailPasswordLoginRequest())
    const loginUrl = AUTH_URL + 'login';
    const options = {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify({
        'provider': 'email',
        'data': {
          'email': email,
          'password': password
        }
      })
    };
    try {
      const response = await fetch(loginUrl, options);
      const respObj = await response.json();
      if (response.status !== 200) {
        dispatch(emailPasswordLoginFailure(response))
      }
      dispatch(emailPasswordLoginSuccess(respObj))
    } catch (e) {
      dispatch(emailPasswordLoginFailure(e))
    }
  }
}

export function emailPasswordLoginRequest() {
  return {
    type: EMAIL_PASSWORD_LOGIN_REQUEST,
  }
}

export function emailPasswordLoginSuccess(response) {
  console.log('emailPasswordLoginSuccess', response)
  return {
    type: EMAIL_PASSWORD_LOGIN_SUCCESS,
    payload: response,
  }
}

export function emailPasswordLoginFailure(error) {
  return {
    type: EMAIL_PASSWORD_LOGIN_FAILURE,
    payload: error,
  }
}

export function facebookLoginSignup() {
  return async (dispatch) => {
    dispatch(facebookLoginSignupRequest())
    const facebookLoginSignupUrl = AUTH_URL + 'signup'
    try {
      const OAuthResponse = await facebook(FACEBOOK_CONFIG)
      const serverResponse = await fetch(facebookLoginSignupUrl, {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
        },
        'body': JSON.stringify({
          'provider': 'facebook',
          'data': {
            'access_token': OAuthResponse.credentials.access_token
          }
        })
      })
      const serverResponseObj = await serverResponse.json();
      if (serverResponseObj.status !== 200) {
        dispatch(facebookLoginSignupFailure(serverResponseObj))
      }
      dispatch(facebookLoginSignupSuccess(OAuthResponse, serverResponseObj))
    } catch (e) {
      dispatch(facebookLoginSignupFailure(e))
    }
  }
}

export function facebookLoginSignupRequest() {
  return {
    type: FACEBOOK_LOGIN_SIGNUP_REQUEST,
  }
}

export function facebookLoginSignupSuccess(facebookParams, serverParams) {
  console.log('facebookParams', facebookParams)
  console.log('serverParams', serverParams)
  return {
    type: FACEBOOK_LOGIN_SIGNUP_SUCCESS,
    payload: { facebookParams, serverParams }
  }
}

export function facebookLoginSignupFailure(error) {
  return {
    type: FACEBOOK_LOGIN_SIGNUP_FAILURE,
    payload: error,
  }
}

export const googleLoginSignup = () => {
  return async (dispatch) => {
    dispatch(googleLoginSignupRequest())
    const googleLoginSignupUrl = AUTH_URL + 'signup'
    try {
      const OAuthResponse = await google(GOOGLE_CONFIG)
      const serverResponse = await fetch(googleLoginSignupUrl, {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
        },
        'body': JSON.stringify({
          'provider': 'google',
          'data': {
            'access_token': OAuthResponse.credentials.access_token
          }
        })
      })
      const serverResponseObj = await serverResponse.json();
      if (serverResponseObj.status !== 200) {
        dispatch(googleLoginSignupFailure(serverResponseObj))
      }
      dispatch(googleLoginSignupSuccess(OAuthResponse, serverResponseObj))
    } catch (e) {
      dispatch(googleLoginSignupFailure(e))
    }
  }
}

export function googleLoginSignupRequest() {
  return {
    type: GOOGLE_LOGIN_SIGNUP_REQUEST,
  }
}

export function googleLoginSignupSuccess(googleParams, serverParams) {
  console.log('googleParams', googleParams)
  console.log('serverParams', serverParams)
  return {
    type: GOOGLE_LOGIN_SIGNUP_SUCCESS,
    payload: { googleParams, serverParams }
  }
}

export function googleLoginSignupFailure(error) {
  return {
    type: GOOGLE_LOGIN_SIGNUP_FAILURE,
    payload: error,
  }
}

export function emailPasswordSignup(email, password) {
  console.log('emailPasswordSignup', email, password)
  return async (dispatch) => {
    dispatch(emailPasswordSignupRequest())
    const loginUrl = AUTH_URL + 'signup';
    const options = {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify({
        'provider': 'email',
        'data': {
          'email': email,
          'password': password
        }
      })
    };
    try {
      const response = await fetch(loginUrl, options);
      const respObj = await response.json();
      if (response.status !== 200) {
        dispatch(emailPasswordSignupFailure(response))
      }
      dispatch(emailPasswordSignupSuccess(respObj))
    } catch (e) {
      dispatch(emailPasswordSignupFailure(e))
    }
  }
}

export function emailPasswordSignupRequest() {
  return {
    type: EMAIL_PASSWORD_SIGNUP_REQUEST,
  }
}

export function emailPasswordSignupSuccess(response) {
  console.log('emailPasswordSignupSuccess', response)
  return {
    type: EMAIL_PASSWORD_SIGNUP_SUCCESS,
    payload: response,
  }
}

export function emailPasswordSignupFailure(error) {
  return {
    type: EMAIL_PASSWORD_SIGNUP_FAILURE,
    payload: error,
  }
}
