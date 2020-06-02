'use strict'

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';

import Get_start_jovi from './src/screens/get_start_jovi/get_start_jovi';

navigator.geolocation = require('@react-native-community/geolocation');
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Get_start_jovi />
        {/* <Text style={styles.text}>Welcome to Jovi</Text> */}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  text: {
    color: '#fff'
  }
});

export default App;
