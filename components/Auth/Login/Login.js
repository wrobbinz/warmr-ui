import React, { Component } from 'react';
import {
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Form, Item, Label, Input, Button, Text } from 'native-base';


const { width, height } = Dimensions.get('window');

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handlePress = () => {
    const { email, password } = this.state;
    this.props.logIn(email, password);
  }

  render() {
    return (
      <Form>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            onChangeText={email => this.setState({ email })}
          />
        </Item>
        <Item floatingLabel last>
          <Label>Password</Label>
          <Input
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </Item>
        <Button
          onPress={this.handlePress}
          block
        >
          <Text>Log In</Text>
        </Button>
      </Form>
    );
  }
}

export default Login;
