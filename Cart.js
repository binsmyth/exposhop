import React, { Component } from 'react';
import { Platform, Text, View , Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {omit} from './getProductCount';


class Cart extends Component {
  render() {
    let addedItems = Object.entries(omit(this.props.product.addedProducts,"total"))||[];
    let Total = 0;
    return (
      <View style={{marginTop:0}}>
        {addedItems.map((value,index)=>{
          Total = Total + (value[1].count * value[1].price);
          return(
            <View key = { index } >
                <Text>Product: { value[0] }</Text>
                <Text>Quantity: {value[1].count}</Text>
                <Text>Price: {value[1].price}</Text>
                <Text>Subtotal:{value[1].count * value[1].price}</Text>
            </View>)
          }
        )}
        <Text>Total: {Total}</Text>
      </View>
    );
  }
}

const mapStateToProps=(state) => {
    const { product } = state
    return { product }
};

export default connect(mapStateToProps)(Cart)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginTop: 0
  },
})