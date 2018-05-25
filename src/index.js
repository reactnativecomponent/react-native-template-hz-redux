import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import * as NavigationComponent from './pages/Navigation'
import configureStore from './store/configureStore'
import connectComponent from './utils/connectComponent'
import Loading from './components/Loading'

const Navigation = connectComponent(NavigationComponent)
const { persistor, store } = configureStore()
const onBeforeLift = () => {
  // take some action before the gate lifts
}

const app = () => (
  <Provider store={store}>
    <PersistGate
      loading={<Loading />}
      onBeforeLift={onBeforeLift}
      persistor={persistor}
    >
      <Navigation />
    </PersistGate>
  </Provider>
)

export default app
