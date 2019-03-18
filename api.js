import axios from 'axios';
import { AsyncStorage } from 'react-native';


class Api {
  constructor() {
    this.base = 'http://10.0.0.79:3000/api';
  }

  options = async (method) => ({
    method,
    headers: await this.headers(),
  })

  headers = async () => {
    const token = await AsyncStorage.getItem('jwtToken');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  /* Auth */
  logIn = async (credentials) => {
    const url = `${this.base}/auth/login`;
    const options = await this.options('POST');
    const totalOptions = {
      ...options,
      body: JSON.stringify(credentials),
    }
    console.log(url, totalOptions)
    const response = await fetch(url, totalOptions);
    const responseJson = response.json();
    return responseJson;
  }

  logOut = async () => {
    const url = `${this.base}/logout-all`;
    const options = await this.options()
    return axios.post(url, {}, options);
  }

  /* User */
  createUser = (user) => {
    const url = `${this.base}/users`;
    return axios.post(url, user);
  }

  getCurrentUser = () => {
    const url = `${this.base}/user`;
    return axios.get(url, this.options());
  }

  updateUser = ({ user, data }) => {
    const url = `${this.base}/users/${user.id}`;
    return axios.patch(url, data, this.options());
  }

  listNotes = ({ user }) => {
    const url = `${this.base}/users/${user.id}/notes`;
    return axios.get(url, this.options());
  }

  /* Note */
  createNote = ({ note, user }) => {
    const url = `${this.base}/users/${user.id}/notes`;
    return axios.post(url, note, this.options());
  }

  updateNote = ({ note, data }) => {
    const url = `${this.base}/notes/${note.id}`;
    return axios.patch(url, data, this.options());
  }

  deleteNote = ({ note }) => {
    const { id } = note;
    const url = `${this.base}/notes/${id}`;
    return axios.delete(url, this.options());
  }
}

export default Api;
