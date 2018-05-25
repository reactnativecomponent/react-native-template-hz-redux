import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import storage from 'redux-persist/es/storage'
import { persistStore, persistCombineReducers } from 'redux-persist'
import promiseMiddleware from './promiseMiddleware'
import asyncActionCallbackMiddleware from './asyncActionCallbackMiddleware'
import utilsMiddleware from './utilsMiddleware'
import reducers from '../reducers'


const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent
const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
})

const middlewares = [
  thunkMiddleware,
  promiseMiddleware,
  asyncActionCallbackMiddleware,
  utilsMiddleware,
]

if (isDebuggingInChrome) {
  middlewares.push(logger)
}
const config = {
  key: 'root',
  storage,
}

export default function configureStore(initialState) {
  const reducer = persistCombineReducers(config, reducers)

  const store = applyMiddleware(...middlewares)(createStore)(
    reducer,
    initialState,
    window.devToolsExtension && window.devToolsExtension(),
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  if (isDebuggingInChrome) {
    window.store = store
  }
  const persistor = persistStore(store)
  return { persistor, store }
}
