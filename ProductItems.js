import React, {Component} from 'react';
import { Alert, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct } from './productActions';
import { fetchProducts } from './fetchProducts';

class titleArrays extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { fetchProducts } = this.props;
        fetchProducts();
    }
    render(){
        let productItems = this.props.product.product
        if(productItems === undefined){
            productItems = [];
        }

        return (
            <TouchableOpacity>
                {productItems.map((productItems,index)=>(
                      <Button 
                        key = { productItems.id } 
                        title= { productItems.name }
                        onPress= {()=>this.props.addProduct(productItems.id)} 
                        />  
                    ))}
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) =>{
    const { product } = state
    return { product }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addProduct: addProduct,
        fetchProducts: fetchProducts
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(titleArrays)