import React, { Component } from 'react';
import { Platform, Image, StyleSheet, View, ScrollView } from 'react-native';
import { Card,Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Badge, CardItem } from 'native-base';
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
  putProductsInRows(productItems){
    return productItems.reduce((result, value, index, array)=>{
      if(index%2 === 0 ){
        result.push(array.slice(index,index+2))
      }
      return result
    },[])
  }

  renderDelProducts(sortedProductItems){
    let productItemComponent = (productItems,quantity)=>{
      return(
        <View style={{ width:'100%', flex: 2, flexDirection:'row', flexWrap:'wrap' }}>
          <View style={{ justifyContent:'space-between',marginRight:10,padding:10, height:'100%',flex:1,flexDirection:'column', flexWrap:'wrap', alignItems:'center', backgroundColor:'#353D42'}}>
            <Image  style = {{flex:1, width: 100, height: 100}} 
                    source = {{uri: productItems[0].images}}/>
            <Badge primary style={{ position: "absolute", top: 1, left: 130 }}>
              <Text>{ quantity }</Text>
            </Badge>
            <Text style={{padding:10}}>${productItems[0].price}</Text>
            <View style={{ padding:10,flexDirection: "row" }}>
              <Button small rounded light
                  onPress={()=>this.props.addProduct(productItems[0].id)}
                  >
                <Text>+</Text>
              </Button>
              <Button small rounded light
                  onPress={()=>this.props.deleteProduct(productItems[0].id)}
                  >
                <Text>-</Text>
              </Button>
            </View>
          </View>
          <View style={{ justifyContent:'space-between' , padding:10, height:'100%',flex:1, flexDirection:'column', flexWrap:'wrap', alignItems:'center', backgroundColor:'#353D42'}}>
            <Image  style = {{padding:10, width: 100, height: 100}} 
                    source = {{uri: productItems[1].images}}/>
            <Badge primary style={{ position: "absolute", top: 1, left: 130 }}>
              <Text>{ quantity }</Text>
            </Badge>
            <Text style={{padding:10}}>${productItems[1].price}</Text>
            <View style={{ padding:10,flexDirection: "row" }}>
              <Button small rounded light
                  onPress={()=>this.props.addProduct(productItems[1].id)}
                  >
                <Text>+</Text>
              </Button>
              <Button small rounded light
                  onPress={()=>this.props.deleteProduct(productItems[1].id)}
                  >
                <Text>-</Text>
              </Button>
            </View>
          </View>
        </View>
      )
    }
    return(
      <ScrollView>
        {sortedProductItems.map((productItems,index)=>{
          let quantity = 0;
          //Check if product has been added
          if(this.props.product.addedProducts.hasOwnProperty(productItems.name)){
            quantity = this.props.product.addedProducts[productItems.name].count; //get added product counts
          }
          return(
          <React.Fragment key={ index }>
            {productItemComponent(productItems, quantity)}
            <View style={{backgroundColor:'#192327',flex:1, padding:5}}></View>
          </React.Fragment>)
        })}
      </ScrollView>
    )
  }
  renderProducts(productItems){
    let productTotal = this.props.product.addedProducts.total || 0;
      return (
        <ScrollView contentContainerStyle={{ flex:1 }}>
          {productItems.map((productItems,index)=>{
            let quantity = 0;
            let subtotal = 0;
            if(this.props.product.addedProducts.hasOwnProperty(productItems.name)){
              quantity = this.props.product.addedProducts[productItems.name].count;
              subtotal = this.props.product.addedProducts[productItems.name].count * this.props.product.addedProducts[productItems.name].price;
            }
            return(
              <React.Fragment key = { index }>
                <Card style={{ flex:1 }}>
                  <CardItem>
                    <Image  style={{ width:150, height:150 }}
                            source={{ uri: productItems.images }}/>
                    <Badge primary style={{ position: "absolute", top: 1, left: 130 }}>
                      <Text>{ quantity }</Text>
                    </Badge>
                  </CardItem>
                  <Text>{ productItems.name }</Text>
                  <Text>${ productItems.price }</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Button small rounded light
                        onPress={()=>this.props.addProduct(productItems.id)}
                        >
                      <Text>+</Text>
                    </Button>
                    <Button small rounded light
                        onPress={()=>this.props.deleteProduct(productItems.id)}
                        >
                      <Text>-</Text>
                    </Button>
                  </View>
                </Card>
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

    let productItems = this.props.product.product || [];
    let sortedProductItems = this.putProductsInRows(productItems);
    return (
      <Container style={{ backgroundColor:'#192327' }}>

      {/* Header Component */}
        <Header style={{ backgroundColor:'#ff9900' }}>
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
        <Content padder>
          {/* all products render here */}
          {this.renderDelProducts(sortedProductItems)}
        </Content>

        {/* Footer Component */}
        <Footer>
          <FooterTab>
            <Button full>
              <View>
                <Text>Footer </Text>
              </View>
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
    flexDirection:"column",
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
