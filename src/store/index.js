import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import device from './device'

const combinedReducer = combineReducers({
  device,
})

// Configure listener
const middlewareListener = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigation
);

const middleware = [
  thunk,
  middlewareListener
]

const store = createStore(
  combinedReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
)

export default store
