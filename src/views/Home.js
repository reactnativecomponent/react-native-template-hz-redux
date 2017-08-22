import React, { Component } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'
import { NavigationActions } from '../utils'

class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, tintColor }) =>
            <Image
                style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
                source={require('../images/house.png')}
            />,
    }

    gotoDetail = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Goto Detail" onPress={this.gotoDetail} />
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
export const LayoutComponent = Home;
export function mapStateToProps(state) {
    return {
        user:state.user
    }
}