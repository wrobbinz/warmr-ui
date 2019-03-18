import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Vibration } from 'react-native';
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { dayMap, nightMap } from './mapStyles'
import CenterMapButton from './CenterMapButton/CenterMapButton';


const { width, height } = Dimensions.get('window');

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

class MapCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.watchPosition();
  }

  getMapRegion = () => ({
    latitude: this.props.latitude,
    longitude: this.props.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  centerMap = () => {
    const r = this.getMapRegion();
    this.mapView.animateToRegion(r, 300);
  }

  render() {
    return (
      <MapView
        ref={(ref) => this.mapView = ref}
        customMapStyle={dayMap}
        style={styles.map}
        showsUserLocation
        followsUserLocation
        loadingEnabled
        provider={"google"}
        region={this.getMapRegion()}
      >
        <CenterMapButton centerMap={this.centerMap} />
      </ MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  marker: {
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 25,
    width: 25,
    borderColor: '#aaa',
    borderWidth: 5,
  }
});

export default MapCtrl;
