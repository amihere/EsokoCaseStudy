import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import { setAuthToken, ALL_USERS_URL, SIGNUP_URL, TOKEN } from '../utils';

export const registerUser = (user, history) => dispatch => {
    axios.post(SIGNUP_URL, user)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                }); 
            });
}

export const loginUser = (user) => dispatch => {

    if(user.username === "esoko" && user.password === "insyt") {
      axios.get(ALL_USERS_URL + "/3")
        .then(res => {
            console.log(res.data)
            dispatch(setCurrentUser(res));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
    } else {
      dispatch({
          type: GET_ERRORS,
          payload: {"message":"Incorrect username & password"}
      });
    }
    // axios.post(LOGIN_URL, user)
    //         .then(res => {
    //             const token  = res.data.token;
    //             localStorage.setItem(TOKEN, token);
    //             setAuthToken(token);
    //             const decoded = jwt_decode(token);
    //             dispatch(setCurrentUser(decoded));
    //         })
    //         .catch(err => {
    //             dispatch({
    //                 type: GET_ERRORS,
    //                 payload: err
    //             });
    //         });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem(TOKEN);
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    // history.push('/login');
}
