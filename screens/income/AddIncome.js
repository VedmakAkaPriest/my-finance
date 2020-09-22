import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { TextInput, Modal, Portal, Surface } from 'react-native-paper';
import i18n from 'i18n-js';

import categories, { CategoryIcon } from '../../stores/OutcomeCategory';
import SuggestionAccessoryView from '../../components/SuggestionAccessoryView';
import PriceListEdit from '../outcome/PriceListEdit';
import KeyboardAwareView from '../../components/KeyboardAwareView';
import Layout from '../../constants/Layout';
import { Transition, Transitioning } from 'react-native-reanimated';
import { observer, useObserver } from 'mobx-react-lite';

const styles = StyleSheet.create({
  surface: {
    borderWidth: 1,
    borderRadius: 10,
  },
  surfaceContainer: {
    flexDirection: 'column',
    width: '85%',
    maxHeight: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
});

const AddIncome = ({ editItem, onDismiss }) => {
  if (!editItem) return null;
  const [categoryName, setCategoryName] = useState(editItem.category?.title || '');
  const [suggests, setSuggests] = useState([]);
  const [showSuggests, setShowSuggests] = useState(false);

  const done = useCallback(() => {
    const group = categories.findOrCreate(categoryName.trim());
    group.setIcon(categoryIcon);
    editItem.setCategory(group);
    editItem.compact();
    onDismiss(editItem);
  }, [editItem, onDismiss, categoryIcon, categoryName]);

  useEffect(() => {
    let search = categories.filter(new RegExp(`${categoryName.trim()}`, 'i'));
    setSuggests(search);
  }, [categoryName]);

  const anim = useRef(null);
  useLayoutEffect(() => {
    if (anim.current) anim.current.animateNextTransition();
    if (showIcons) Keyboard.dismiss();
  }, [showIcons, showSuggests]);

  const transition = (
    <Transition.Sequence>
      <Transition.In type="slide-bottom" />
      <Transition.Change interpolation="easeInOut" />
      <Transition.Out type="slide-bottom" />
    </Transition.Sequence>
  );

  return (
    <Portal>
      <Modal
        visible={!!editItem}
        onDismiss={done}
        contentContainerStyle={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'flex-start',
        }}>
        <Transitioning.View ref={anim} transition={transition} style={StyleSheet.absoluteFillObject}>
          <TouchableWithoutFeedback onPress={done}>
            <KeyboardAwareView behavior="height" enabled style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <Surface style={[styles.surface, styles.surfaceContainer]}>
                  <PriceListEdit editItem={editItem} />
                </Surface>
              </View>
              {showSuggests && (
                <SuggestionAccessoryView
                  nativeID="inputGroupSuggests"
                  suggests={suggests}
                  onPress={category => setCategoryName(category.title)}
                />
              )}
            </KeyboardAwareView>
          </TouchableWithoutFeedback>
        </Transitioning.View>
      </Modal>
    </Portal>
  );
};

export default AddIncome;
