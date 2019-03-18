import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { Container } from 'native-base';
import Main from './components/Main/Main';
import Auth from './components/Auth/Auth';


const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    try {
      const isAuthenticated = !!(await AsyncStorage.getItem('jwtToken', jwtToken));
      this.setAuth(isAuthenticated);
    } catch (error) {
      console.log('User is not logged in')
    }
  }

  setAuth = (isAuthenticated) => {
    this.setState({ isAuthenticated });
  }

  render() {
    return (
      <Container>
        {
          !this.state.isAuthenticated
            ? <Main />
            : <Auth setAuth={this.setAuth} />
        }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
});
