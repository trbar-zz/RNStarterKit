import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { facebook, google } from 'react-native-simple-auth';
import { login } from '../store/auth/authActions'

import { FACEBOOK_CONFIG, GOOGLE_CONFIG } from '../config/secrets'
import translations from '../i18n';

class Login extends React.Component {

  componentWillReceiveProps(nextprops) {
    console.log('nextprops', nextprops)
    if (nextprops.auth.result) {
      this.props.navigation.navigate('Home')
    }
  }

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
    console.log('this.props', this.props)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text testID='homeText'>{translations.t('login.loginScreen')}</Text>
        <Icon name="rocket" size={30} color="#900" />
        <Button
          title="Email Password Login"
          onPress={() => this.props.login('username', 'password')}
        />
        <Button
          title="Facebook Login"
          onPress={() => this.onFacebookLoginButtonPress()}
        />
        <Button
          title="Google Login"
          onPress={() => this.onGoogleLoginButtonPress()}
        />
        <Button
          title="Go to Splash View"
          onPress={() => this.props.navigation.navigate('Splash')}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { login })(Login)
