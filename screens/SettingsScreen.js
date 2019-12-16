import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { unzip } from 'lodash';
import Layout from '../constants/Layout';
import outcomeRawData, { daysInMonth } from '../fakeData/outcome';

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

export default function SettingsScreen() {
  const outcomeColumns = unzip(outcomeRawData);
  const categories = outcomeColumns.shift();
  const days = daysInMonth(new Date());
  const outcomePerDay = days.map((date, idx) => ({
    key: `${date.unix()}`,
    date,
    data: categories.map((category, row) => ({ key: category, title: category, price: outcomeColumns[idx][row] })),
  }));

  return (
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
  );
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
