//fetch session
//store session
//delete session
import { facebook, google } from 'react-native-simple-auth'
import { AUTH_URL, FACEBOOK_CONFIG, GOOGLE_CONFIG } from '../../config/secrets'

const GOOGLE_LOGIN_SIGNUP_REQUEST = 'GOOGLE_LOGIN_SIGNUP_REQUEST'
const GOOGLE_LOGIN_SIGNUP_SUCCESS = 'GOOGLE_LOGIN_SIGNUP_SUCCESS'
const GOOGLE_LOGIN_SIGNUP_FAILURE = 'GOOGLE_LOGIN_SIGNUP_FAILURE'

const signUp = async (email, password) => {
  const signUpUrl = AUTH_URL + 'signup';
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
    const response = await fetch(signUpUrl, options);
    const respObj = await response.json();
    if (response.status == 200) {
      respObj['success'] = true;
    }
    return respObj;
  } catch (e) {
    console.log(e);
    return e;
  }
}

const login = async (email, password) => {
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
    return respObj;
  } catch (e) {
    console.error(e);
    return e;
  }
}

const logout = async () => {
  const logoutUrl = AUTH_URL + 'user/logout'
  const options = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
    }
  };
  try {
    const response = await fetch(logoutUrl, options);
    const respObj = await response.json();
    if (response.status == 200) {
      respObj['success'] = true;
    }
    return respObj;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export const facebookLoginSignup = async () => {
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
          'access_token': OAuthResponse.access_token
        }
      })
    })
    const serverResponseObj = await serverResponse.json();
    if (serverResponseObj.status == 200) {
      serverResponseObj['success'] = true;
    }
    console.log('serverResponseObj Facebook', serverResponseObj)
    return serverResponseObj
  } catch (e) {
    console.log(e);
    return e;
  }
}

export const googleLoginSignup = () => {
  return async (dispatch) => {
    console.log('did we get there?')
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

export const googleLoginSignup2 = () => {
  console.log('did we get to before the dispatch statement')
  return (dispatch) => {
    console.log('did we get past the dispatch statement')
    dispatch(googleLoginSignupRequest())
  }
}

export function googleLoginSignupRequest() {
  console.log('googleLoginSignupRequest')
  return {
    type: GOOGLE_LOGIN_SIGNUP_REQUEST,
  }
}

export function googleLoginSignupSuccess(OAuthResponse, ServerResponseObj) {
  console.log('googleLoginSignupSuccess', OAuthResponse, ServerResponseObj)
  return {
    type: GOOGLE_LOGIN_SIGNUP_SUCCESS,
    payload: response,
  }
}

export function loginFailure(error) {
  console.log('googleLoginSignupFailure', error)
  return {
    type: GOOGLE_LOGIN_SIGNUP_FAILURE,
    payload: error,
  }
}
