import React from 'react';
import { AsyncStorage, StyleSheet, Button, Text, TextInput, View } from 'react-native';
import TaskPage from './TaskPage.js'
import SignUpPage from './SignUpPage.js'

export default class App extends React.Component {
constructor() {
  super()
  this.state = {  
    signUp: false,
    signIn: false,
    accessToken: null
  }
  this.toggleSignUp = this.toggleSignUp.bind(this);
  this.setAccessToken = this.setAccessToken.bind(this);
}

toggleSignUp () {
  this.setState({ signUp : !this.state.signUp });
}

async setAccessToken(accessToken) {
  await AsyncStorage.setItem('accessToken', accessToken);
}

async getAccessToken() {
  await AsyncStorage.getItem('accessToken').then((value) => {
    this.setState({
      accessToken: value
    });
})
}

componentDidUpdate() {
    console.log(this.state.accessToken)
}

componentDidMount() {
  this.getAccessToken();
}


render() {
  return (
    <View>
      {this.state.accessToken === null ? <SignUpPage accessToken={this.setAccessToken} info={this.state.signUp} toggle={this.toggleSignUp}/> : <TaskPage accessToken={this.state.accessToken}/>}               
    </View>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
