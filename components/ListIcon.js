import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from './Icon';

/**
 * A component to show an icon in a list item.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { List, Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <List.Icon color={Colors.blue500} icon="folder" />
 * );
 *
 * export default MyComponent;
 * ```
 */
const ListIcon = ({ icon, style, size = 24, ...rest }) => {
  return (
    <View style={[styles.item, style]} pointerEvents="box-none">
      <Icon subset={icon.subset} color={icon.color} name={icon.name} size={size} {...rest} />
    </View>
  );
};

ListIcon.propTypes = {
  /**
   * Icon to show.
   */
  icon: PropTypes.object.isRequired,
};

export default ListIcon;

const styles = StyleSheet.create({
  item: {
    margin: 8,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
