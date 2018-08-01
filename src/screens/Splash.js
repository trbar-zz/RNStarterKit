import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  StatusBar
} from 'react-native';
import {
  RkText,
  RkTheme
} from 'react-native-ui-kitten'
import { connect } from 'react-redux';
import ProgressBar from '../components/progressBar';
import {
  RNStarterKitTheme
} from '../config/theme';
import { NavigationActions } from 'react-navigation';
import { scale, scaleModerate, scaleVertical } from '../utils/scale';

let timeFrame = 500;

class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    }
  }

  componentDidMount() {
    StatusBar.setHidden(true, 'none');
    RkTheme.setTheme(RNStarterKitTheme);

    this.timer = setInterval(() => {
      if (this.state.progress == 1) {
        clearInterval(this.timer);
        setTimeout(() => {
          StatusBar.setHidden(false, 'slide');
          this.props.navigation.navigate('Login2')
        }, timeFrame);
      } else {
        let random = Math.random() * 0.5;
        let progress = this.state.progress + random;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({progress});
      }
    }, timeFrame)

  }

  render() {
    let width = Dimensions.get('window').width;
    return (
      <View style={styles.container}>
        <View>
          <Image style={[styles.image, {width}]} source={require('../assets/images/splashBack.png')}/>
          <View style={styles.text}>
            <RkText rkType='light' style={styles.hero}>React Native</RkText>
            <RkText rkType='header0'>RNStaterKit UI Kitten</RkText>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
  })
)(Splash)

let styles = StyleSheet.create({
  container: {
    backgroundColor: RNStarterKitTheme.colors.screen.base,
    justifyContent: 'space-between',
    flex: 1
  },
  image: {
    resizeMode: 'cover',
    height: scaleVertical(430),
  },
  text: {
    alignItems: 'center'
  },
  hero: {
    fontSize: 37,
  },
  appName: {
    fontSize: 62,
  },
  progress: {
    alignSelf: 'center',
    marginBottom: 35,
    backgroundColor: '#e5e5e5'
  },
  save: {
    marginVertical: 9
  }
});
