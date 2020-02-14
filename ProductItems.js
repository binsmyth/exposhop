import React, { Component } from 'react';
import { Platform, Image, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Card,Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Badge, CardItem } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct, deleteProduct } from './productActions';
import { fetchProducts } from './fetchProducts';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Cart from './Cart';

const { height } = Dimensions.get('window');

class ProductItems extends Component {
  constructor(props){
    super(props)
    this.state={
      arrowFacing :'ios-arrow-up'
    }
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

  renderProducts(sortedProductItems){

    let productItemComponent = (productItems)=>{
      return(
        <View style={{ width:'100%', flex: 2, flexDirection:'row', flexWrap:'wrap' }}>
          {/* Products on left */}
          <View style={{ justifyContent:'space-between',marginRight:10,padding:10, height:'100%',flex:1,flexDirection:'column', flexWrap:'wrap', alignItems:'center', backgroundColor:'#353D42', borderRadius:17}}>
            <Text style={{padding:10, color:'#fff'}}>{productItems[0].name}</Text>
            <Image  style = {{flex:1, width: 100, height: 100}} 
                    source = {{uri: productItems[0].images}}/>
            <Text style={{padding:10,color:'#fff'}}>${productItems[0].price}</Text>
            <View style={{ padding:10,flexDirection: "row" }}>
              <Button primary transparent
                  onPress={()=>this.props.addProduct(productItems[0].id)}
                  >
                <Text style={{color:'#fff'}}>+</Text>
              </Button>
              <Badge primary style={{marginTop:10,backgroundColor:'#FF9900'}}>
                <Text style={{color:'#fff'}}>{ this.props.product.addedProducts.hasOwnProperty(productItems[0].name)? this.props.product.addedProducts[productItems[0].name].count:0 }</Text>
              </Badge>
              <Button primary transparent
                  onPress={()=>this.props.deleteProduct(productItems[0].id)}
                  >
                <Text style={{color:'#fff'}}>-</Text>
              </Button>
            </View>
          </View>
          {/* Products on right */}
          <View style={{ justifyContent:'space-between' , padding:10, height:'100%',flex:1, flexDirection:'column', flexWrap:'wrap', alignItems:'center', backgroundColor:'#353D42',borderRadius:17}}>
            <Text style={{padding:10, color:'#fff'}}>{productItems[1].name}</Text>
            <Image  style = {{padding:10, width: 100, height: 100}} 
                    source = {{uri: productItems[1].images}}/>
            <Text style={{padding:10,color:'#fff'}}>${productItems[1].price}</Text>
            <View style={{ padding:10,flexDirection: "row" }}>
              <Button primary transparent
                  onPress={()=>this.props.addProduct(productItems[1].id)}
                  >
                <Text style={{color:'#fff'}}>+</Text>
              </Button>
              <Badge primary style={{marginTop:10, backgroundColor:'#FF9900'}}>
                <Text style={{color:'#fff'}}>{ this.props.product.addedProducts.hasOwnProperty(productItems[1].name)? this.props.product.addedProducts[productItems[1].name].count:0 }</Text>
              </Badge>
              <Button primary transparent
                  onPress={()=>this.props.deleteProduct(productItems[1].id)}
                  >
                <Text style={{color:'#fff'}}>-</Text>
              </Button>
            </View>
          </View>
        </View>
      )
    }
    return(
      <ScrollView style={{marginTop:10}}>
        {sortedProductItems.map((productItems,index)=>{
          return(
          <React.Fragment key={ index }>
            {productItemComponent(productItems)}
            <View style={{backgroundColor:'#192327',flex:1, padding:5}}></View>
          </React.Fragment>)
        })}
      </ScrollView>
    )
  }

  changeCartArrowFacing(value){
    if(value === 52.57142857142857){
      this.setState((state)=>{
        return {arrowFacing:'ios-arrow-up'}
      })
    }
    else{
      this.setState((state)=>{
        return {arrowFacing:'ios-arrow-down'}
      })
    }
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
              <Icon style={{color:'#fff'}} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'#fff',fontSize:30}}>Product</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon style={{color:'#fff'}} name='notifications' />
            </Button>
          </Right>
        </Header>

        {/* Content Component */}
        <Content padder>
          <View style={{flex:1, flexDirection:'row', padding:5}}>
            <Text style={{color:'#ff9900'}}>Product </Text>
            <Text style={{color:'#fff'}}>/ Items</Text>
          </View>
          {/* all products render here */}
          {this.renderProducts(sortedProductItems)}
        </Content>

        {/* Footer Component */}
        <Footer style={{backgroundColor:'#ff9900'}}>
          <FooterTab>
            <Body>
              <SlidingUpPanel ref={c => this._panel = c}
                                    draggableRange={{top:height/1.1, bottom: height/14 }}
                                    animatedValue={this._draggedValue}
                                    showBackdrop={false}
                                    onMomentumDragEnd={(value)=>this.changeCartArrowFacing(value)}
                                    onDragEnd={(value)=>this.changeCartArrowFacing(value)}
                      >
                <View style={styles.panel}>
                  <View style={styles.panelHeader}>
                    <Icon style={{color:'#fff'}} name={this.state.arrowFacing}/>
                    <Text style={{color:'#fff'}}>Product Cart</Text>
                  </View>
                  <View style={styles.footercontainer}>
                    <Cart item={this.props.product.addedProducts}/>
                  </View>
                </View>
              </SlidingUpPanel>
            </Body>
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
  footercontainer:{
    flex:1,
    backgroundColor:'#ff9900',
    margin:30
  },
  panel:{
    flex:1,
    backgroundColor:'#ff9900',
    position:'relative'
  },
  panelHeader:{
    backgroundColor:'#ff9900',
    alignItems:'center',
    justifyContent:'center'
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductItems)
