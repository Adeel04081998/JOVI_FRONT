import React, {useState} from 'react';
import { View, StyleSheet, Image, Button, Dimensions, Platform, PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const ImageScreen = () => {
  const [state, setState] = useState({
    imgSrc: null,
  })
  const {imgSrc} = state;
    const pickImageHandler = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
          console.log('Granted :', granted)
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              console.log('failed due to camera permission is not granted');
              return;
          }
      }
      // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Select Avatar',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
     
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        setState(prevState => ({
          ...prevState,
          imgSrc: source
        }))         
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
     
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
      } catch (error) {
       console.log('Catch error :', error) 
      }
  }
    return (         
         <View style={styles.body}>
        <Button title="Take Photo" onPress={pickImageHandler} />
        <View style={styles.placeholder}>
          <Image source={imgSrc} style={styles.previewImage} />
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    scrollView: {
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
    body: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
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
    previewImage: {
      width: "100%",
      height: "100%"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  });

export default ImageScreen;
