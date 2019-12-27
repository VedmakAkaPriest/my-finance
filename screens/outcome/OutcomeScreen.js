import React, { useState } from 'react';
import { observer, useObserver } from 'mobx-react-lite';
import { clone, applySnapshot, getSnapshot } from 'mobx-state-tree';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Text, FAB } from 'react-native-paper';
import moment from 'moment';
import Dinero from 'dinero.js';
import Layout from '../../constants/Layout';
import AddOutcomeCategory from './AddOutcomeCategory';
import { useStores } from '../../stores/hooks';
import { OutcomeGroupEntry, OutcomeDaily } from '../../stores/Outcome';
import ListIcon from '../../components/ListIcon';

const PriceItem = ({ ellipsizeMode, color, fontSize, price }) => (
  <Text ellipsizeMode={ellipsizeMode} style={{ color, fontSize }}>
    {Dinero({ amount: price }).toFormat()}
  </Text>
);

const DayOutcomeList = ({ dayOutcome, onEditItem }) => (
  <FlatList
    data={dayOutcome}
    keyExtractor={(item, idx) => `i-${item.category?.id || idx}`}
    renderItem={({ item }) => (
      <List.Item
        title={item.title}
        left={() => <ListIcon icon={item.category.icon || { name: 'comment-question-outline', color: '#000' }} />}
        description={textStyle => (
          <View>
            {item?.items.map((priceItem, idx) => (
              <PriceItem {...textStyle} price={priceItem.price} key={`${idx}`} />
            ))}
          </View>
        )}
        right={() => <Text style={{ padding: 8 }}>{Dinero({ amount: item.price }).toFormat()}</Text>}
        onPress={() => onEditItem(item)}
      />
    )}
  />
);

function OutcomeScreen() {
  const { outcomeStore } = useStores();
  const currentDay = moment();
  const [editItem, setEditItem] = useState(null);
  const [editDay, setEditDay] = useState(null);
  const monthOutcome = outcomeStore.monthOutcome(currentDay);

  const changeCurrentDay = ({ nativeEvent }) => {
    let contentOffset = nativeEvent.contentOffset;
    let viewSize = nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    currentDay.date(pageNum + 1);
    console.log('scrolled to page ', pageNum);
  };
  const startEditing = group => {
    setEditItem(group ? clone(group) : OutcomeGroupEntry.create({}));
  };
  const doneEditing = item => {
    if (item.date) {
      const recent = monthOutcome.entries.get(item.date.valueOf());
      const target = recent.entries.find(group => group.category === item.category);
      applySnapshot(target, getSnapshot(item));
    } else {
      console.log('item = ', item);
    }
    setEditItem(null);
  };

  return (
    <>
      <FlatList
        data={monthOutcome?.values()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        windowSize={7}
        getItemLayout={(data, index) => ({ length: Layout.window.width, offset: Layout.window.width * index, index })}
        initialScrollIndex={currentDay.date() - 1}
        onMomentumScrollEnd={changeCurrentDay}
        keyExtractor={item => `t-${item.id}`}
        renderItem={({ item }) => (
          <View style={{ width: Layout.window.width }}>
            <Text>{moment(item.day).format('dddd, DD.MM')}</Text>
            <DayOutcomeList dayOutcome={item.entries} onEditItem={group => startEditing(group)} />
          </View>
        )}
      />
      <AddOutcomeCategory editItem={editItem} onDismiss={doneEditing} />
      <FAB style={styles.fab} small icon="plus" onPress={() => startEditing()} />
    </>
  );
}

OutcomeScreen.navigationOptions = {
  title: 'app.json',
};

export default observer(OutcomeScreen);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
