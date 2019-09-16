import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Home';
import ProductItems from './ProductItems';

const AppStack = createStackNavigator({
    Home: { screen : Home },
    ProductItems: { screen : ProductItems },
});

const AppNavigator = createAppContainer(AppStack);
export default AppNavigator;