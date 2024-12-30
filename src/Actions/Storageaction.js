import axios from 'axios';
import BaseApi from '../URLS/BaseApi';

export const FETCH_STORAGES_REQUEST = 'FETCH_STORAGES_REQUEST';
export const FETCH_STORAGES_SUCCESS = 'FETCH_STORAGES_SUCCESS';
export const FETCH_STORAGES_FAILURE = 'FETCH_STORAGES_FAILURE';

export const fetchStorages = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_STORAGES_REQUEST });

        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const response = await axios.post(
            `${BaseApi.baseUrl}/product/getAllStorages`,
            {},  // Empty body if needed
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Add Bearer before token
                },
            }
        );

        console.log('Response Data:', response.data);

        dispatch({
            type: FETCH_STORAGES_SUCCESS,
            payload: response.data,
        });

    } catch (error) {
        console.error('Error fetching storages:', error.message);

        dispatch({
            type: FETCH_STORAGES_FAILURE,
            payload: error.message,
        });
    }
};
