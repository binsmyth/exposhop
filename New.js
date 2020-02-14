import React, {Component} from 'react';
import { SafeAreaView } from 'react-navigation';
import { Alert, FlatList,Text, View, TouchableOpacity, Button, Image, ScrollView, StyleSheet, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct } from './productActions';
import { deleteProduct } from './productActions';
import { fetchProducts } from './fetchProducts';

class ProductItems extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { fetchProducts } = this.props;
        fetchProducts();
    }
    renderCenterComponent(productTotal){
        return (
            <Badge 
                fontSize='20'
                value= {productTotal}
                onPress= {()=>this.props.navigation.navigate('Cart',{
                    'item': this.props.product.addedProducts
                })}
            />
        )
    }
    renderProducts(productItems){
        let productTotal = this.props.product.addedProducts.total || 0;
        return (
           <TouchableOpacity style={styles.container}>
               <Header 
                leftComponent={{ icon:'menu', color:'#fff' }}
                centerComponent={{ icon:'home', color:'#fff' }}
                rightComponent={ this.renderCenterComponent(productTotal) }
               />

                <View>
                    <ScrollView style={{height:'73.9%'}} contentContainerStyle={styles.content}>
                        {productItems.map((productItems,index)=>{
                            let quantity = 0;
                            let subtotal = 0;

                            if(this.props.product.addedProducts.hasOwnProperty(productItems.name)){
                                quantity = this.props.product.addedProducts[productItems.name].count;
                                subtotal = this.props.product.addedProducts[productItems.name].count * this.props.product.addedProducts[productItems.name].price;
                            }
                        return(
                        <React.Fragment key = { index }>
                            <View style={styles.box}>
                            <Text style={styles.text}>{productItems.name}</Text>
                            <Image  style = {{width: 150, height: 150}} 
                                    source = {{uri: productItems.images}}/>
                            <Text style={styles.text}>Quantity: {quantity}</Text>
                            <Text style={styles.text}>Price: ${productItems.price}</Text>
                            <Text style={styles.text}>Subtotal: ${subtotal}</Text>
                            <Button  
                                title = '+'
                                onPress = {()=>this.props.addProduct(productItems.id)} 
                                />
                            <Button 
                                title = '-'
                                onPress = {()=>this.props.deleteProduct(productItems.id)} 
                                />
                                </View>
                        </React.Fragment>)
                        })}
                    </ScrollView>
                    <View style={{height:'26.1%'}}>
                    <Header
                        leftComponent={{ icon:'menu', color:'#fff' }}
                        centerComponent={ this.renderCenterComponent(productTotal) }
                        rightComponent={{ icon:'home', color:'#fff' }}  
                    />
                    </View>
            </View>
            </TouchableOpacity>
            )
    }

    render(){
        if(!this.props.product.isFetch || this.props.product === undefined){
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductItems)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF9900',
    margin:0,
    padding:0,
    fontFamily:'Arial',
  },
  top:{
    display:'flex',
    flexWrap:'wrap',
    width:'100%',
    margin:0,
    position:'absolute',
    zIndex:100,
    backgroundColor:'#FF9900',
    justifyContent:'space-between'
  },
  content:{
    backgroundColor:'#111',
    position:'relative',
  },
  bottom:{
      width:'100%',
      position:'absolute',
      bottom:0,
      backgroundColor:'#FF9900',
      justifyContent:'space-between'
  },
  text:{
      color:'white'
  }

})