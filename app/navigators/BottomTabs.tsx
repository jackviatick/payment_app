import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from 'screens/Home';
import Card from 'screens/Card';
import Payment from 'screens/Payment';
import Notification from 'screens/Notification';
import Setting from 'screens/Setting';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from 'constant/colors';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Card"
        component={Card}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="wallet-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={Payment}
        options={{
          tabBarIcon: () => (
            <View
              style={{
                position: 'absolute',
                bottom: 20, // space from bottombar
                height: 58,
                width: 58,
                borderRadius: 58,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons
                name="md-camera-reverse-outline"
                color={colors.white}
                size={35}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="notifications-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="settings-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabs;
