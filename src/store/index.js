import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import device from './device'
import auth from './auth/authReducer'

const combinedReducer = combineReducers({
  device,
  auth
})

const middleware = [
  thunk
]

const store = createStore(
  combinedReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
)

export default store
