import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, TextInput, TouchableOpacity, View, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//mimah imports starts here 
import {SafeAreaView,Linking,} from 'react-native';
//mimah imports finish here



export default function App() {

  const [name, setName] = useState();
  //method to save data
  const save = async () => {
    try {
      await AsyncStorage.setItem("Storage_Key", name)

      //alert('Data successfully saved')
    } catch (error) {
      alert('Failed to save the data to the storage');

    }
  };
  //method to load data
  const load = async () => {
    try {
      let name = await AsyncStorage.getItem("Storage_Key");

      if (name !== null) {
        setName(name);
      }

    } catch (error) {
      alert('Failed to load the data from storage');

    }

  };
  //method to remove data
  const remove = async () => {
    try {

      await AsyncStorage.removeItem("Storage_Key");
    } catch (error) {

    } finally {
      setName("");
    }
  };

  //mimah starts 

  const [facebookShareURL, setFacebookShareURL] = useState(
    'https://www.cct.ie',
  );
  const [postContent, setPostContent] = useState(
    'Enter your share here',
  );

  // method to post on facebook
  const postOnFacebook = () => {
    let facebookParameters = [];
    if (facebookShareURL)
      facebookParameters.push('u=' + encodeURI(facebookShareURL));
    if (postContent)
      facebookParameters.push('quote=' + encodeURI(postContent));

      //url to pointing to face book sharer page
    const url =
      'https://www.facebook.com/sharer/sharer.php?'
       + facebookParameters.join('&');

    Linking.openURL(url)
      .then((data) => {
        alert('Facebook Opened');
      })
      .catch(() => {
        alert('Something went wrong');
      });
  }; //mimah finish

  useEffect(() => {
    load();
  }, []);



  return (
    <View style={styles.container}>

      <Image
        source={require("./assets/logo_CA2.png")}
        style={{ width: 40, height: 40, marginTop: 14 }}
        resizeModo="contain"
      />

      <Text style={{ height: 30 }}>{name}</Text>
      <Text > Enter your data here:</Text>

      <TextInput style={styles.input} onChangeText={(text) => setName(text)} />

      <TouchableOpacity style={styles.botton} onPress={() => save()}>
        <Text style={{ color: "white" }}>Save your data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botton} onPress={() => load()}>
        <Text style={{ color: "white" }}>Reload</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botton} onPress={() => remove()}>
        <Text style={{ color: "white" }}>Remove your data</Text>
      </TouchableOpacity>
      
      <Text style={{ color: "white" }}>Test</Text>
      <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
          Share a link on facebook
        </Text>
        <Text style={styles.titleTextsmall}>
          Enter below post Content
        </Text>
        <TextInput
          value={postContent}
          onChangeText={
            (postContent) => setPostContent(postContent)
          }
          placeholder={'Enter Facebook Post Content'}
          style={styles.textInput}
        />
        
        <Text style={styles.titleTextsmall}>
          Enter URL to Share
        </Text>
        <TextInput
          value={facebookShareURL}
          onChangeText={(facebookShareURL) =>
            setFacebookShareURL(facebookShareURL)
          }
          placeholder={'Enter URL to Share'}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={postOnFacebook}>
          <Text style={styles.buttonTextStyle}>
            Share on Facebook
          </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </View>

    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    textAlign: 'center',//mimah// container: {
    backgroundColor: 'white',
    // padding: 10,
    textAlign: 'center',
  },
  name: {

    fontWeight: "100",
    fontSize: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#A0E7E5",
    alignSelf: "stretch",
    margin: 24,
    height: 64,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 34,
    fontWeight: "300",
  },

  botton: {

    backgroundColor: "#00A0F3",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 6,

  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleTextsmall: {
    marginVertical: 8,
    fontSize: 16,
  },

  // mimah styling 
  buttonStyle: {
    backgroundColor: "#00A0F3",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 6,
    // justifyContent: 'center',
    // marginTop: 15,
    // padding: 10,
    // backgroundColor: '#8ad24e',
    // marginRight: 2,
    // marginLeft: 2,
  },
  buttonTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    // color: '#fff',
    // textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#A0E7E5",
    alignSelf: "stretch",
    margin: 24,
    height: 64,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 34,
    fontWeight: "300",
   // height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    // width: '100%',
    // paddingHorizontal: 10,
  },

  //for bottom are the one with face book function 
  // container: {
  //   backgroundColor: 'white',
  //   padding: 10,
  //   textAlign: 'center',
  //},

});
