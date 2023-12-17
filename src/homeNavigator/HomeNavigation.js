import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Home from '../home/home';
import Seacrh from '../home/seacrh';
import CoinDetial from '../home/coinDetial'
const Stack = createStackNavigator();

export default function HomeNavigation({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Seacrh') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="home"
        component={Home}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="CoinDetial"
        component={CoinDetial}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Seacrh"
        component={Seacrh}
      />
    </Stack.Navigator>
  );
}
