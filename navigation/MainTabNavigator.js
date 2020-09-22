import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import i18n from 'i18n-js';

import BalanceScreen from '../screens/balance/BalanceScreen';
import OutcomeScreen from '../screens/outcome/OutcomeScreen';
import IncomeScreen from '../screens/income/IncomeScreen';
import CurrentPeriodHeader from '../components/CurrentPeriodHeader';
import TabView from './TabView';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: { headerMode: 'none' },
});

const IncomeStack = createStackNavigator(
  {
    Income: IncomeScreen,
  },
  config
);

IncomeStack.navigationOptions = {
  tabBarLabel: i18n.t('tabs.income'),
};

IncomeStack.path = '';

const BalanceStack = createStackNavigator(
  {
    Balance: BalanceScreen,
  },
  config
);

BalanceStack.navigationOptions = {
  tabBarLabel: i18n.t('tabs.balance'),
};

BalanceStack.path = '';

const OutcomeStack = createStackNavigator(
  {
    Outcome: OutcomeScreen,
  },
  config
);

OutcomeStack.navigationOptions = {
  tabBarLabel: i18n.t('tabs.outcome'),
};

OutcomeStack.path = '';

const tabNavigator = createMaterialTopTabNavigator(
  {
    BalanceStack,
    IncomeStack,
    OutcomeStack,
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
