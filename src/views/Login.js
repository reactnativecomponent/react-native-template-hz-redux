import React, { Component } from 'react'
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native'

import { createAction, NavigationActions } from '../utils'

class Login extends Component {
    static navigationOptions = {
        title: 'Login',
    }

    onLogin = () => {
        this.props.dispatch(createAction('app/login')())
    }

    onClose = () => {
        this.props.dispatch(NavigationActions.back())
    }

    render() {
        const { fetching } = this.props
        return (
            <View style={styles.container}>
                {fetching
                    ? <ActivityIndicator />
                    : <Button title="Login" onPress={this.onLogin} />}
                {!fetching && <Button title="Close" onPress={this.onClose} />}
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
})
export const LayoutComponent = Login;
export function mapStateToProps(state) {
    return {
        user:state.user
    }
}