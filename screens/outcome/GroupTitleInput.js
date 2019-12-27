import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextInput } from 'react-native-paper';
import { Keyboard, StyleSheet, View } from 'react-native';
import i18n from 'i18n-js';

const styles = StyleSheet.create({
  input: { backgroundColor: 'transparent', flex: 1 },
});

const GroupTitleInput = ({ defaultValue, value, onChangeText, ...props }) => {
  const [undoAvailable, showUndo] = useState(false);
  const changeGroupTitle = text => {
    showUndo(defaultValue !== text);
    onChangeText?.(text);
  };

  return (
    <>
      <TextInput
        dense
        autoCorrect={false}
        style={styles.input}
        placeholder={i18n.t('forms.addOutcome.category.name')}
        value={value}
        onChangeText={changeGroupTitle}
        {...props}
      />
      <IconButton
        color={undoAvailable ? 'grey' : 'transparent'}
        animated
        icon="undo-variant"
        disabled={!undoAvailable}
        onPress={() => changeGroupTitle(defaultValue)}
      />
    </>
  );
};

GroupTitleInput.propTypes = {
  ...TextInput.propTypes,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default GroupTitleInput;
