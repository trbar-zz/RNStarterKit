import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import auth from './auth/authReducer'
import navigation from './navigation/navigationReducer'

//had to create the middleware in the Navigator as it must be declared
//before the addlistener call
import { middleware } from '../Navigator'

const combinedReducer = combineReducers({
  navigation,
  auth
})

const store = createStore(
  combinedReducer,
  applyMiddleware(middleware, thunk)
)

export default store
