import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { TextInput, Modal, Portal, Surface } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { HueSlider } from 'react-native-color';
import tinycolor from 'tinycolor2';
import i18n from 'i18n-js';

import categories, { CategoryIcon } from '../../stores/OutcomeCategory';
import SuggestionAccessoryView from '../../components/SuggestionAccessoryView';
import GroupTitleInput from './GroupTitleInput';
import PriceListEdit from './PriceListEdit';
import KeyboardAwareView from '../../components/KeyboardAwareView';
import Layout from '../../constants/Layout';
import SelectIconKeyboard from '../../components/SelectIconKeyboard';
import { Transition, Transitioning } from 'react-native-reanimated';
import * as VectorIcons from '@expo/vector-icons';
import IconButton from '../../components/IconButton';
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

const iconSet = ['information', 'heart', 'camera'];

const GroupIcon = observer(({ icon, ...props }) => (
  <IconButton icon={{ name: icon.name, color: icon.color, subset: icon.subset }} {...props} />
));

const defaultIcon = CategoryIcon.create({
  subset: 'MaterialCommunityIcons',
  name: 'comment-question-outline',
  color: '#BEC6C6',
});

const AddOutcomeCategory = ({ editItem, onDismiss }) => {
  if (!editItem) return null;
  const [showIcons, setShowIcons] = useState(false);
  const [categoryName, setCategoryName] = useState(editItem.category?.title || '');
  const [categoryIcon, setCategoryIcon] = useState(editItem.category?.icon || defaultIcon);
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
                  <View style={[styles.surface, { flexDirection: 'row', backgroundColor: 'white' }]}>
                    <GroupIcon icon={categoryIcon} onPress={() => setShowIcons(!showIcons)} />
                    <GroupTitleInput
                      defaultValue={editItem.category?.title || ''}
                      value={categoryName}
                      onChangeText={setCategoryName}
                      inputAccessoryViewID="inputGroupSuggests"
                      onFocus={() => {
                        setShowIcons(false);
                        setShowSuggests(true);
                      }}
                      onBlur={() => setShowSuggests(false)}
                    />
                  </View>
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

          {showIcons && <SelectIconKeyboard icon={categoryIcon} onSelect={setCategoryIcon} />}
        </Transitioning.View>
      </Modal>
    </Portal>
  );
};

export default AddOutcomeCategory;
