import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            width: '100%',
            height: '70%',
          }}
          captureAudio={false}
        >
        </RNCamera>
        <View style={{height: '10%',flex: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={this.takePicture.bind(this)}>
            <Text style={{
              fontSize: 25,
            }}
            >Take a picture</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async() => {
    if (this.camera){
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      this.props.navigation.navigate('Results', {
        data: data,
      });
    }
  }
}

class ResultScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title='Go back'
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
	{
    Home: HomeScreen,
    Results: ResultScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);


export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

