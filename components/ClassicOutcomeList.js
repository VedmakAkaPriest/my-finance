import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import {DataTable} from "react-native-paper";
import outcomeRawData, { categoriesFromOutcome, daysInMonth } from 'fakeData/outcome';

const MonthView = ({ style, data }) => (
  <FlatList style={style}
            data={data}
            renderItem={({ item: { title } }) => <View style={{ borderWidth: 1, padding: 4, }}><Text>{title}</Text></View>}
            keyExtractor={item => item.id}
            horizontal
            ListHeaderComponent={<View style={{ borderWidth: 1, padding: 4, backgroundColor: 'yellow' }}><Text>{'HEADER'}</Text></View>}
  />
)

const DayOfMonthView = ({ item: { date } }) => (
  <DataTable.Title style={{ borderWidth: 1, padding: 4, width: 75, flex: 0, height: 40, backgroundColor: 'yellow', justifyContent: 'center' }}>{date && date.format('ddd, Do')}</DataTable.Title>
);
const DayDataView = ({ item }) => <DataTable.Cell numeric style={{ borderWidth: 1, padding: 4, width: 75, flex: 0, height: 40 }}>{`${item}`}</DataTable.Cell>;
const CategoryOfDataView = ({ item }) => <DataTable.Cell style={{ borderWidth: 1, padding: 4, width: 75, flex: 0, height: 40, backgroundColor: 'yellow' }}>{`${item}`}</DataTable.Cell>;

const _bordered = { borderWidth: 1, padding: 2 };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
  },
  mainContainerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  _bordered,
});

const ClassicOutcomeList = () => {
  const days = daysInMonth(new Date());
  const categories = categoriesFromOutcome(outcomeRawData);

  return (
    <View style={styles.mainContainerRow}>
      <View style={styles._bordered}>
        <CategoryOfDataView item={''}/>
        {categories.map(data => <CategoryOfDataView item={data} key={data}/>)}
      </View>
      <ScrollView style={styles.container} horizontal>
        <FlatList style={[styles._bordered, { }]}
                  data={outcomeRawData.map((data, idx) => ({ data, id: `${idx}` }))}
                  renderItem={({ item: { data } }) =>
                    <View style={styles.mainContainerRow}>
                      {data.slice(1).map((date, idx) => <DayDataView item={data[idx+1]} key={`${idx}`} />)}
                    </View>
                  }
                  stickyHeaderIndices={[0]}
                  keyExtractor={item => item.id}
                  ListHeaderComponent={<View style={styles.mainContainerRow}>
                    { days.map(date => <DayOfMonthView item={{date}} key={date.unix()} />) }
                  </View>}
        />
      </ScrollView>
    </View>
  );
};

export default ClassicOutcomeList;
