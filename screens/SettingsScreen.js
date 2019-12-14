import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { List } from 'react-native-paper';
import outcomeRawData, { categoriesFromOutcome, daysInMonth } from '../fakeData/outcome';
import { unzip } from 'lodash';

const PriceItem = ({ ellipsizeMode, color, fontSize, price }) => (<Text ellipsizeMode={ellipsizeMode} style={{ color, fontSize }}>{price}</Text>);
const example = (
  <List.Section>
    <List.Item
      title="First Item"
      description={(textStyle) => (<View><PriceItem {...textStyle} price={123.56}/></View>)}
      left={() => <List.Icon icon="folder" />}
    >
      <Text>111111</Text>
      <Text>333333</Text>
    </List.Item>
    <List.Item
      title="Second Item"
      left={() => <List.Icon color="#000" icon="folder" />}
    />
  </List.Section>
);

const DayOutcomeList = ({ dayOutcome}) => (
  <FlatList data={dayOutcome} renderItem={({ item }) => (
    <List.Item
      title={item.title}
      left={() => <List.Icon color="#000" icon="folder" />}
      description={(textStyle) => (<View><PriceItem {...textStyle} price={item.price}/></View>)}
      right={() => <Text style={{}}>{item.price}</Text>}
    />
  )}/>
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
  const screenWidth = Math.round(Dimensions.get('window').width);

  return (
    <FlatList data={outcomePerDay}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
      <View style={{ width: screenWidth }}>
        <Text>{item.date.format('dddd, DD.MM')}</Text>
        <DayOutcomeList dayOutcome={item.data}/>
      </View>
    )} />
  );
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
