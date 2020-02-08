import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import axios from 'axios'


const styles = StyleSheet.create({
  bigTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    paddingHorizontal: 15,
  },
  bigResult: {
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 15,
  },
  smallResult: {
    textAlign: 'left',
    paddingHorizontal: 15,
  },
});

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
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
        <View style={{height: '10%',flex: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
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
      const image = await this.camera.takePictureAsync(options);
      this.props.navigation.navigate('Results', {img: image});
    }
  }
}

class ResultScreen extends React.Component {
  state = {showResults: false,
           result: 'Loading the results...'};
  render() {
    const url = 'https://carcollectorbackend.onrender.com/predict';
    if(!this.state.showResults){
      axios.post(url, this.props.navigation.state.params.img.base64)
        .then((response) => {
          console.log(response.data);
          this.setState({ showResults: true, result: response.data })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    return (
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <Image style={{
								 width: '100%',
								 height: '70%'}}
							   source={{uri: this.props.navigation.state.params.img.uri}}/>
        <Details flag={this.state.showResults} result={this.state.result}/>
        <Button
          title='Go back'
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  } }

class Details extends React.Component {
  render() {
    if(!this.props.flag){
      return(
        <Text>{this.props.result} </Text>
      )
    }
    else {
      return(
        <View style={{ flex: 2, flexDirection: 'row',justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.bigTitle}>Brand Predictor</Text>
            <Text style={styles.bigResult}>1.{this.props.result['brand_classes'][0]}</Text>
            <Text style={styles.bigResult}>Probability: {parseFloat(this.props.result['brand_probs'][0]).toFixed(2)}</Text>
            <Text style={styles.smallResult}>2.{this.props.result['brand_classes'][1]}</Text>
            <Text style={styles.smallResult}>Probability: {parseFloat(this.props.result['brand_probs'][1]).toFixed(2)}</Text>
            <Text style={styles.smallResult}>3.{this.props.result['brand_classes'][2]}</Text>
            <Text style={styles.smallResult}>Probability: {parseFloat(this.props.result['brand_probs'][2]).toFixed(2)}</Text>
          </View>
          <View>
            <Text style={styles.bigTitle}>Model Predictor</Text>
            <Text style={styles.bigResult}>1.{this.props.result['model_classes'][0]}</Text>
            <Text style={styles.bigResult}>Probability: {parseFloat(this.props.result['model_probs'][0]).toFixed(2)}</Text>
            <Text style={styles.smallResult}>2.{this.props.result['model_classes'][1]}</Text>
            <Text style={styles.smallResult}>Probability: {parseFloat(this.props.result['model_probs'][1]).toFixed(2)}</Text>
            <Text style={styles.smallResult}>3.{this.props.result['model_classes'][2]}</Text>
            <Text style={styles.smallResult}>Probability: {parseFloat(this.props.result['model_probs'][2]).toFixed(2)}</Text>
          </View>
        </View>
      )
    }
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

