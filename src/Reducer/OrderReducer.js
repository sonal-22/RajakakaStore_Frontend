// orderReducer.js
import {
    ORDER_PRODUCTS_REQUEST,
    ORDER_PRODUCTS_SUCCESS,
    ORDER_PRODUCTS_FAILURE,
    ORDER_LIST_REQUEST,
    ORDER_LIST_FAILURE,
    ORDER_LIST_SUCCESS,
    SET_PAGE_INDEX
} from '../Actions/Orderaction';

// orderReducer.js
const initialState = {
    loading: false,
    products: [],
    totalCount: 0,
    error: '',
    pageIndex: 0,
    pageSize: 10,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case ORDER_PRODUCTS_SUCCESS:
            return { ...state, loading: false, success: true };
        case ORDER_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ORDER_LIST_REQUEST:
            return { ...state, loading: true };
        case ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.orders || [], // Make sure orders is populated
                totalCount: action.payload.totalCount || 0,
            };

        case ORDER_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case SET_PAGE_INDEX:
            return { ...state, pageIndex: action.payload };
        default:
            return state;
    }
};
