import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NftScreen from '../nfts/nftScreen';
import NftSearch from '../nfts/nftsSearch'
const Stack = createStackNavigator();

export default function NftNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Nft"
        component={NftScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NftSearch"
        component={NftSearch}
      />
    </Stack.Navigator>
  );
}
