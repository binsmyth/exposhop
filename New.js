import React, { Component } from 'react';
import { Platform, Image, StyleSheet, View, ScrollView } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct, deleteProduct } from './productActions';
import { fetchProducts } from './fetchProducts';
import ProductItems from './ProductItems';

class New extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount(){
    const { fetchProducts } = this.props;
    fetchProducts(); 
  }
  renderProducts(productItems){
    console.log("renderProducts");
    let productTotal = this.props.product.addedProducts.total || 0;
      return (
        <ScrollView>
          {productItems.map((productItems,index)=>{
            let quantity = 0;
            let subtotal = 0;
            if(this.props.product.addedProducts.hasOwnProperty(productItems.name)){
              quantity = this.props.product.addedProducts[productItems.name].count;
              console.log(quantity);
            }
            return(
              <React.Fragment key = { index }>
                <View>
                  <Text>{productItems.name}</Text>
                  <Image  style={{ width:150, height:150 }}
                          source={{ uri: productItems.images }}/>
                </View>
              </React.Fragment>
            )
          }
          )}
        </ScrollView>
      )
  }
  render() {
    if(!this.props.product.isFetch || this.props.product === undefined){
      return <View><Text>Loading.....</Text></View>
    }
    // else{
    //   let productItems = this.props.product.product || [];
    //   return this.renderProducts(productItems)
    // }
    let productItems = this.props.product.product || [];
    return (
      <Container>

      {/* Header Component */}
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Right>
        </Header>

        {/* Content Component */}
        <Content>
          {this.renderProducts(productItems)}
        </Content>

        {/* Footer Component */}
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapStateToProps = (state) =>{
  const { product } = state
  return { product }
}

const mapDispatchToProps = dispatch =>(
  bindActionCreators({
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    fetchProducts: fetchProducts
  },dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(New)
