export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';

//action creators
export function addProduct(productIndex) {
    return {
        type:ADD_PRODUCT,
        payload:productIndex
    }
}

export function deleteProduct(productIndex) {
    return {
        type:DELETE_PRODUCT,
        payload:productIndex
    }
}

export function fetchProductSuccess(product){
    return{
        type:FETCH_PRODUCT_SUCCESS,
        payload:product
    }
}

