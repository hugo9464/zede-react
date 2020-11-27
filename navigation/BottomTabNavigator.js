import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import AntDesignIcon from '../components/icons/AntDesignIcon';
import IoniconsIcon from '../components/icons/IoniconsIcon'
import WeighingScreen from '../screens/WeighingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { Ionicons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator 
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: '#54e48c',
      }}>
      <BottomTab.Screen
        name="Weighing"
        component={WeighingScreen}
        options={{
          title: 'Pesées',
          tabBarIcon: ({ focused }) => <IoniconsIcon focused={focused} name="md-trash" />,
        }}
      />
      <BottomTab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: 'Historique',
          tabBarIcon: ({ focused }) => <AntDesignIcon focused={focused} name="linechart" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Mon compte',
          tabBarIcon: ({ focused }) => <IoniconsIcon focused={focused} name="md-contact" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Weighing':
      return 'Mes pesées';
    case 'Profile':
      return 'Mon profil';
    case 'History':
      return 'Mon historique';
  }
}
