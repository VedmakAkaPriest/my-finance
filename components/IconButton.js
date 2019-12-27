import * as React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp, GestureResponderEvent } from 'react-native';
import color from 'color';
import { TouchableRipple, withTheme } from 'react-native-paper';
import Icon from './Icon';

const IconButton = ({
  icon,
  size = 24,
  accessibilityLabel,
  disabled,
  onPress,
  animated = false,
  theme,
  style,
  ...rest
}: Props) => {
  const rippleColor = color(icon?.color || theme.colors.text)
    .alpha(0.32)
    .rgb()
    .string();
  const buttonSize = size * 1.5;
  return (
    <TouchableRipple
      borderless
      centered
      onPress={onPress}
      rippleColor={rippleColor}
      style={[
        styles.container,
        { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 },
        disabled && styles.disabled,
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
      accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
      accessibilityComponentType="button"
      accessibilityRole="button"
      accessibilityStates={disabled ? ['disabled'] : []}
      disabled={disabled}
      hitSlop={
        // @ts-ignore - this should be fixed in react-theme-providersince withTheme() is not forwarding static property types
        TouchableRipple.supported
          ? { top: 10, left: 10, bottom: 10, right: 10 }
          : { top: 6, left: 6, bottom: 6, right: 6 }
      }
      {...rest}>
      <View>
        <Icon subset={icon.subset} name={icon.name} color={icon.color} size={size} />
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  // @ts-ignore - this should be fixed in react-theme-providersince withTheme() is not forwarding static property types
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: 6,
  },
  disabled: {
    opacity: 0.32,
  },
});

export default withTheme(IconButton);
