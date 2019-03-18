import React, { Component } from 'react';
import { Alert, Animated, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

class Control extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.springValue = new Animated.Value(0.3);
  }

  spring = () => {
    return Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 4,
      }
    ).start()
  }

  push = () => {
    return Animated.spring(
      this.springValue,
      {
        toValue: 0.8,
        friction: 10,
      }
    ).start()
  }

  render() {
    this.spring()
    return (
      <TouchableWithoutFeedback
        onPressIn={this.push}
        onPressOut={this.spring}
        onLongPress={this.props.toggleWatch}
      >
        <Animated.View
          style={{
            ...styles.control,
            transform: [{ scale: this.springValue }]
          }}
        >
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  control: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
    // marginTop: 300,
  }
});

export default Control;
