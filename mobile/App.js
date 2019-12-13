import Detail from './Detail'
import Detail2 from './Detail2'
import Detail3 from './Detail3'
import Detail4 from './Detail4'
import HomeScreen from './Home'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// expo install react-navigation-stack
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Detail1: {
    screen: Detail
  },
  Detail2: {
    screen: Detail2
  },
  Detail3: {
    screen: Detail3
  },
  Detail4:{
    screen: Detail4
  }
}, {headerLayoutPreset: 'center'});

export default createAppContainer(AppNavigator);