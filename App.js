import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator,createAppContainer } from 'react-navigation';

//ホーム画面
class Home extends Component {
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
      />
    );
  }
}

//場所検索画面
class Place extends Component {
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
class Conditions extends Component {
  render() {
    return (
      <View>
      </View>
    );
  }
}

//設定画面
class Configuration extends Component {
  render() {
    return (
      <View>
      </View>
    );
  }
}

//場所説明画面
class Description extends Component {
  render() {
    return (
      <View>
      </View>
    );
  }
}

const Navigation = createStackNavigator(
  {
    Home: { screen: Home },
    Place: { screen: Place },
    Conditions: { screen: Conditions },
    Configuration: { screen: Configuration },
    Description: { screen: Description }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(Navigation);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={nav => {
        this.navigator = nav;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});