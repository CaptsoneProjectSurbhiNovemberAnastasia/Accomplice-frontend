import { createStore, combineReducers, applyMiddleware } from 'redux'
// import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import suggestedMatches from './matches'
import user from './user'
import currentLocation from './currentLocation'
import form from './form'
import { createLogger } from 'redux-logger'

const reducer = combineReducers({
  user,
  currentLocation,
  suggestedMatches,
  form,
})

// Use for production
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    createLogger({
      collapsed: true,
    })
  )
)

const persistedState = localStorage.getItem('store')
  ? JSON.parse(localStorage.getItem('store'))
  : {}

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
    //or possibly update to {}?
  }
  return reducer(state, action)
}

const store = createStore(rootReducer, persistedState, middleware)

// store.subscribe(() =>
//   localStorage.setItem('store', JSON.stringify(store.getState()))
// )

export * from './user'
export * from './matches'
export * from './currentLocation'
export * from './form'

export default store
