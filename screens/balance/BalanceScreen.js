import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer, useObserver } from 'mobx-react-lite';
import { clone, applySnapshot, getSnapshot } from 'mobx-state-tree';
import moment from 'moment';
import Dinero from 'dinero.js';
import { List, Text, FAB } from 'react-native-paper';
import Layout from '../../constants/Layout';
import { useStores } from '../../stores/hooks';
function BalanceScreen() {
  return (
    <>
      {' '}
      <View style={{ width: Layout.window.width }}>
        {' '}
        <Text>Not implemented yet.</Text>{' '}
      </View>{' '}
    </>
  );
}
export default observer(BalanceScreen);
const styles = StyleSheet.create({});
