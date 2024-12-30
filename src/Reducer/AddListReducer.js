import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    SET_PAGE_INDEX,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
} from "../Actions/AllItemsaction";

const initialState = {
    loading: false,
    products: [],
    totalCount: 0,
    error: '',
    pageIndex: 0,
    pageSize: 10,
};

export const allListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                totalCount: action.payload.totalCount,
            };
        case FETCH_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case SET_PAGE_INDEX:
            return { ...state, pageIndex: action.payload };

        // Handle product update
        case UPDATE_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                // Update the product in the state by finding and replacing it
                products: state.products.map((product) =>
                    product.id === action.payload.id ? { ...product, ...action.payload } : product
                ),
            };
        case UPDATE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
