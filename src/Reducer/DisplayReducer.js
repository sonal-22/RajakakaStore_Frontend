// reducers/productReducer.js

import {
    DISPLAY_PRODUCTS_REQUEST,
    DISPLAY_PRODUCTS_SUCCESS,
    DISPLAY_PRODUCTS_FAILURE,
    DISPLAY_LIST_FAILURE,
    DISPLAY_LIST_REQUEST,
    DISPLAY_LIST_SUCCESS,
    SET_PAGE_INDEX
} from '../Actions/Displayaction';

const initialState = {
    loading: false,
    products: [],
    totalCount: 0,
    error: '',
    pageIndex: 0,
    pageSize: 10,
};

export const DisplayReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case DISPLAY_PRODUCTS_SUCCESS:
            return { ...state, loading: false, success: true };
        case DISPLAY_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DISPLAY_LIST_REQUEST:
            return { ...state, loading: true };
        case DISPLAY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.productDisplays || [], // Handle productDisplays
                totalCount: action.payload.totalCount || 0, // Ensure totalCount is correctly handled
            };
        case DISPLAY_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case SET_PAGE_INDEX:
            return { ...state, pageIndex: action.payload };
        default:
            return state;
    }
};
