import { combineReducers } from 'redux';

const INITIAL_STATE = {
    product: [],
    cartItem:[]
};

const productReducer = (state=INITIAL_STATE, action) => {
    if(action.type === 'ADD_PRODUCT') {
        const {cartItem, product} = state;
        let productIndex;

        //find product location
        product.forEach(function(value,index){
            if(value.id === action.payload ){
                productIndex = index;
            }
        });

        let addedProduct = product.splice(productIndex,1)
        cartItem.push(addedProduct);
        const newState = {product, cartItem};
        return newState;
        // const { cartItem , name } = state;
        // var index = title.indexOf(action.payload);
        // var addedProduct = title.splice(index, 1);
        // cartItem.push(addedProduct);
        // const newState = {title, cartItem};
        // return newState;
    }
    else 
    if(action.type === 'FETCH_PRODUCT_SUCCESS'){
        return {
            ...state,
            product: action.payload
        }
    }
    return state;           
}

export default combineReducers({
    product: productReducer
});