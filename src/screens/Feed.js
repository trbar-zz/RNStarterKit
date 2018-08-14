import React from 'react';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  RkCard, RkStyleSheet,
  RkText
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import {Avatar} from '../components/Avatar';
import {data} from '../data';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'

class Feed extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'feed'.toUpperCase(),
      headerLeft: null,
      headerRight: <Icon
        name="sliders"
        size={30}
        style={{ marginRight: 10 }}
        onPress={() => navigation.navigate('Settings')}
      />
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.setState({
      data: data.getArticles('post')
    })
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  renderItem = (info) => {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', {id: info.item.id})}>
        <RkCard rkType='blog' style={styles.card}>
          <Image rkCardImg source={info.item.photo}/>
          <View rkCardHeader style={styles.content}>
            <RkText style={styles.section} rkType='header4'>{info.item.title}</RkText>
          </View>
          <View rkCardContent>
            <View>
              <RkText rkType='primary3 mediumLine' numberOfLines={2}>{info.item.text}</RkText>
            </View>
          </View>
          <View rkCardFooter>
            <View style={styles.userInfo}>
              <Avatar style={styles.avatar} rkType='circle small' img={info.item.user.photo}/>
              <RkText rkType='header6'>{`${info.item.user.firstName} ${info.item.user.lastName}`}</RkText>
            </View>
            <RkText rkType='secondary2 hintColor'>{moment().add(info.item.time, 'seconds').fromNow()}</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.container}/>
    )
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
  })
)(Feed)

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    marginVertical: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 17
  },
  rightHeaderIcon: {
    marginRight: 10,
    size: 30,
  }
}));
