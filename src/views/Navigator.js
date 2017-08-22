import React, {Component, PropTypes} from 'react';
import {Navigator, StyleSheet, View, Text, Platform, Dimensions,Alert,NativeAppEventEmitter,BackHandler,ToastAndroid} from 'react-native';
import {Icon,StyleProvider} from 'native-base';
import * as UtilsComponent from './Utils';
import connectComponent from '../utils/connectComponent';
import AppNavigator,{getCurrentScreen} from '../configs/Routers';
import {StackNavigator,TabNavigator,NavigationActions,addNavigationHelpers} from 'react-navigation';
const Utils = connectComponent(UtilsComponent);
const { height, width } = Dimensions.get('window');

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login'})
    ]
});
class Navigation extends Component {
    constructor(props) {
        super(props);
        this.lastBackPressed = null;
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }
    backHandle = () => {
        const currentScreen = getCurrentScreen(this.props.nav);
        if (currentScreen !== 'Home' && currentScreen !== 'Login') {
            this.props.dispatch(NavigationActions.back());
            return true;
        }else if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            //BackAndroid.exitApp();
            return false;
        }else{
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
            return true;
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.utils &&  nextProps.utils.tokenInvalid.isInvalid && this.props.utils.tokenInvalid.id !== nextProps.utils.tokenInvalid.id){
            this.props.dispatch(resetAction);

        }
    }

    render() {
        const {nav} = this.props;
        const {dispatch} =  this.props;
        return (
            <View style={styles.bg}>
                <AppNavigator
                    navigation={addNavigationHelpers({ dispatch, state: nav })}
                    ref={(v)=>this.navigation = v}
                    screenProps={this.navigation}
                />
                <Utils/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flexCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bg: {
        flex: 1,
        height,
        width,
        backgroundColor: 'transparent'
    }
});

export const LayoutComponent = Navigation;
export function mapStateToProps(state,props) {
    return {
        user: state.user,
        utils:state.utils,
        nav:state.nav
    }
}
export function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}


