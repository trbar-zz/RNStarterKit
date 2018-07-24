import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { Sentry } from 'react-native-sentry';

Sentry.config('https://e57a39dcddad4fb887e2e33a31e3b6f6:681c51f110e4467a83682b0d6a672dab@sentry.io/1248649').install();


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
});
