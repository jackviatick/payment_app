import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeTabs from './BottomTabs';

export type NavigatorParamList = {
  Home: undefined;
  Card: undefined;
  Notification: undefined;
  Setting: undefined;
  Payment: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const SCREENS = {
  Home: {
    name: 'Home',
    component: HomeTabs,
  },
};

export const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home">
    {(Object.keys(SCREENS) as (keyof typeof SCREENS)[]).map(screen => (
      <Stack.Screen
        key={screen}
        name={screen}
        getComponent={() => SCREENS[screen].component}
      />
    ))}
  </Stack.Navigator>
);
