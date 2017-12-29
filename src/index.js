import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {StyleProvider} from 'native-base';
import * as NavigationComponent from './views/Navigation';
import configureStore from './store/configureStore';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import connectComponent from './utils/connectComponent';
import { PersistGate } from 'redux-persist/es/integration/react'
const Navigation = connectComponent(NavigationComponent);
const { persistor, store } = configureStore()
const onBeforeLift = () => {
    // take some action before the gate lifts
}
export default class Root extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Provider store={store}>
                    <PersistGate
                        loading={<Loading />}
                        onBeforeLift={onBeforeLift}
                        persistor={persistor}>
                        <Navigation/>
                    </PersistGate>
                </Provider>
            </StyleProvider>
        );
    }
}
