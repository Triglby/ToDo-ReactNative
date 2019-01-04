import React, { Component } from 'react';
import { Text, View, Button, TextInput, FlatList, StyleSheet } from 'react-native';


export default class Task extends Component {

constructor() {
  super()
  this.state = {   
      text: '',
  }
  this.sendUpdate = this.sendUpdate.bind(this);
  this.dontSendUpdate = this.dontSendUpdate.bind(this);
  this.edit = this.edit.bind(this);
  this.nonEdit = this.nonEdit.bind(this); 
}

componentWillUpdate() {
    console.log(this.state.text)
}

componentDidMount() {
    let propText = this.props.text;
    this.setState({
        text: propText
    });
}

sendUpdate() {
    var text = this.state.text;
    this.props.sendUpdate(this.props.UUID, text, true);
}

dontSendUpdate() {
    this.props.sendUpdate(this.props.UUID, 'error', false);
}


nonEdit() {
    return (
        <View>
            <Text>{this.props.text}</Text>
        </View>
    )
}

edit() {
    return (
        <View>
        <TextInput value= {this.state.text} onChangeText={(text) => this.setState({text})}/>
        <Button title="Save" onPress={this.sendUpdate}/>
        <Button title="Don't Save" onPress={this.dontSendUpdate}/>
        </View>
        );
}

  render() {
    return (
      <View>
        {this.props.editable ? this.edit() : this.nonEdit()}
      </View>
    );
  }
}
