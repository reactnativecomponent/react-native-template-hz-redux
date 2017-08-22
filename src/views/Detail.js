import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'

import { NavigationActions } from 'react-navigation';

class Detail extends Component {
    static navigationOptions = {
        title: 'Detail',
    }

    gotoDetail = () => {
        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
    }

    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back({ routeName: 'Account' }))

    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Goto Detail" onPress={this.gotoDetail} />
                <Button title="Go Back" onPress={this.goBack} />
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

export const LayoutComponent = Detail;
export function mapStateToProps(state) {
    return {
        user:state.user
    }
}
