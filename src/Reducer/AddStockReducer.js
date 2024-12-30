import { AddStock_REQUEST, AddStock_SUCCESS, AddStock_FAILURE } from '../Actions/AddStockaction';

const initialStockState = {
    loading: false,
    stock: null,
    error: null,
};
export const stockReducer = (state = initialStockState, action) => {
    switch (action.type) {
        case AddStock_REQUEST:
            return { ...state, loading: true };
        case AddStock_SUCCESS:
            return { ...state, loading: false, stock: action.payload.stock, error: null };
        case AddStock_FAILURE:
            return { ...state, loading: false, stock: null, error: action.error };
        default:
            return state;
    }
};


