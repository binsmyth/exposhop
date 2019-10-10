import { combineReducers } from 'redux';
import getProductCount from './getProductCount';

const INITIAL_STATE = {
    product: [],
    addedProducts:{},
    isFetch:false
};

const productReducer = (state=INITIAL_STATE, action) => {
    if(action.type === 'ADD_PRODUCT') {
        const {product, addedProducts} = state;
        let productCounts = getProductCount(product, addedProducts, action);
        return {
            ...state,
            product: product,
            addedProducts:productCounts
        }
    }
    if(action.type === 'DELETE_PRODUCT') {
        const {product, addedProducts} = state;
        let productCounts = getProductCount(product, addedProducts, action, true);
        return {
            ...state,
            product: product,
            addedProducts:productCounts
        }
    }
    else 
    if(action.type === 'FETCH_PRODUCT_SUCCESS'){
        return {
            ...state,
            product: action.payload,
            isFetch:true
        }
    }
    return state;           
}

export default combineReducers({
    product: productReducer
});