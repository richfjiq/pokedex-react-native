import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigator } from './Navigator';
import Icon from 'react-native-vector-icons/Ionicons';

import { Platform } from 'react-native';
import { colors } from '../theme/colors';
import { Tab2Screen } from './Tab2';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: colors.white,
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.purple,
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 10,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Navigator}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => (
            <Icon color={color} size={25} name="list-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={Tab2Screen}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => (
            <Icon color={color} size={25} name="search-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
