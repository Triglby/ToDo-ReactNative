import React, { Component } from 'react';
import { Text, View, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import Task from './Task.js'
import axios from 'axios';

export default class App extends Component {

constructor() {
  super()
  this.state = {  
   text: '',
   taskArray: [],
   test: []
  }
  this.getData = this.getData.bind(this);
  this.deleteTask = this.deleteTask.bind(this);
  this.renderTasks = this.renderTasks.bind(this);
  this.updateArray = this.updateArray.bind(this);
  this.axiosGet = this.axiosGet.bind(this);
}

componentDidMount() {
  this.axiosGet();
  setInterval(this.axiosGet,10000);
}

axiosGet() {
  axios.get("http://35.246.124.82:8090/tasks")
    .then(response => {
      let array = this.state.taskArray;
      response.data.map((task) => {
        task.key = task.identifier;
      });
      response.data.map((task) => {
        let shouldBeToEdit = false;
        for (let i = 0; i < array.length; i++) {
          let taskDownloadInState = false;
          if (array[i].key != task.key){
            continue;
          };
          if (array[i].toEdit == true) {
            task.toEdit = true;
          }           
        }
      });
      this.setState({
        taskArray: response.data
      })
    }); 
}

updateArray(array) {
 if (array.length != 0) {
  this.setState({
    taskArray: array
  });
  }
  else {
    this.setState({
      taskArray: []
    })
  }
}

getData(id, text, update) {
  if (update) {
    axios.put("http://35.246.124.82:8090/tasks/" + id, {
    identifier: id,
    text: text
  }).then(response => {
    this.axiosGet();
  });
  }
  let array = this.state.taskArray;
  let index;
   for (var i = 0; i< array.length; i++) {
    if (array[i].key === id){
      index = i;
      break;
    }
  }
  array[i].toEdit = false;
  this.updateArray(array);  
}

addTask() {

  let UUID = '';
  let length = 64
  for (var i = 1; i < length; i++) {
    UUID += String.fromCharCode(Math.floor(97 + Math.random() * (122-97)))
  }
  axios.post("http://35.246.124.82:8090/tasks", {
    identifier: UUID,
    text: this.state.text
  }).then(response => {
    this.axiosGet();
    this.setState({
      text: ''
    })
  });
}

editTask(item) {
  let array = this.state.taskArray
  let index = array.indexOf(item.item); 
  array[index].toEdit = true;
  this.updateArray(array);
}

deleteTask(item) {
  axios.delete("http://35.246.124.82:8090/tasks/" + item.item.key).then(response => {
    this.axiosGet();
  });
}

renderTasks({item}) {
  return (
    <View>
      <Task UUID={item.key} text={item.text} editable={item.toEdit} sendUpdate={this.getData}/>
      {item.toEdit ? null : <Button onPress={() => this.editTask({item})} title="edit"/>  } 
      <Button onPress={() => this.deleteTask({item})} title="delete"/>
    </View>
  )
} 

  render() {
    return (
      <View>
      <TextInput value= {this.state.text} onChangeText={(text) => this.setState({text})}/>
          
      <Button onPress={this.addTask.bind(this)} title="New Task"/>

      <FlatList
      data={this.state.taskArray}
      extraData={this.state} 
      renderItem={({item}) => this.renderTasks({item})
        }
      />    
      </View>
    );
  }
}
