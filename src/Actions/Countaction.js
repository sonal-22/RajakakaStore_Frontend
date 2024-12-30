// actions/productCountActions.js
import axios from 'axios';
import BaseApi from '../URLS/BaseApi';

export const FETCH_PRODUCT_COUNT_REQUEST = 'FETCH_PRODUCT_COUNT_REQUEST';
export const FETCH_PRODUCT_COUNT_SUCCESS = 'FETCH_PRODUCT_COUNT_SUCCESS';
export const FETCH_PRODUCT_COUNT_FAILURE = 'FETCH_PRODUCT_COUNT_FAILURE';

export const fetchProductCount = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_COUNT_REQUEST });
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
        const response = await axios.post(`${BaseApi.baseUrl}/product/getAllProductCount`);
        dispatch({ type: FETCH_PRODUCT_COUNT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCT_COUNT_FAILURE, payload: error.message });
    }
};
