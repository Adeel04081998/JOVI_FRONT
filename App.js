'use strict'

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';

import GetStartJovi from './src/screens/GetStartJovi/getstartjovi';

navigator.geolocation = require('@react-native-community/geolocation');
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <GetStartJovi />
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
