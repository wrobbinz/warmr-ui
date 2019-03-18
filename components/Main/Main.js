import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, Dimensions, Vibration, Animated } from 'react-native';
import { Content } from 'native-base';
import { AnimatedRegion } from "react-native-maps";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import MapCtrl from './MapCtrl/MapCtrl';

const { width, height } = Dimensions.get('window');

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE
      })
    }
  }

  watchPosition = () => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => this.setPosition(position),
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000, distanceFilter: 10 },
    );
    this.setState({ watchId })
  }

  setPosition = (position) => {
    const { latitude, longitude } = position.coords;
    // iOS only
    const { coordinate } = this.state;
    coordinate.timing({ latitude, longitude }).start();

    this.setState({
      latitude,
      longitude,
      error: null,
    });
  }

  toggleWatch = () => {
    Vibration.vibrate()
    const { watchId } = this.state;
    return watchId
      ? this.clearWatch()
      : this.watchPosition()
  }

  clearWatch = () => {
    const { watchId } = this.state;
    navigator.geolocation.clearWatch(watchId)
    this.setState({ watchId: null })
  }

  render() {
    const { latitude, longitude, coordinate } = this.state;
    return (
        <ParallaxScrollView
          style={styles.parallax}
          backgroundColor="red"
          contentBackgroundColor="blue"
          parallaxHeaderHeight={700}
          backgroundScrollSpeed={10}
          renderForeground={() => (
            <View style={{ ...styles.container }}>
              <MapCtrl
                latitude={latitude}
                longitude={longitude}
                watchPosition={this.watchPosition}
                coordinate={coordinate}
              />
            </View>
          )}>
          <View style={{ ...styles.container, height: height - 200 }}>
            <Text>Scroll me</Text>
          </View>
        </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  parallax: {
    height: height + 300,
  },
  info: {
    flex: 6,
    alignItems: 'center',
    // justifyContent: 'center',
    color: '#fff',
    fontSize: 16,
    paddingTop: 50,
    textAlign: 'center',
  },
  control: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prompt: {
    flex: 3,
    color: '#fff',
    fontSize: 30,
    // marginTop: 100,
    textAlign: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
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
  },
  backgroundImage: {
    width,
    height
  },
  foregroundTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  foregroundText: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: 0.41,
    color: "white"
  }
});

export default Main;
