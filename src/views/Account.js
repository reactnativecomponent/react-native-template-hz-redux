import React, { Component } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'
import {Icon} from 'native-base';
import { NavigationActions } from '../utils'

class Account extends Component {
    static navigationOptions = {
        title: 'Account',
        tabBarLabel: 'Account',
        tabBarIcon: ({ focused, tintColor }) =>
            <Icon
                name="ios-user"
            />,
    }

    gotoLogin = () => {

        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Goto Login" onPress={this.gotoLogin} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 32,
        height: 32,
    },
})
export const LayoutComponent = Account;
export function mapStateToProps(state) {
    return {
        user:state.user
    }
}
