import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

class ContextView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
    backgroundColor: '#333',
    marginTop: 100,
    marginLeft: 20,
  }
});

export default ContextView;
