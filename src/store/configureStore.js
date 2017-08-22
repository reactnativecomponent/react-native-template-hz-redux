import {AsyncStorage} from 'react-native'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';
import asyncActionCallbackMiddleware from './asyncActionCallbackMiddleware';
import utilsMiddleware from './utilsMiddleware';
import minPendingTimeMiddleware from './minPendingTime';
import {createLogger} from 'redux-logger';
import reducers from '../reducers';
import { persistStore, autoRehydrate } from 'redux-persist'

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


export default function configureStore(initialState) {
	const store = applyMiddleware(
		...middlewares
	)(createStore)(reducers, initialState, window.devToolsExtension && window.devToolsExtension());

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('../reducers/index').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	if (isDebuggingInChrome) {
		window.store = store;
	}
    persistStore(store,{storage: AsyncStorage});
	return store;
}






