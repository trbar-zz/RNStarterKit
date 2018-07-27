import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { facebook, google } from 'react-native-simple-auth';

import { FACEBOOK_CONFIG, GOOGLE_CONFIG } from './config/secrets'
import translations from './i18n';

class HomeScreen extends React.Component {

  onFacebookLoginButtonPress() {
    facebook(FACEBOOK_CONFIG).then((info) => {
      console.log('info', info)
    }).catch((error) => {
      console.log('error', error)
    });
  }

  onGoogleLoginButtonPress() {
    google(GOOGLE_CONFIG).then((info) => {
      console.log('info', info)
    }).catch((error) => {
      console.log('error', error)
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text testID='homeText'>{translations.t('home.homeScreen')}</Text>
        <Icon name="rocket" size={30} color="#900" />
        <Button
          title="Facebook Login"
          onPress={() => this.onFacebookLoginButtonPress()}
        />
        <Button
          title="Google Login"
          onPress={() => this.onGoogleLoginButtonPress()}
        />
      </View>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
});
