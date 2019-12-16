import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CurrentPeriodHeader from '../components/CurrentPeriodHeader';
import Strings from '../constants/Strings';
import TabView from './TabView';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: { headerMode: 'none' },
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: Strings.tabs.balance,
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: Strings.tabs.income,
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: Strings.tabs.outcome,
};

SettingsStack.path = '';

const tabNavigator = createMaterialTopTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack,
  },
  {
    swipeEnabled: true,
    navigationOptions: {
      header: () => <CurrentPeriodHeader />,
    },
    tabBarComponent: TabView,
    tabBarOptions: {
      style: {
        backgroundColor: '#9b59b6',
      },
      labelStyle: {
        fontFamily: 'space-mono',
        fontSize: 14,
        fontWeight: '900',
      },
    },
  }
);

tabNavigator.path = '';

export default createStackNavigator(
  {
    Tabs: tabNavigator,
  },
  {}
);
