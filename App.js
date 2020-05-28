'use strict'

import React from 'react';
import {
  StatusBar,
  StyleSheet
} from 'react-native';

import {
  Header, Colors
} from 'react-native/Libraries/NewAppScreen';
import ImageScreen from './src/screens/imageScreen';
import MapScreen from './src/screens/maps';
navigator.geolocation = require('@react-native-community/geolocation');
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
          {/* <ImageScreen /> */}
          <MapScreen />
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  joveText: {
fontSize: 25,
fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});



export default App;
