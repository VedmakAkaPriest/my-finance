import React from 'react';
import { StyleSheet, I18nManager, StyleProp, ViewStyle } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { memoize, values } from 'lodash';

const { interpolate, multiply, Extrapolate } = Animated;

export default class TabBarIndicator extends React.Component {
  componentDidMount() {
    this.fadeInIndicator();
  }

  componentDidUpdate() {
    this.fadeInIndicator();
  }

  fadeInIndicator = () => {
    const { navigationState, layout, width, getTabWidth } = this.props;

    if (
      !this.isIndicatorShown &&
      width === 'auto' &&
      layout.width &&
      // We should fade-in the indicator when we have widths for all the tab items
      navigationState.routes.every((_, i) => getTabWidth(i))
    ) {
      this.isIndicatorShown = true;

      Animated.timing(this.opacity, {
        duration: 150,
        toValue: 1,
        easing: Easing.in(Easing.linear),
      }).start();
    }
  };

  isIndicatorShown = false;

  opacity = new Animated.Value(this.props.width === 'auto' ? 0 : 1);

  getTranslateX = memoize(
    (
      position,
      routes,
      getTabWidth
    ) => {
      const inputRange = routes.map((_, i) => i);

      // every index contains widths at all previous indices
      const outputRange = routes.reduce((acc, _, i) => {
        if (i === 0) return [0];
        return [...acc, acc[i - 1] + getTabWidth(i - 1)];
      }, []);

      const translateX = interpolate(position, {
        inputRange,
        outputRange,
        extrapolate: Extrapolate.CLAMP,
      });

      return multiply(translateX, I18nManager.isRTL ? -1 : 1);
    },
    values
  );

  getWidth = memoize(
    (
      position: Animated.Node,
      routes,
      getTabWidth
    ) => {
      const inputRange = routes.map((_, i) => i);
      const outputRange = inputRange.map(getTabWidth);

      return interpolate(position, {
        inputRange,
        outputRange,
        extrapolate: Extrapolate.CLAMP,
      });
    },
    values
  );

  render() {
    const {
      position,
      navigationState,
      getTabWidth,
      width,
      style,
      layout,
    } = this.props;
    const { routes } = navigationState;

    const translateX =
      routes.length > 1 ? this.getTranslateX(position, routes, getTabWidth) : 0;

    const indicatorWidth =
      width === 'auto'
        ? routes.length > 1
        ? this.getWidth(position, routes, getTabWidth)
        : getTabWidth(0)
        : width;

    return (
      <Animated.View
        style={[
          styles.indicator,
          // If layout is not available, use `left` property for positioning the indicator
          // This avoids rendering delay until we are able to calculate translateX
          { width: indicatorWidth },
          layout.width
            ? { transform: [{ translateX }] }
            : { left: `${(100 / routes.length) * navigationState.index}%` },
          width === 'auto' ? { opacity: this.opacity } : null,
          style,
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: '100%',

    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
    borderColor: '#571d99',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});
