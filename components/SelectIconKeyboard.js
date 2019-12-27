import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Text } from 'react-native';
import { Button, Surface, TouchableRipple } from 'react-native-paper';
import { noop } from 'lodash';
import MaskedView from './MaskedView';
import Layout from '../constants/Layout';
import glyphs from '../constants/IconSet';
import ColorPicker from './ColorPicker';
import { CategoryIcon } from '../stores/OutcomeCategory';

const ICON_SIZE = 24;
const BUTTON_SIZE = { width: ICON_SIZE + 1, height: ICON_SIZE + 3 };

const styles = StyleSheet.create({
  container: {
    height: (BUTTON_SIZE.height + /* margin */ 10 * 2) * /* rows */ 4,
  },
  mask: {
    // flex: 1,
    // flexDirection: 'row',
    height: '100%',
    width: Layout.window.width,
    // flexWrap: 'wrap',
    // alignItems: 'flex-start',
    // justifyContent: 'space-around',
  },
  surface: {
    height: '100%',
    width: Layout.window.width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  slider: { width: Layout.window.width },
  icon: {
    margin: 10,
    backgroundColor: 'transparent',
    color: 'rgba(0,0,0,1)',
    lineHeight: ICON_SIZE,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  touchable: {
    margin: 10,
    backgroundColor: 'transparent',
    ...BUTTON_SIZE,
  },
});

const IconsPageMask = React.memo(({ data }) => (
  <View style={[styles.surface, { borderWidth: 0, borderColor: 'black' }]}>
    {data.map(pageData => (
      <pageData.subset key={pageData.key} name={pageData.name} size={ICON_SIZE} style={styles.icon} />
    ))}
  </View>
));

const IconsPageTouches = React.memo(({ data, onPress }) => (
  <>
    {data.map(pageData => (
      <TouchableRipple
        key={pageData.key}
        style={styles.touchable}
        borderless
        underlayColor="rgba(0,0,0,0.9)"
        rippleColor="rgba(0,0,0,0.9)"
        onPress={onPress(pageData.key)}>
        <View />
      </TouchableRipple>
    ))}
  </>
));

const SelectIconKeyboard = ({ icon, onSelect }) => {
  const [color, setColor] = useState(icon?.color || '#BEC6C6');
  const ref = useRef(null);

  const selectIcon = useCallback(
    key => () => {
      const [subset, name] = key.split('|||');
      ref.current.toggle(true);
      onSelect && onSelect(CategoryIcon.create({ subset, name, color }));
    },
    [ref, onSelect]
  );

  const updateColor = useCallback(newColor => {
    icon?.setColor(newColor);
    setColor(newColor);
  });

  return (
    <>
      <ColorPicker onValueChange={updateColor} color={color} ref={ref} />
      <Surface style={styles.container}>
        <FlatList
          data={glyphs}
          renderItem={({ item }) => (
            <MaskedView style={styles.mask} maskElement={<IconsPageMask data={item.data} />}>
              <View style={[styles.surface, { backgroundColor: color }]}>
                <IconsPageTouches data={item.data} onPress={selectIcon} />
              </View>
            </MaskedView>
          )}
          horizontal
          pagingEnabled
        />
      </Surface>
    </>
  );
};

export default React.memo(SelectIconKeyboard);
