import { createAppContainer, DrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import  Home from './Home';
import ProductItems from './ProductItems';
import Cart from './Cart';
import { StyleSheet } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

const CartStack = createStackNavigator(
    {
        CartStack:{ screen : Cart },
    },
    {
        navigationOptions: ()=>({
            title: `Cart`,
            headerTitle:`Cart`
        })
    }
);

const ProductItemStack = createStackNavigator(
    {
        ProductItemsStack: { screen : ProductItems },
    },
    {
        navigationOptions:({navigation})=>({
            headerTitle:`Products`,
            headerLeft: (
                <Icon 
                    style={{ paddingLeft: 10 }} 
                    onPress={() => navigation.openDrawer()} 
                    name="md-menu" 
                    size={30} 
                    />
            )
        })
    }
);

const ProductStack = createStackNavigator(
    {
        ProductItems: { screen : ProductItemStack },
        Cart:{ screen: CartStack },
        // Drawer:{ screen: Drawer } Work on future
    }
);

const HomeStack = createStackNavigator({
    Home: { screen: Home },
    //MainStack:{screen: MainStack},
});

const  Drawer = createDrawerNavigator({
    Home:{ screen : HomeStack },
    Products:{ screen: ProductStack}
});

const AppNavigator = createAppContainer(Drawer);
export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});