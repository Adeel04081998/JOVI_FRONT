import React from "react";
import { ImageBackground, StyleSheet,View,Button,TouchableOpacity,Text } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const bgImg = { uri: "https://reactjs.org/logo-og.png" };

export default App = () => (
    <View style={styles.container}>
        <View style={styles.wrapper}>
        <TouchableOpacity style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>Get started with jovi</Text>
  </TouchableOpacity>
            
        </View>
        <View style={styles.btmBg}></View>
        <LinearGradient style={styles.overlayBg} colors={['#7359BE', '#B047E3']} />
        <ImageBackground source={bgImg} style={styles.bgImg} />

    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignSelf: 'stretch'
    },
    wrapper:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        alignItems: 'center',
        backgroundColor:'#fff',
        width:'85%',
        height:150,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        zIndex:2,
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        zIndex:3,
        shadowColor:'#000',
        padding:20,
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    },
    appButtonContainer: {
        backgroundColor: "#7359BE",
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 15,
        width:'100%',
      },
      appButtonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
      },
    btmBg:{
        width:'100%',
        height:100,
        backgroundColor:'#fff',
        position:'absolute',
        bottom:0,
        zIndex:2
    },
    overlayBg: {
        position:'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex:1
    },
    bgImg: {
        resizeMode: "cover",
        width: '100%',
        height: '100%',

    }
});
