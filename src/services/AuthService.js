import axios from 'axios';
import when from 'when';
import {LOGIN_URL, SIGNUP_URL} from '../utils/constants';

class AuthService {

  login(props, username, password) {
    return this.handleAuth(props, when(axios({
      url: LOGIN_URL,
      method: 'post',
      type: 'json',
      contentType: 'application/json',
      data: {
        "username": username,
        "password": password
      }
    })));
  }

  logout(props) {
  }

  signup(username, password, phoneNumber) {
    return this.handleAuth(when(axios({
      url: SIGNUP_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: {
        "username": username,
        "password": password,
        "name": fullName,
        "phone": phoneNumber
      }
    })));
  }

  handleAuth(props, loginPromise) {
    return loginPromise
      .then(function(response) {
        var jwt = response.data.token;
        var refresh = response.data.refresh;
        return true;
      });
  }
}

export default new AuthService()
