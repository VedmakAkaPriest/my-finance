import React from 'react';
import { KeyboardAvoidingView, LayoutAnimation } from 'react-native';

class KeyboardAwareView extends KeyboardAvoidingView {
  _onKeyboardChange = event => {
    if (event === null) {
      this.setState({ bottom: 0 });
      return;
    }

    const {
      duration,
      easing,
      endCoordinates,
      startCoordinates: { screenX, screenY },
    } = event;
    const height = this._relativeKeyboardHeight(endCoordinates);

    if (this.state.bottom === height || (endCoordinates.screenX === screenX && endCoordinates.screenY === screenY)) {
      return;
    }

    if (duration && easing) {
      LayoutAnimation.configureNext({
        // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
        duration: duration > 10 ? duration : 10,
        update: {
          duration: duration > 10 ? duration : 10,
          type: LayoutAnimation.Types[easing] || 'keyboard',
        },
      });
    }
    this.setState({ bottom: height });
  };
}

export default KeyboardAwareView;
