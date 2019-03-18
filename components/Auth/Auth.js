import React from 'react';
import { AsyncStorage } from 'react-native';
import { Content } from 'native-base';
import Login from './Login/Login';
import Api from '../../api';


class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.api = new Api();
  }

  logIn = async (email, password) => {
    try {
      const jwtToken = (await this.api.logIn({ email, password })).accessToken;
      await AsyncStorage.setItem('jwtToken', jwtToken);
      this.props.setAuth(true);
    } catch (error) {
      this.setState({ loginFailed: true });
      throw error;
    }
  }

  render() {
    return (
      <Content padder>
        <Login logIn={this.logIn} />
      </Content>
    );
  }
}


export default Auth;
