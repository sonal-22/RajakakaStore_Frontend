import axios from 'axios';
import BaseApi from '../URLS/BaseApi';

// Action Types
export const TRANSFER_PRODUCTS_REQUEST = 'TRANSFER_PRODUCTS_REQUEST';
export const TRANSFER_PRODUCTS_SUCCESS = 'TRANSFER_PRODUCTS_SUCCESS';
export const TRANSFER_PRODUCTS_FAILURE = 'TRANSFER_PRODUCTS_FAILURE';

export const GET_TRANSFERS_REQUEST = 'GET_TRANSFERS_REQUEST';
export const GET_TRANSFERS_SUCCESS = 'GET_TRANSFERS_SUCCESS';
export const GET_TRANSFERS_FAILURE = 'GET_TRANSFERS_FAILURE';
export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
const BASE_API_URL = `${BaseApi.baseUrl}/product`; // Centralize API URL

// Transfer Products Action Creator
export const transferProducts = (transferData) => async (dispatch) => {
    dispatch({ type: TRANSFER_PRODUCTS_REQUEST });

    try {
        const token = localStorage.getItem('token'); // Use token for authorization
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post(
            `${BASE_API_URL}/transfer`,
            transferData,
            config
        );

        dispatch({
            type: TRANSFER_PRODUCTS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: TRANSFER_PRODUCTS_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Get All Transfers
const API_URL = `${BASE_API_URL}/getAllTransfer`;

export const getAllTransfers = (filters = {}) => async (dispatch) => {
    dispatch({ type: GET_TRANSFERS_REQUEST });

    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        console.log('Fetching transfers with filters:', filters);

        const response = await axios.post(API_URL, filters, config);

        dispatch({
            type: GET_TRANSFERS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_TRANSFERS_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const setPageIndex = (pageIndex) => ({
    type: SET_PAGE_INDEX,
    payload: pageIndex,
});
// New action to fetch all transfers for export

export const fetchAllTransfersForExport = (filters = {}) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        // Fetch data with no pagination (passing filters)
        const response = await axios.post(`${BASE_API_URL}/getAllTransfer`, {
            ...filters,
            pageIndex: null,  // Disable pagination
            pageSize: null,   // Disable pagination
        }, config);

        // Debug: log the response structure to understand it better
        console.log('Fetched transfers for export:', response.data);

        // Return the correct data (assuming the data you need is under `productTransfers`)
        return response.data.productTransfers || [];  // Adjust based on your actual response
    } catch (error) {
        console.error('Error fetching transfers for export:', error);
        return [];  // Return an empty array in case of error
    }
};
