import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { observer, useObserver } from 'mobx-react-lite';
import { clone, applySnapshot, getSnapshot } from 'mobx-state-tree';
import moment from 'moment';
import Dinero from 'dinero.js';
import { List, Text, FAB } from 'react-native-paper';
import Layout from '../../constants/Layout';
import { useStores } from '../../stores/hooks';
import { IncomeEntry } from '../../stores/Income';
import ListIcon from '../../components/ListIcon';
import AddIncome from './AddIncome';
const PriceItem = ({ ellipsizeMode, color, fontSize, price }) => (
  <Text ellipsizeMode={ellipsizeMode} style={{ color, fontSize }}>
    {' '}
    {Dinero({ amount: price }).toFormat()}{' '}
  </Text>
);
const DayIncomeList = ({ monthIncome, onEditItem }) => (
  <FlatList
    data={monthIncome?.entries}
    keyExtractor={(item, idx) => `i-${item.description || idx}`}
    renderItem={({ item }) => (
      <List.Item
        title={item.description}
        left={() => <ListIcon icon={item.icon || { name: 'comment-question-outline', color: '#000' }} />}
        right={() => <Text style={{ padding: 8 }}>{Dinero({ amount: item.amount }).toFormat()}</Text>}
        onPress={() => onEditItem(item)}
      />
    )}
  />
);
function IncomeScreen() {
  const { incomeStore } = useStores();
  const monthIncome = incomeStore.monthIncome(moment());
  const [editItem, setEditItem] = useState(null);
  const startEditing = entry => {
    setEditItem(entry ? clone(entry) : IncomeEntry.create({}));
  };
  const doneEditing = item => {
    if (item.date) {
      const recent = monthIncome.entries.get(item.date.valueOf());
      const target = recent.entries.find(group => group.category === item.category);
      applySnapshot(target, getSnapshot(item));
    } else {
      console.log('item = ', item);
    }
    setEditItem(null);
  };
  return (
    <>
      {' '}
      <View style={{ width: Layout.window.width }}>
        {' '}
        <Text>{moment(monthIncome?.month).format('MM.YYYY')}</Text>{' '}
        <DayIncomeList monthIncome={monthIncome} onEditItem={group => startEditing(group)} />{' '}
      </View>{' '}
      <AddIncome editItem={editItem} onDismiss={doneEditing} />{' '}
      <FAB style={styles.fab} small icon="plus" onPress={() => startEditing()} />{' '}
    </>
  );
}
export default observer(IncomeScreen);
const styles = StyleSheet.create({ fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 } });
