import React from 'react';
import PropTypes from 'prop-types';
import { InputAccessoryView, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { noop } from 'lodash';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  chip: {
    margin: 4,
  },
  tiny: {
    marginVertical: 2,
    marginRight: 2,
    marginLeft: 2,
    minHeight: 19,
    lineHeight: 19,
  },
});

const KeyValueExtractor = item => [item.id, item.title];

const SuggestionAccessoryView = ({
  suggests = [],
  keyValueExtractor = KeyValueExtractor,
  onPress = noop,
  nativeID = 'inputAccessoryViewID',
}) => {
  return (
    <View
      nativeID={nativeID}
      backgroundColor="#fffffff7"
      style={{ flex: 0, position: 'absolute', bottom: 0, width: '100%' }}>
      <ScrollView
        persistentScrollbar={true}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.row}
        style={{ height: 65 }}>
        {suggests.map(item => {
          const [id, title] = keyValueExtractor(item);
          return (
            <Chip key={id} mode="outlined" onPress={() => onPress(item)} style={styles.chip} textStyle={styles.tiny}>
              {title}
            </Chip>
          );
        })}
      </ScrollView>
    </View>
  );
};

SuggestionAccessoryView.propTypes = {
  suggests: PropTypes.array,
  keyValueExtractor: PropTypes.func,
  onPress: PropTypes.func,
  nativeID: PropTypes.string,
};

export default SuggestionAccessoryView;
