import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'

import {GradientButton} from '../../components/gradientButton';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { facebookLoginSignup, googleLoginSignup2 } from '../../store/auth/authActions';

export class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  _renderImage(image) {
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;

    if (RkTheme.current.name === 'light')
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('../../assets/images/backgroundLoginV1.png')}/>);
    else
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('../../assets/images/backgroundLoginV1DarkTheme.png')}/>);
    return image;
  }

  render() {
    console.log('this.props Login1Screen', this.props)
    let image = this._renderImage();

    return (
      <RkAvoidKeyboard
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}
        style={styles.screen}>
        {image}
        <View style={styles.container}>
          <View style={styles.buttons}>
            <RkButton style={styles.button} rkType='social' onPress={() => googleLoginSignup2()}>
              <RkText rkType='awesome hero accentColor'><Icon name={'google'} size={35}/></RkText>
            </RkButton>
            <RkButton style={styles.button} rkType='social' onPress={() => facebookLoginSignup()}>
              <RkText rkType='awesome hero accentColor'><Icon name={'facebook'} size={35}/></RkText>
            </RkButton>
          </View>
          <RkTextInput rkType='rounded' placeholder='Username'/>
          <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true}/>
          <RkButton rkType='large' style={styles.save} onPress={() => {
            this.props.navigation.goBack()
          }}>LOGIN</RkButton>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear'>
                <RkText rkType='header6' onPress={() => this.props.navigation.navigate('SignUp')}> Sign up
                  now </RkText>
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
    device: state.device
  })
)(Login)

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24)
  },
  button: {
    marginHorizontal: 14
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
}));
