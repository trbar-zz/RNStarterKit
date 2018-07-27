import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { withRkTheme } from 'react-native-ui-kitten';
import { AppRoutes } from './config/navigation/routesBuilder';
import * as Screens from './screens';
import {bootstrap} from './config/bootstrap';

bootstrap();
//data.populateData();

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

console.log('Screens', Screens)

let SideMenu = withRkTheme(Screens.SideMenu);
const RNStarterApp = createStackNavigator({
  First: {
    screen: Screens.SplashScreen
  },
  Home: {
    screen: createDrawerNavigator({
        ...AppRoutes,
      },
      {
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        contentComponent: (props) => <SideMenu {...props}/>
      })
  }
}, {
  headerMode: 'none',
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <RNStarterApp
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getCurrentRouteName(currentState);
            const prevScreen = getCurrentRouteName(prevState);

            if (prevScreen !== currentScreen) {
              //track(currentScreen);
            }
          }}
        />
      </View>
    );
  }
}
