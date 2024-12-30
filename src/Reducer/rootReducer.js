import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { stockReducer } from './AddStockReducer';
import { forgotPasswordReducer } from './ForgotPasswordReducer';
import { allListReducer } from './AddListReducer';
import { storageReducer } from './StorageReducer';
import { productTransferReducer } from './TransferReducer';
import { DisplayReducer } from './DisplayReducer';
import { orderReducer } from './OrderReducer';
import dailySummaryReducer from './DailySummeryReducer';
import productCountReducer from './CountReducer'; // No curly braces for default exports
import productReducer from './DamageReducer';
import damageReducer from './DamageReducer';
export default combineReducers({
    auth: authReducer,
    addStock: stockReducer,
    forgotPassword: forgotPasswordReducer,
    allList: allListReducer,
    storage: storageReducer,
    transferReducer: productTransferReducer, // Changed here
    DisplayReducer: DisplayReducer,
    OrderReducer: orderReducer,
    productCount: productCountReducer,
    dailySummary: dailySummaryReducer, // This key should match useSelector
    productReducer: productReducer,
    damagedProducts: damageReducer
});
