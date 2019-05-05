import React, { Component } from 'react';
import { StyleSheet,
         Text,
         View,
         Platform,
         TouchableOpacity,
         YellowBox,
         ScrollView,
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
         KeyboardAvoidingView,
        } from 'react-navigation';
import { SearchBar } from 'react-native-elements';

//Debuggerどうたらの警告を非表示
YellowBox.ignoreWarnings(['Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).']);

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
  }

  render() {
    if (this.state.latitude && this.state.longitude) {
      return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00521,
          }}
          showsUserLocation={true}
        >
        <MapView.Marker
        coordinate={{latitude: 33.888351,
                     longitude: 130.882071,}}
        title={"コリドック駅前店"}
        description={"マッサージ店"}
        />
        </MapView>
      );
    }
    return (
      <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
        <Text>{this.state.message}</Text>
      </View>
    )
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
      <ScrollView style={{flex:1}}>
        <View style={styles.view}>
          <Text style={{fontSize:13}}>アカウント</Text>
        </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>プロフィール</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>プロモコード</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>クレジットカード編集</Text>
            </View>
        <View style={styles.view}>
          <Text style={{fontSize:13}}>基本設定</Text>
        </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>通知</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>位置情報</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>言語設定</Text>
            </View>
        <View style={styles.view}>
          <Text style={{fontSize:13}}>ヘルプ</Text>
        </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>よくあるご質問</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>お預かりできないもの</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>運営へ連絡する</Text>
            </View>
        <View style={styles.view}>
          <Text style={{fontSize:13}}>このアプリについて</Text>
        </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>お知らせ</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>利用規約</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>プライバシーポリシー</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>運営会社</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{fontSize:15}}>運営へのフィードバック</Text>
            </View>
      </ScrollView>
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
    state = { search: '', };

    updateSearch = search => {
      this.setState({ search });
    };
  render() {
    const { search } = this.state;
    return (
      <View>
        <SearchBar
          placeholder="預け場所をさがす"
          onChangeText={this.updateSearch}
          value={search}
        />
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
  view: {
    height:40,
    padding:7,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center'
  },
  view2: {
    height:50,
    padding:8,
    justifyContent: 'center',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0.5
  }
});