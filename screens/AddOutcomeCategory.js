import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, Modal, Portal, IconButton, FAB, List, Surface, Chip } from 'react-native-paper';
import i18n from 'i18n-js';

const AddOutcomeCategory = () => {
  const [visible, setVisible] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  return (
    <>
      <FAB style={styles.fab} small icon="plus" onPress={() => setVisible(true)} />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{ ...StyleSheet.absoluteFillObject }}>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <KeyboardAvoidingView
              behavior="height"
              enabled
              style={{ justifyContent: 'center', ...StyleSheet.absoluteFillObject }}>
              <List.Item
                style={{ backgroundColor: 'white' }}
                titleStyle={{ width: 0 }}
                left={() => (
                  <IconButton
                    color="#000"
                    icon="folder"
                    onPress={() => {
                      if (!showIcons) Keyboard.dismiss();
                      setShowIcons(!showIcons);
                    }}
                  />
                )}
                right={() => (
                  <TextInput
                    style={{ flex: 999, backgroundColor: 'transparent' }}
                    placeholder={i18n.t('forms.addOutcome.category.name')}
                    value={categoryName}
                    onChangeText={text => setCategoryName(text)}
                    onFocus={() => setShowIcons(false)}
                  />
                )}
              />

              {showIcons && (
                <Surface style={styles.surface}>
                  <View style={styles.row}>
                    <Chip
                      icon="information"
                      mode="outlined"
                      style={styles.chip}
                      onPress={() => console.log('Pressed')}
                    />
                    <Chip icon="heart" mode="outlined" style={styles.chip} onPress={() => console.log('Pressed')} />
                    <Chip icon="camera" mode="outlined" style={styles.chip} onPress={() => console.log('Pressed')} />
                  </View>
                  <View style={styles.row}>
                    <IconButton icon="information" color={'red'} size={20} onPress={() => console.log('Pressed')} />
                    <IconButton icon="heart" color={'red'} size={20} onPress={() => console.log('Pressed')} />
                    <IconButton icon="camera" color={'red'} size={20} onPress={() => console.log('Pressed')} />
                  </View>
                </Surface>
              )}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Modal>
      </Portal>
    </>
  );
};

export default AddOutcomeCategory;

const styles = StyleSheet.create({
  surface: {
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  chip: {
    margin: 4,
  },
});
