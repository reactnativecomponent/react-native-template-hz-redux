import {
  createStackNavigator,
  createTabNavigator,
  TabBarBottom,
} from 'react-navigation'
import * as LoginComponent from '../pages/Login'
import * as HomeComponent from '../pages/Home'
import * as AccountComponent from '../pages/Account'
import * as DetailComponent from '../pages/Detail'
import connectComponent from '../utils/connectComponent'

const HomeNavigator = createTabNavigator(
  {
    Home: {
      screen: connectComponent(HomeComponent),
    },
    Account: { screen: connectComponent(AccountComponent) },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: true,
  },
)
HomeNavigator.navigationOptions = ({ navigation }) => {
  let title
  const focusedRouteName =
    navigation.state.routes[navigation.state.index].routeName
  if (focusedRouteName === 'Home') {
    // of course in this case it's the same, but do whatever you want here
    title = 'Home'
  } else if (focusedRouteName === 'Account') {
    title = 'Account'
  }

  return {
    title,
  }
}

const MainNavigator = createStackNavigator({
  HomeNavigator: { screen: HomeNavigator },
  Detail: { screen: connectComponent(DetailComponent) },
})

const AppNavigator = createStackNavigator(
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
  },
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
