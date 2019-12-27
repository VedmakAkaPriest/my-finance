import React from 'react';
import { ScrollView, FlatList } from 'react-native';
import { withTheme, shadow, overlay } from 'react-native-paper';

const makeSurfaceScroll = ComponentClass => {
  function wrapper(props) {
    const { style, theme, ...rest } = props;
    const flattenedStyles = StyleSheet.flatten(style) || {};
    const { elevation = 4 } = flattenedStyles;
    const { dark: isDarkTheme, mode, colors } = theme;
    return (
      <ComponentClass
        {...rest}
        style={[
          {
            backgroundColor: isDarkTheme && mode === 'adaptive' ? overlay(elevation, colors.surface) : colors.surface,
          },
          elevation && shadow(elevation),
          style,
        ]}
      />
    );
  }

  wrapper.displayName = `Surface${ComponentClass.displayName}`;
  return wrapper;
};

export const SurfaceScrollView = withTheme(makeSurfaceScroll(ScrollView));
export const SurfaceFlatList = withTheme(makeSurfaceScroll(FlatList));
