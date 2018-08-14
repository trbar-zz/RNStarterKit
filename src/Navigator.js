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

import Feed from './screens/Feed'
import Splash from './screens/Splash'
import Signup from './screens/Signup'
import Login from './screens/Login'
import Article from './screens/Article'
import Settings from './screens/Settings'

export const Navigator = new StackNavigator({
  Feed: { screen: Feed },
  Splash: { screen: Splash },
  Signup: { screen: Signup },
  Login: { screen: Login },
  Article: { screen: Article },
  Settings: { screen: Settings }
},{
  initialRouteName: 'Splash',
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
