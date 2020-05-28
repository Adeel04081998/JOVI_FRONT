import React from "react";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../configs";
let reg = {
    latitude: 33.666906,
    longitude: 73.075373
}
const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey={GOOGLE_API_KEY}
        strokeWidth={5}
        strokeColor="#222"
        onStart={(params) => {
            console.log(params)
            // console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
        }}
        optimizeWaypoints={true}
        mode="DRIVING"
        onError={(err) => console.log(err)}
        // directionsServiceBaseUrl={}
    >
        {
            console.log('MapViewDirections.destination :', destination, '[ ]', 'MapViewDirections.origin :', origin)
        }
    </MapViewDirections>
);

export default Directions;