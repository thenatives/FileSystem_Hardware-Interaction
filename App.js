import React, { useState } from 'react';
import { StyleSheet, Text, Image, TextInput, TouchableOpacity, View,
  TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//npm install @react-native-community/async-storage
import colors from './assets/Colors';


export default function App() {
  // Declare state variables textIput and setText
  const [textInput, setText] = useState('');
  // Declare state variables note and setNote
  const [note, setNote] = useState('');

  //function component to save data using setItem method
  const save = async () => {
    if (textInput) {
      await AsyncStorage.setItem('Storage_Key', textInput);
      setText('');
      alert('Data successfully saved');
    } else {
      alert('Failed to save the note, please add some text');
    }
  }

  //function component to retrieve the data using getItem and then methods
  const retrieveData = async () => {
    await AsyncStorage.getItem('Storage_Key').then((note) => {
      setNote(note);
    });
  };

  //function component to remove data using removeItem method
  const remove = async () => {
    await AsyncStorage.removeItem("Storage_Key");
    setNote('');
  };

  //function component to dismiss the keyboard using dismiss method
  const desmissKeyboard = () => {
    Keyboard.dismiss();
  };

  //return a view with image, text input, bottuns, user input and components to dismiss the keyboard
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
//styles objects
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
