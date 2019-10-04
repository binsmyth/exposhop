import { combineReducers } from 'redux';

const INITIAL_STATE = {
    title: [],
    cartItem:[]
};

const productReducer = (state=INITIAL_STATE, action) => {
    if(action.type === 'ADD_PRODUCT') {
        const { cartItem , title } = state;
        var index = title.indexOf(action.payload);
        var addedProduct = title.splice(index, 1);
        cartItem.push(addedProduct);
        const newState = {title, cartItem};
        return newState;
        // cartItem.push(title[action.payload]);
        // console.log(title.splice(action.payload,1));
        // console.log(state);

        // const { cartItem , title } = state;
        // const addedProduct = title.splice(action.payload,1);
        // cartItem.push (addedProduct);
        // const newState = { cartItem, addedProduct }
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