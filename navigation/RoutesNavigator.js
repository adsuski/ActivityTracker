import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RoutesListScreen from '../screens/RoutesListScreen';
import RouteDetailScreen from '../screens/RouteDetailScreen';
import NewRouteScreen from '../screens/NewRouteScreen';
import MapScreen from '../screens/MapScreen';
import MapWithRouteScreen from '../screens/MapWithRouteScreen';

import Colors from '../constants/Colors'


const RoutesNavigator=createStackNavigator({
    Routes:RoutesListScreen,
    RouteDetail: RouteDetailScreen,
    NewRoute:NewRouteScreen,
    Map:MapScreen,
    RouteMap:MapWithRouteScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Colors.primary
        },
        headerTintColor:'white',
    }
})

export default createAppContainer(RoutesNavigator);




