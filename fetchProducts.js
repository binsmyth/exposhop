import { fetchProductSuccess } from './productActions';
import WooCommerceAPI from './WooCommerce/WooCommerceAPI';

export function fetchProducts() {
    return dispatch => {
        //dispatch(fetchProductsPending());
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                console.log(res.error);
            }
            dispatch(fetchProductSuccess([res.title]));
            return res.title;
        })
    }
}

