import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import device from './device'

const combinedReducer = combineReducers({
  device
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
