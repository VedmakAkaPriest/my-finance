import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'react-native-paper';
import { KeyboardAvoidingView, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { observer } from 'mobx-react';
import PriceItemInput from './PriceItemInput';

const styles = StyleSheet.create({
  content: { paddingHorizontal: 10 },
  addButton: {
    flex: 1,
    alignSelf: 'center',
  },
});

const PriceListEdit = observer(({ editItem }) => {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {(editItem.items || []).map((priceItem, idx) => (
        <PriceItemInput priceItem={priceItem} key={`${idx}`} />
      ))}
      <IconButton color="#000" icon="plus-circle" onPress={() => editItem.add(0)} style={styles.addButton} />
    </ScrollView>
  );
});

PriceListEdit.propTypes = {
  editItem: PropTypes.object,
};

export default PriceListEdit;
