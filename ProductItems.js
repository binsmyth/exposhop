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
        var producttitle = this.props.product.product
        if(producttitle !== undefined){
            console.log(this.props.product.product[0].id);
        }

        var title = this.props.product.title;
        if (title === undefined){
            title = []
        }

        return (
            <TouchableOpacity>
                {title.map((title,index)=>(
                      <Button 
                        key = { title } 
                        title= { title }
                        onPress= {()=>this.props.addProduct(title)} 
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