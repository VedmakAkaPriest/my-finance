import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Text, FAB } from 'react-native-paper';
import { unzip } from 'lodash';
import Layout from '../constants/Layout';
import outcomeRawData, { daysInMonth } from '../fakeData/outcome';
import AddOutcomeCategory from './AddOutcomeCategory';

const PriceItem = ({ ellipsizeMode, color, fontSize, price }) => (
  <Text ellipsizeMode={ellipsizeMode} style={{ color, fontSize }}>
    {price}
  </Text>
);

const DayOutcomeList = ({ dayOutcome }) => (
  <FlatList
    data={dayOutcome}
    renderItem={({ item }) => (
      <List.Item
        title={item.title}
        left={() => <List.Icon color="#000" icon="folder" />}
        description={textStyle => (
          <View>
            <PriceItem {...textStyle} price={item.price} />
          </View>
        )}
        right={() => <Text style={{}}>{item.price}</Text>}
      />
    )}
  />
);

export default function OutcomeScreen() {
  const outcomeColumns = unzip(outcomeRawData);
  const categories = outcomeColumns.shift();
  const days = daysInMonth(new Date());
  const outcomePerDay = days.map((date, idx) => ({
    key: `${date.unix()}`,
    date,
    data: categories.map((category, row) => ({ key: category, title: category, price: outcomeColumns[idx][row] })),
  }));

  return (
    <>
      <FlatList
        data={outcomePerDay}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ width: Layout.window.width }}>
            <Text>{item.date.format('dddd, DD.MM')}</Text>
            <DayOutcomeList dayOutcome={item.data} />
          </View>
        )}
      />
      <AddOutcomeCategory />
    </>
  );
}

OutcomeScreen.navigationOptions = {
  title: 'app.json',
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
