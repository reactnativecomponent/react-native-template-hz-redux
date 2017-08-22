import React, { Component } from 'react'
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native'
import {NavigationActions} from 'react-navigation';
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Main'})
    ]
});

class Login extends Component {
    static navigationOptions = {
        title: 'Login',
    }

    onLogin = () => {
        this.props.navigation.dispatch(resetAction)
    }

    onClose = () => {
        this.props.navigation.goBack();
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
