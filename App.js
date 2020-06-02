import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');
import SplashScreen from 'react-native-splash-screen';
import plateformSpecific from './src/utils/plateformSpecific';
import Intro from './src/screens/intro/Intro';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <StatusBar barStyle={plateformSpecific("dark-content", "light-content")} />
      <View style={styles.container}>
        <Intro />
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
