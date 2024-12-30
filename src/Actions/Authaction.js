// Actions/Authaction.js
import axios from 'axios';
import BaseApi from '../URLS/BaseApi';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (username, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await axios.post(`${BaseApi.baseUrl}/user/login`, { username, password });
        const { token, role } = response.data; // Assume role is included in the response

        // Store token and role in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        dispatch({ type: LOGIN_SUCCESS, payload: { token, role } });

        return true; // Indicate success
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        return false; // Indicate failure
    }
};
