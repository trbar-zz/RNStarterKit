import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import NavigationService from './NavigationService';

export const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigation,
);

const addListener = createReduxBoundAddListener("root");

import Home from './screens/Home'
import Login from './screens/Login'

export const Navigator = new StackNavigator({
  Home: { screen: Home },
  Login: { screen: Login },
},{
  initialRouteName: 'Login',
})

class Nav extends Component {
  render() {

    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation,
          addListener,
        })}
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
    />
    )
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
})

export default connect(mapStateToProps)(Nav)
