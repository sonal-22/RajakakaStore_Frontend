// reducers/productCountReducer.js
import {
    FETCH_PRODUCT_COUNT_REQUEST,
    FETCH_PRODUCT_COUNT_SUCCESS,
    FETCH_PRODUCT_COUNT_FAILURE,
} from '../Actions/Countaction';

const initialState = {
    count: [],
    loading: false,
    error: null,
};

const productCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_COUNT_REQUEST:
            return { ...state, loading: true };
        case FETCH_PRODUCT_COUNT_SUCCESS:
            return { ...state, loading: false, count: action.payload };
        case FETCH_PRODUCT_COUNT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default productCountReducer;
