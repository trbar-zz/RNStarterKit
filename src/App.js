import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import translations from './i18n';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{translations.t('home.homeScreen')}</Text>
      </View>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
});
