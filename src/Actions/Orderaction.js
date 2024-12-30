import axios from 'axios';
import BaseApi from '../URLS/BaseApi';

// Action Types
export const ORDER_PRODUCTS_REQUEST = 'ORDER_PRODUCTS_REQUEST';
export const ORDER_PRODUCTS_SUCCESS = 'ORDER_PRODUCTS_SUCCESS';
export const ORDER_PRODUCTS_FAILURE = 'ORDER_PRODUCTS_FAILURE';
export const ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST';
export const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS';
export const ORDER_LIST_FAILURE = 'ORDER_LIST_FAILURE';
export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
const BASE_API_URL = `${BaseApi.baseUrl}/product`; // Centralize API URL

// Action Creators
export const fetchOrderList = (
    pageIndex = 0,
    pageSize = 10,
    modelNumber = '',
    serialNumber = '',
    startDate = '',
    endDate = '',
    fromStorageId = '',
    toStorageId = '',
    customerName = '',
    contactNumber = '',
    employeeName = '',
    billDate = '',
    billTime = '',
    id

) => async (dispatch) => {
    dispatch({ type: ORDER_LIST_REQUEST });

    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const productOrderDto = {
            pageIndex,
            pageSize,
            modelNumber,
            serialNumber,
            startDate,
            endDate,
            fromStorageId,
            toStorageId,
            customerName,
            contactNumber,
            employeeName,
            billDate,
            billTime,
            id, // Include id in the payload
        };



        console.log('Sending request with:', productOrderDto);

        const response = await axios.post(`${BASE_API_URL}/getAllOrder`, productOrderDto, config);
        console.log('API Response:', response.data);

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: {
                orders: response.data.orders || [],
                totalCount: response.data.totalCount || 0,
            },
        });
    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);

        dispatch({
            type: ORDER_LIST_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};



// Set Page Index Action
export const setPageIndex = (pageIndex) => ({
    type: SET_PAGE_INDEX,
    payload: pageIndex,
});

export const orderProducts = (orderData) => async (dispatch) => {
    dispatch({ type: ORDER_PRODUCTS_REQUEST });

    try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
        };

        const response = await axios.post(`${BASE_API_URL}/order`, orderData, config); // Use full API path
        dispatch({
            type: ORDER_PRODUCTS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_PRODUCTS_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const fetchAllOrdersForExport = (
    modelNumber = '',
    serialNumber = '',
    startDate = '',
    endDate = '',
    fromStorageId = '',
    toStorageId = ''
) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const productOrderDto = {
            pageIndex: null, // Fetch all data
            pageSize: null,  // Fetch all data
            modelNumber: modelNumber.trim(),
            serialNumber: serialNumber.trim(),
            startDate,
            endDate,
            fromStorageId,
            toStorageId,
        };

        console.log('Sending API request with payload:', productOrderDto);

        const response = await axios.post(`${BASE_API_URL}/getAllOrder`, productOrderDto, config);

        console.log('API Response:', response.data);

        const orders = response.data.orders;
        console.log('Extracted orders:', orders);

        if (!Array.isArray(orders)) {
            console.error('Orders is not an array:', orders);
            return [];
        }

        return orders;
    } catch (error) {
        console.error('Error fetching all orders for export:', error.response ? error.response.data : error.message);
        return [];
    }
};
