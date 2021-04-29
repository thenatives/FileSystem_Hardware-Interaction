import React, { useState } from 'react';
import {
  StyleSheet, Text, Image, TextInput, TouchableOpacity, View,
  TouchableWithoutFeedback, Keyboard, StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//npm install @react-native-community/async-storage
import colors from './assets/Colors';


export default function App() {

  const [textInput, setText] = useState('');
  const [note, setNote] = useState('');

  //method to save data
  const save = async () => {
    if (textInput) {
      await AsyncStorage.setItem('Storage_Key', textInput);
      setText('');
      alert('Data successfully saved');
    } else {
      alert('Failed to save the note, please add some text');
    }
  }

  //method to retrieve the data
  const retrieveData = async () => {
    await AsyncStorage.getItem('Storage_Key').then((note) => {
      setNote(note);
    });
  };

  //method to remove data
  const remove = async () => {
    await AsyncStorage.removeItem("Storage_Key");
    setNote('');
  };

  //method to dismiss the keyboard 
  const desmissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Image
          source={require("./assets/logo_CA1.png")}
          style={{ width: 210, height: 210, marginTop: 20 }}
          resizeModo="contain"
        />

        <TextInput multiline underlineColorAndroid='transparent'
          placeholder='Enter some text here'
          value={textInput}
          style={styles.input}
          onChangeText={(text) => setText(text)} />

        <TouchableOpacity style={styles.botton} onPress={save}>

          <Text style={{
            color: "white", fontSize: 18, fontWeight: 'bold',
            textAlign: 'center'
          }}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botton} onPress={retrieveData} >
          <Text style={{
            color: "white", fontSize: 18, fontWeight: 'bold',
            textAlign: 'center'
          }}>Show text</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botton} onPress={remove}>
          <Text style={{
            color: "white", fontSize: 18, fontWeight: 'bold',
            textAlign: 'center'
          }}>Remove</Text>
        </TouchableOpacity>

        <Text style={styles.note}>{note}</Text>

        <TouchableWithoutFeedback onPress={desmissKeyboard}>
          <View style={[styles.desmiss, StyleSheet.absoluteFillObject]} ></View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    height: 100,
    fontSize: 24,
    alignItems: 'center',
    width: 220,
  },
  botton: {
    backgroundColor: colors.PRIMARY,
    padding: 5,
    color: 'white',
    fontSize: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 32,
    minWidth: 250,
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
  },
  desmiss: {
    flex: 1,
    zIndex: -1,
  },
  note: {
    color: colors.DARK,
    padding: 5,
    height: 100,
    fontSize: 24,
    alignItems: 'center',
    width: 220,

  },
});
