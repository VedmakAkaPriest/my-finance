import React from 'react';
import { observer, useObserver } from 'mobx-react-lite';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Text, FAB } from 'react-native-paper';
import moment from 'moment';
import Layout from '../constants/Layout';
import AddOutcomeCategory from './AddOutcomeCategory';
import { useStores } from '../stores/hooks';

const PriceItem = ({ ellipsizeMode, color, fontSize, price }) => (
  <Text ellipsizeMode={ellipsizeMode} style={{ color, fontSize }}>
    {price}
  </Text>
);

const DayOutcomeList = ({ dayOutcome }) => (
  <FlatList
    data={dayOutcome}
    keyExtractor={(item, idx) => `i-${item.category?.id || idx}`}
    renderItem={({ item }) => (
      <List.Item
        title={item.title}
        left={() => <List.Icon color="#000" icon={item.icon || 'comment-question-outline'} />}
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

function OutcomeScreen() {
  const { outcomeStore } = useStores();
  const m = outcomeStore.monthOutcome(new Date());

  return (
    <>
      <FlatList
        data={[...(m?.entries?.values() || [])]}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `t-${item.id}`}
        renderItem={({ item }) => (
          <View style={{ width: Layout.window.width }}>
            <Text>{moment(item.day).format('dddd, DD.MM')}</Text>
            <DayOutcomeList dayOutcome={item.entries} />
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

export default observer(OutcomeScreen);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
