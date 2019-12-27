import React, { useState, useRef, useLayoutEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { HueSlider, LightnessSlider, SaturationSlider } from 'react-native-color';
import * as Device from 'expo-device';
import { throttle, once } from 'lodash';
import tinycolor from 'tinycolor2';
import { Transitioning, Transition } from 'react-native-reanimated';

import Layout from '../constants/Layout';
import { withTheme } from 'react-native-paper';

const throttleTimeout =
  Device.deviceYearClass < 2014
    ? fn => throttle(fn, 100, { leading: false })
    : fn => throttle(fn, 15, { leading: false });

const styles = StyleSheet.create({
  slider: { width: Layout.window.width },
});

function ColorPicker({ style, theme, color, onValueChange }, forwardedRef) {
  const [colorHsl, setColorHsl] = useState(tinycolor(color).toHsl());
  const [showText, setShowText] = useState(false);
  const ref = useRef();
  forwardedRef.current = ColorPicker;

  ColorPicker.toggle = shouldHide => {
    if (typeof shouldHide === 'boolean' && shouldHide === showText) return;
    setShowText(!showText);
    ref.current.animateNextTransition();
  };

  const updateHSL = throttleTimeout(newColor => {
    setColorHsl(newColor);
    if (!showText) {
      ColorPicker.toggle();
    }
    onValueChange(tinycolor(newColor).toHexString());
  });

  const transition = (
    <Transition.Sequence>
      <Transition.In type="slide-bottom" />
      <Transition.Change interpolation="easeInOut" />
      <Transition.Out type="slide-bottom" />
    </Transition.Sequence>
  );

  return (
    <View style={{ justifyContent: 'space-around', paddingTop: 15 }}>
      <Transitioning.View
        ref={ref}
        transition={transition}
        style={{ backgroundColor: theme.colors.surface, position: 'absolute', top: -49 }}>
        {showText && (
          <View style={{ backgroundColor: theme.colors.surface }}>
            <SaturationSlider
              style={styles.slider}
              gradientSteps={20}
              value={colorHsl.s}
              color={colorHsl}
              onValueChange={s => updateHSL({ ...colorHsl, s })}
            />
            <LightnessSlider
              style={styles.slider}
              gradientSteps={20}
              value={colorHsl.l}
              color={colorHsl}
              onValueChange={l => updateHSL({ ...colorHsl, l })}
            />
          </View>
        )}
      </Transitioning.View>
      <HueSlider
        style={[styles.slider, { zIndex: 9, backgroundColor: theme.colors.surface }]}
        gradientSteps={40}
        value={colorHsl.h}
        onValueChange={h => updateHSL({ ...colorHsl, h })}
      />
    </View>
  );
}

export default withTheme(React.forwardRef(ColorPicker));
