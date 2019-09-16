import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View , Button } from 'react-native';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*<Text> {this.props.products.addedProductItem.length} Products added</Text>*/}
        <Button
            title ="View Products"
            onPress ={() => this.props.navigation.navigate('ProductItems')}
        />
      </View>
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

const mapStateToProps=(state) => {
    const { products } = state
    return { products }
};

export default connect(mapStateToProps)(Home)
