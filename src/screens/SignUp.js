import React from 'react';
import {
  View,
  Image,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';

import { emailPasswordSignup } from '../store/auth/authActions'
import {scale, scaleModerate, scaleVertical} from '../utils/scale';

class Signup extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  }

  onPressSignup() {
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.emailPasswordSignup(this.state.email, this.state.password)
    }
  }

  render() {
    let renderIcon = () => {
      if (RkTheme.current.name === 'light')
        return <Image style={styles.image} source={require('../assets/images/logo.png')}/>;
      return <Image style={styles.image} source={require('../assets/images/logoDark.png')}/>
    };
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <View style={{alignItems: 'center'}}>
          {renderIcon()}
          <RkText rkType='h1'>Registration</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput rkType='rounded' placeholder='Email' onChangeText={(email) => this.setState({email})}/>
            <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
            <RkTextInput rkType='rounded' placeholder='Confirm Password' secureTextEntry={true} onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}/>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <RkButton rkType='large' style={styles.save} onPress={() => {
              this.onPressSignup()
            }}>SIGN UP</RkButton>
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Already have an account?</RkText>
              <RkButton rkType='clear'  onPress={() => this.props.navigation.navigate('Login')}>
                <RkText rkType='header6'> Sign in now </RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  {
    emailPasswordSignup
  }
)(Signup)

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    marginBottom: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  },
  content: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 20,
    backgroundColor: theme.colors.accent,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  footer:{
    justifyContent:'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));
