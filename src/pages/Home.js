import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarLabel: 'Home',
    tabBarIcon: () => <Icon name="ios-home" size={32} />,
  }

  gotoDetail = () => {
    this.props.navigation.navigate('Detail')
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
export const LayoutComponent = Home
export function mapStateToProps(state) {
  return {
    user: state.user,
  }
}
