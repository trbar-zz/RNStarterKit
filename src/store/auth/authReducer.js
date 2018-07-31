import initialState from './authInitialState'

import {
  EMAIL_PASSWORD_LOGIN_REQUEST,
  EMAIL_PASSWORD_LOGIN_SUCCESS,
  EMAIL_PASSWORD_LOGIN_FAILURE,
  EMAIL_PASSWORD_SIGNUP_REQUEST,
  EMAIL_PASSWORD_SIGNUP_SUCCESS,
  EMAIL_PASSWORD_SIGNUP_FAILURE,
  FACEBOOK_LOGIN_SIGNUP_REQUEST,
  FACEBOOK_LOGIN_SIGNUP_SUCCESS,
  FACEBOOK_LOGIN_SIGNUP_FAILURE,
  GOOGLE_LOGIN_SIGNUP_REQUEST,
  GOOGLE_LOGIN_SIGNUP_SUCCESS,
  GOOGLE_LOGIN_SIGNUP_FAILURE
} from './authActions'

export default function authReducer(state = initialState, action) {
  switch (action.type) {
      default:
        return state

      case EMAIL_PASSWORD_SIGNUP_REQUEST:
      case EMAIL_PASSWORD_LOGIN_REQUEST:
      case FACEBOOK_LOGIN_SIGNUP_REQUEST:
      case GOOGLE_LOGIN_SIGNUP_REQUEST: {
        return { ...state, isFetching: true }
      }

      case EMAIL_PASSWORD_SIGNUP_FAILURE:
      case EMAIL_PASSWORD_LOGIN_FAILURE:
      case FACEBOOK_LOGIN_SIGNUP_FAILURE:
      case GOOGLE_LOGIN_SIGNUP_FAILURE: {
        return { ...state, isFetching: false, error: action.payload }
      }

      case GOOGLE_LOGIN_SIGNUP_SUCCESS: {
        return {
          ...state,
          isFetching: false,
          authToken: action.payload.serverParams.auth_token,
          hasuraId: action.payload.serverParams.hasura_id,
          profile: {
            name: action.payload.googleParams.user.name,
            email: action.payload.googleParams.user.email,
            picture: action.payload.googleParams.user.picture
          }
        }
      }

      case FACEBOOK_LOGIN_SIGNUP_SUCCESS: {
        return {
          ...state,
          isFetching: false,
          authToken: action.payload.serverParams.auth_token,
          hasuraId: action.payload.serverParams.hasura_id,
          profile: {
            name: action.payload.facebookParams.user.name,
            email: action.payload.facebookParams.user.email,
            picture: action.payload.facebookParams.user.picture.url
          }
        }
      }

      case EMAIL_PASSWORD_SIGNUP_SUCCESS:
      case EMAIL_PASSWORD_LOGIN_SUCCESS: {
        return {
          ...state,
          isFetching: false,
          authToken: action.payload.auth_token,
          hasuraId: action.payload.hasura_id,
          profile: {
            email: action.payload.email
          }
        }
      }
  }
}
