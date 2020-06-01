'use strict'

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.text}>The Jovi App</Text>
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
