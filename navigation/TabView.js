import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import Animated from 'react-native-reanimated';
import TabBarIndicator from "./TabBarIndicator";

export default (props) => {
  const { navigationState, navigation, position } = props;
  const inputRange = navigationState.routes.map((x, i) => i);
  const outputRange = inputRange.map(inputIdx => inputIdx === navigationState.index ? 16 : 14);
  const fontSize = Animated.interpolate(position, { inputRange, outputRange });
  const getLabelText = ({ route }) => {
    const label = props.getLabelText({ route });
    return ({ focused, tintColor }) => (
      <Animated.Text
        style={[styles.label, props.labelStyle, { width: '100%', color: tintColor, fontSize: focused ? fontSize : 14 }]}
        allowFontScaling={props.allowFontScaling}
      >
        {props.upperCaseLabel ? label.toUpperCase() : label}
      </Animated.Text>

    );
  };

  return <MaterialTopTabBar renderIndicator={indicatorProps => <TabBarIndicator {...indicatorProps}/>} {...props} getLabelText={getLabelText} />
};

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    fontSize: 13,
    margin: 4,
    backgroundColor: 'transparent',
  }
});
