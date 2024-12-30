// src/actions/DamageAction.js
import axios from 'axios';
import BaseApi from '../URLS/BaseApi';

export const GET_DAMAGED_PRODUCTS_REQUEST = 'GET_DAMAGED_PRODUCTS_REQUEST';
export const GET_DAMAGED_PRODUCTS_SUCCESS = 'GET_DAMAGED_PRODUCTS_SUCCESS';
export const GET_DAMAGED_PRODUCTS_FAILURE = 'GET_DAMAGED_PRODUCTS_FAILURE';

export const getDamagedProducts = (productDto) => async (dispatch) => {
    try {
        dispatch({ type: GET_DAMAGED_PRODUCTS_REQUEST });

        const response = await axios.post(
            `${BaseApi.baseUrl}/product/getAllDamagedProduct`,
            productDto,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        console.log('API Response:', response.data); // Add this to debug
        dispatch({
            type: GET_DAMAGED_PRODUCTS_SUCCESS,
            payload: response.data.products, // Ensure you're dispatching the right data
        });
    } catch (error) {
        dispatch({
            type: GET_DAMAGED_PRODUCTS_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};
