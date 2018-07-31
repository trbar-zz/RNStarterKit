import initialState from './authInitialState'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './authActions'

export default function authReducer(state = initialState, action) {
  switch (action.type) {
      default:
        return state

      case LOGIN_REQUEST: {
        return { ...state, isFetching: true }
      }

      case LOGIN_FAILURE:
      case LOGIN_SUCCESS: {
        return { ...state, isFetching: false, result: action.payload }
      }
  }
}
