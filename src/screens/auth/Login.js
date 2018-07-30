import React from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import translations from '../../i18n';

export default class Login extends React.Component {

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text testID='homeText'>{translations.t('login.loginScreen')}</Text>
        <Icon name="rocket" size={30} color="#900" />
        <Button
          title="Home"
          onPress={() => navigate('Home')}
        />
      </View>
    );
  }
}
