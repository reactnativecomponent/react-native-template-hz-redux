import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom,
    addNavigationHelpers,
    NavigationActions,
} from 'react-navigation'
import * as LoginComponent from '../views/Login'
import * as HomeComponent from '../views/Home'
import * as AccountComponent from '../views/Account'
import * as DetailComponent from '../views/Detail'
import connectComponent from '../utils/connectComponent';

const HomeNavigator = TabNavigator(
    {
        Home: { screen: connectComponent(HomeComponent) },
        Account: { screen: connectComponent(AccountComponent) },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazyLoad: true,
    }
)

const MainNavigator = StackNavigator(
    {
        HomeNavigator: { screen: HomeNavigator },
        Detail: { screen: connectComponent(DetailComponent) },
    },
    {
        headerMode: 'float',
    }
)

const AppNavigator = StackNavigator(
    {
        Main: { screen: MainNavigator },
        Login: { screen: connectComponent(LoginComponent) },
    },
    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps
                const { index } = scene

                const height = layout.initHeight
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                })

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                })

                return { opacity, transform: [{ translateY }] }
            },
        }),
    }
)

export function getCurrentScreen(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
        return getCurrentScreen(route)
    }
    return route.routeName
}


export function routerReducer(state, action = {}) {
    return AppNavigator.router.getStateForAction(action, state)
}

export default AppNavigator