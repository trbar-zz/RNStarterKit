import React from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import translations from '../../i18n';

export default class Home extends React.Component {

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text testID='homeText'>{translations.t('home.homeScreen')}</Text>
        <Icon name="bath" size={30} color="#900" />
        <Button
          title="Login"
          onPress={() => navigate('Login')}
        />
      </View>
    );
  }
}
