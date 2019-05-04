import React, { Component } from 'react';
import { StyleSheet,
         Text,
         View,
         Platform,
         TouchableOpacity,
        } from 'react-native';
import { MapView,
         Marker,
         Permissions,
         Constants,
         Location,
       } from 'expo';
import { createBottomTabNavigator,
         createStackNavigator,
         createAppContainer,
        } from 'react-navigation';

//ホーム画面
class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      message: '位置情報取得中',
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        message: 'Androidエミュレーターでは動きません。実機で試してください',
      })
    } else {
      this.getLocationAsync()
    }
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        message: '位置情報のパーミッションの取得に失敗しました',
      })
      return
    }
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    console.log(location);
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 33.88696,
          longitude: 130.88257,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
      >
      <MapView.Marker
      coordinate={{latitude: 33.88696,
                   longitude: 130.88257,}}
      title={"marker.title"}
      description={"test"}
      />
      </MapView>
    );
  }
}

//場所検索画面
class PlaceScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
      </View>
    );
  }
}

//条件設定画面
class ConditionsScreen extends Component {
  render() {
    return (
      <View>
      </View>
    );
  }
}

//設定画面
class ConfigurationScreen extends Component {
  render() {
    return (
      <View>
      </View>
    );
  }
}

//場所説明画面
class DescriptionScreen extends Component {
  render() {
    return (
      <View>
      </View>
    );
  }
}

//予約一覧画面s
class ReservationListScreen extends Component {
  render() {
    return (
      <View>
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Place: PlaceScreen,
  Conditions: ConditionsScreen,
  Configuration: ConfigurationScreen,
  Description: DescriptionScreen,
  ReservationList: ReservationListScreen,
});

const ReservationListStack = createStackNavigator({
  Home: HomeScreen,
  Place: PlaceScreen,
  Conditions: ConditionsScreen,
  Configuration: ConfigurationScreen,
  Description: DescriptionScreen,
  ReservationList: ReservationListScreen,
});

const ConfigurationStack = createStackNavigator({
  Home: HomeScreen,
  Place: PlaceScreen,
  Conditions: ConditionsScreen,
  Configuration: ConfigurationScreen,
  Description: DescriptionScreen,
  ReservationList: ReservationListScreen,
})

export default createAppContainer(createBottomTabNavigator(
  {
    Home: HomeStack,
    ReservationList: ReservationListStack,
    Configuration: ConfigurationStack
  },
  {
    /* Other configuration remains unchanged */
  }
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});