import axios from 'axios';
import BaseApi from '../URLS/BaseApi';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post(`${BaseApi.baseUrl}/user/getAllUser`, {}, config);
        console.log('Fetched Users Data:', response.data);
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error Fetching Users:', error);
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
};

export const updateUser = (user) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Optional, if your API uses tokens
            },
            withCredentials: true, // Include credentials if needed (e.g., cookies or tokens)
        };

        const response = await axios.post('http://localhost:8085/user/updateUser', user, config);

        //  const response = await axios.put('http://localhost:8085/user/updateUser', user, config);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
    }
};

export const deleteUser = (user) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { id: user.id },
        };

        await axios.delete('http://localhost:8085/user/deleteUser', config);
        dispatch({ type: DELETE_USER_SUCCESS, payload: user.id });
    } catch (error) {
        dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
    }
};
