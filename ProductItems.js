import React, {Component} from 'react';
import { Alert, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct } from './productActions';
import { deleteProduct } from './productActions';
import { fetchProducts } from './fetchProducts';

class titleArrays extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { fetchProducts } = this.props;
        fetchProducts();
    }
    renderProducts(productItems){
        return (
           <TouchableOpacity>
               <Text>{this.props.product.addedProducts.total}</Text>

                {productItems.map((productItems,index)=>
                <React.Fragment key = { index }> 
                    <Text>{productItems.name}</Text>
                    <Text>{this.eachProductCount(productItems.name)}</Text>
                    <Button 
                        key = { productItems.name + " Add ".toString() } 
                        title= '+'
                        onPress= {()=>this.props.addProduct(productItems.id)} 
                        />
                    <Button 
                        key = { productItems.name + " Delete ".toString() } 
                        title= '-'
                        onPress= {()=>this.props.deleteProduct(productItems.id)} 
                        />
                </React.Fragment>)}
            </TouchableOpacity>
            )
    }
    eachProductCount(productItemName){
        console.log(this.props.product.addedProducts,productItemName);
        return 0
    }

    render(){
        if(!this.props.product.isFetch){
            return <View><Text>Loading...</Text></View>
        }
        else{
            let productItems = this.props.product.product || [];
            return this.renderProducts(productItems)
        }
        
    }
}

const mapStateToProps = (state) =>{
    const { product } = state
    return { product }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addProduct: addProduct,
        deleteProduct: deleteProduct,
        fetchProducts: fetchProducts
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(titleArrays)