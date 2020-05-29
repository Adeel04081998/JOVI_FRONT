import React, { useState, useEffect, useRef, Fragment } from 'react'
import { StyleSheet, View, Button, Dimensions, Platform, PermissionsAndroid, Image, Text, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, AnimatedRegion, Callout, CalloutSubview, UrlTile, Overlay } from "react-native-maps";
import Search from './search';
import bikeIcon from '../assets/bike.png';
import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from "./styles";
import { getPixelSize } from '../utils';
import Directions from './directions';
import Geocoder from "react-native-geocoding";
import { GOOGLE_API_KEY } from '../configs';
import haversine from 'haversine';
Geocoder.init(GOOGLE_API_KEY);
const MapScreen = () => {
  var mapRef = useRef(null);
  var watchRef = null;
  const initState = {
    allCords: [],
    watchRef: useRef(null),
    bikeRegion: {
      latitude: 33.666906,
      longitude: 73.075373,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    },
    region: {
      latitude: 33.666906,
      longitude: 73.075373,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    },
    destination: null,
    locationChosen: false,
    duration: null,
    location: null,
    distance: null,
  }
  const [state, setState] = useState(initState);
  useEffect(() => {
    getLocationHandler();
    watchPositionHandler();
  }, [])
  const { locationChosen, region, destination, duration, location, distance, bikeRegion, allCords } = state;
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (allCords && allCords !== undefined && allCords.length && index < allCords.length && locationChosen !== false) {
      var dis = null;
      var dur = null;
      let start = {
        latitude: allCords[index].latitude,
        longitude: allCords[index].longitude,
      };
      let end = {
        latitude: allCords[allCords.length - 1].latitude,
        longitude: allCords[allCords.length - 1].longitude
      }
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${start.latitude},${start.longitude}&destinations=${end.latitude},${end.longitude}&key=${GOOGLE_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          // console.log(result.rows[0].elements[0].distance)
          dis = result.rows[0].elements[0].distance.text;
          dur = result.rows[0].elements[0].duration.text;
          console.log('New distance :', dis, 'New Duration:', dur)
        })
        .catch(err => console.log('Error=-=-= :', err))
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          distance: dis,
          duration: dur,
          bikeRegion: {
            latitudeDelta: prevState.bikeRegion.latitudeDelta,
            longitudeDelta: prevState.bikeRegion.longitudeDelta,
            latitude: allCords[index].latitude,
            longitude: allCords[index].longitude,
          }
        }))
        setIndex(index + 1)
      }, 3000);
    } else {
      if (locationChosen) {
        Alert.alert('Pitstop completed');
      }
      // setState(prevState => ({
      //   ...prevState,
      // }))
    }
    // console.log('Interval Ran index ;', index)
  }, [locationChosen, index])
  const removeTrip = (data) => {

  }
  const pickLocationHandler = event => {
    // console.log('pickLocationHandler.event', event)
    const coords = event.nativeEvent.coordinate;
    console.log('pickLocationHandler. New Latitude :', coords.latitude);
    console.log('pickLocationHandler. New Longitude :', coords.longitude);
    mapRef.current.animateToRegion({
      ...region,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    setState(prevState => {
      return {
        region: {
          ...prevState.region,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        // locationChosen: true
      };
    });
  };
  const getLocationHandler = async () => {
    console.log('getLocationHandler Called')
    try {
      // if (Platform.OS === 'android') {
      //   const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      //   console.log('Granted :', granted)
      //   if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      //     console.log('failed due to location permission is not granted');
      //     return;
      //   }
      // }
      // console.log('Navigator :', navigator)
      // let tempLat = 33.666906;
      // let tempLong = 73.075373;
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const response = await Geocoder.from({ latitude, longitude });
          const address = response.results[0].formatted_address;
          const location = address.substring(0, address.indexOf(","));
          setState(prevState => ({
            ...prevState,
            location,
            region: {
              latitude,
              longitude,
              latitudeDelta: 0.0143,
              longitudeDelta: 0.0134
            }
          }));
        },
        err => {
          console.log(err.message);
          // alert("Fetching the Position failed, please pick one manually!");
        },
        {
          timeout: 2000,
          // Is a positive value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. Defaults to INFINITY
          enableHighAccuracy: true,
          // Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested
          maximumAge: 1000,
          // Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. 
          // If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position.
          //  If set to Infinity the device will always return a cached position regardless of its age. Defaults to INFINITY
        }
      )
    } catch (error) {
      console.log('getLocationhandler Catch Error :', error)
    }
  }
  const handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;
    console.log('data', data);
    console.log('geometry', geometry)
    setState(prevState => ({
      ...prevState,
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    }));
    console.log('state :', state)
  };
  const onReadyHandler = (result) => {
    console.log('onReadyHandler.Results :', result)
    setState(prevState => ({ ...prevState, distance: Math.floor(result.distance), duration: Math.floor(result.duration), allCords: result.coordinates, locationChosen: true }));
    // handleInterval();
    mapRef.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: getPixelSize(50),
        left: getPixelSize(50),
        top: getPixelSize(50),
        bottom: getPixelSize(350)
      }
    });
  }
  const markerDragHandler = (e, type) => {
    if (type === 'start') {
      console.log('Drag started')
    } else {
      console.log('Drag Ended')
      const { coordinate } = e.nativeEvent;
      setState(prevState => ({ ...prevState, region: coordinate }));
    }
  }
  const watchPositionHandler = () => {
    watchRef = navigator.geolocation.watchPosition(async (position) => {
      console.log('Position :', position)
      const lastPosition = JSON.stringify(position);
      const { latitude, longitude } = position.coords;
      const response = await Geocoder.from({ latitude, longitude });
      if (response && response !== undefined) {
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(","));
        console.log('location :', location)
      }
      console.log('Last Position :', lastPosition);
      // this.setState({ lastPosition });
    },
      err => {
        console.log('Error during watchPosition func: ', err)
      },
      {
        timeout: 2000,
        // Is a positive value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. Defaults to INFINITY
        enableHighAccuracy: true,
        // Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested
        maximumAge: 1000,
        // Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. 
        // If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position.
        //  If set to Infinity the device will always return a cached position regardless of its age. Defaults to INFINITY
        useSignificantChanges: true
        //Uses the battery-efficient native significant changes APIs to return locations. Locations will only be returned when the device detects a significant distance has been breached. Defaults to FALSE
      }
    );
  }
  // console.log("Map Ref :", mapRef);
  console.log("region", region);
  // console.log("LOCATION", location);
  // console.log("Destination", destination);
  // console.log("AllCords", allCords);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={locationChosen ? bikeRegion : region}
        style={styles.map}
        onPress={pickLocationHandler}
        ref={mapRef}
        showsUserLocation={true}
        loadingEnabled={true}
        followsUserLocation={true}
      >
        {/* <UrlTile
          urlTemplate={"http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"}
          maximumZ={19}
          flipY={false}
        /> */}
        {destination && (
          <Fragment>
            <Directions
              origin={region}
              destination={destination}
              onReady={(result) => onReadyHandler(result)}
            />
            <Marker
              coordinate={destination}
              anchor={{ x: 0, y: 0 }}
            >
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
            </Marker>
            {/* <Overlay
              image={bikeIcon}
              tappable={true}
              onPress={(e) => console.log(e)}
              opacity={1.0}
              bounds={[[33.66691, 73.07537]]}
            /> */}
            <Marker coordinate={bikeRegion} anchor={{ x: 0, y: 0 }}>
              <Image
                source={bikeIcon}
                style={{ height: 50, width: 60 }}
              />
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>{duration}</LocationTimeText>
                  {/* <LocationTimeTextSmall>MIN</LocationTimeTextSmall> */}
                </LocationTimeBox>
                <LocationText>{location}</LocationText>
                <LocationTimeBox>
                  <LocationTimeText>{distance}</LocationTimeText>
                  {/* <LocationTimeTextSmall>KM</LocationTimeTextSmall> */}
                </LocationTimeBox>
              </LocationBox>
            </Marker>
          </Fragment>
        )}
        <Marker coordinate={region} anchor={{ x: 0, y: 0 }} title={location} draggable onDragEnd={(e) => markerDragHandler(e, 'end')} onDragStart={(e) => markerDragHandler(e, 'start')}>
          {/* <Callout tooltip={true} alphaHitTest={true}>
            {
              Platform.OS === 'android' ?
                <Image
                  source={bikeIcon}
                  style={{ height: 50, width: 60 }}
                />
                :
                <CalloutSubview>
                  <Image
                    source={bikeIcon}
                    style={{ height: 50, width: 60 }}
                  />
                </CalloutSubview>
            }
          </Callout> */}
        </Marker>
      </MapView>
      <Search onLocationSelected={handleLocationSelected} />
      <View style={styles.button}>
        <Button title="Locate Me" onPress={getLocationHandler} />
      </View>
      {/* <View style={styles.button}>
        <Button title="Pitstop 1" onPress={getLocationHandler} />
      </View>
      <View style={styles.button}>
        <Button title="Pitstop 2" onPress={getLocationHandler} />
      </View> */}
      <Text>
        {/* {
          state.locationChosen ?
            handleInterval()
            :
            null
        } */}
      </Text>
    </View >
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  map: {
    flex: 1,
    width: "100%",
    height: 550
  },
  button: {
    margin: 8
  }
})
