import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'

import Home from './screens/auth/Home'
import Login from './screens/auth/Login'

export const Navigator = new StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
},{
  initialRouteName: 'Login',
})

class Nav extends Component {
  render() {
    const navigation = {
      dispatch: this.props.dispatch,
      state: this.props.navigation,
    }
    return (
      <Navigator navigation={navigation} />
    )
  }
}

const mapStateToProps = state => ({
  state: state
})

export default connect(mapStateToProps)(Nav)
