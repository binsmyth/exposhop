import { fetchProductSuccess } from './productActions';
import WooCommerceRestApi from 'react-native-woocommerce-api';

//Need to deal with sideffects add more actions
export function fetchProducts() {
    let WooCommerceApi= new WooCommerceRestApi({
        url: 'http://localhost:8000/', // Your store URL
        ssl: true,
        consumerKey: 'ck_1c80ef55d7b00f0b9683ece8fa8b7321a1b5d27c', // Your consumer secret
        consumerSecret: 'cs_f7e5bb46843663ec2276bfcf2b20b0809b772158', // Your consumer secret
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


