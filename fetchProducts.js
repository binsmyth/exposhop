import { fetchProductSuccess } from './productActions';
import WooCommerceRestApi from 'react-native-woocommerce-api';

//Need to deal with sideffects add more actions
export function fetchProducts() {
    let WooCommerceApi= new WooCommerceRestApi({
        url: 'http://localhost/mysite', // Your store URL
        ssl: true,
        consumerKey: 'ck_9e443b2e33c95f8e9e7e99568dd390cf9c0388ae', // Your consumer secret
        consumerSecret: 'cs_dd76d7c01101bc7a2747d32c2e88d9e99a5b7de0', // Your consumer secret
        wpAPI: true, // Enable the WP REST API integration
        version: 'wc/v2', // WooCommerce WP REST API version
        queryStringAuth: true
    });

    return dispatch => {
        //dispatch(fetchProductsPending());
        WooCommerceApi.get('products')
        .then(res => {
            if(res.error) {
                console.log(res.error);
            }
            //sort out from huge list of objects
            let productDetails = res.map(product =>({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    images: product.images[0].src
                }
            ));
            
            dispatch(fetchProductSuccess(productDetails));
            return productDetails;
        })
        .catch(
            err=> {
                console.log(err);
            }
        )
    }
}


