import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={()=>this.props.navigation.openDrawer()} title="Open Drawer"/>
        <Text>Welcome to Market!</Text>
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

connect(mapStateToProps)(Home)
