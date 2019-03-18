import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';


class CenterMapButton extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handlePress = () => {
    this.props.centerMap()
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.handlePress}
      >
        <View
          style={{
            ...styles.control,
          }}
        >
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  control: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCC',
    position: 'absolute',
    right: 20,
    bottom: 130,
  }
});

export default CenterMapButton;
