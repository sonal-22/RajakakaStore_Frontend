// src/reducers/DamageReducer.js
import {
    GET_DAMAGED_PRODUCTS_REQUEST,
    GET_DAMAGED_PRODUCTS_SUCCESS,
    GET_DAMAGED_PRODUCTS_FAILURE,
} from '../Actions/Damageaction';

const initialState = {
    damagedProducts: [], // Initialized as an empty array
    loading: false,
    error: null,
};

const damageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DAMAGED_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case GET_DAMAGED_PRODUCTS_SUCCESS:
            return { ...state, loading: false, damagedProducts: action.payload };
        case GET_DAMAGED_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default damageReducer;

