import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import i18n from 'i18n-js';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import OutcomeScreen from '../screens/outcome/OutcomeScreen';
import CurrentPeriodHeader from '../components/CurrentPeriodHeader';
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
  tabBarLabel: i18n.t('tabs.balance'),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: i18n.t('tabs.income'),
};

LinksStack.path = '';

const OutcomeStack = createStackNavigator(
  {
    Settings: OutcomeScreen,
  },
  config
);

OutcomeStack.navigationOptions = {
  tabBarLabel: i18n.t('tabs.outcome'),
};

OutcomeStack.path = '';

const tabNavigator = createMaterialTopTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack: OutcomeStack,
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
