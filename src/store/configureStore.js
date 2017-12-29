import {AsyncStorage} from 'react-native'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';
import asyncActionCallbackMiddleware from './asyncActionCallbackMiddleware';
import utilsMiddleware from './utilsMiddleware';
import minPendingTimeMiddleware from './minPendingTime';
import {createLogger} from 'redux-logger';
import reducers from '../reducers';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
const logger = createLogger({
	predicate: (getState, action) => isDebuggingInChrome,
	collapsed: true,
	duration: true
});


let middlewares = [
	thunkMiddleware,
	promiseMiddleware,
	asyncActionCallbackMiddleware,
	minPendingTimeMiddleware,
	utilsMiddleware
];


if (isDebuggingInChrome) {
	 middlewares.push(logger);
}
const config = {
    key: 'root',
    storage,
}

export default function configureStore(initialState) {
    let reducer = persistCombineReducers(config, reducers)


	const store = applyMiddleware(
		...middlewares
	)(createStore)(reducer, initialState, window.devToolsExtension && window.devToolsExtension());

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('../reducers/index').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	if (isDebuggingInChrome) {
		window.store = store;
	}
    let persistor = persistStore(store)
	return {persistor,store};
}






