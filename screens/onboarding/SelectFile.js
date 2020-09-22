import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Text, View, List } from 'react-native-paper';
import GDriveStore from '../../stores/GoogleDrive';

const SelectFile = ({onSelect}) => {
    const files = GDriveStore.files;
    return (
        <FlatList
    data={files.entries}
    renderItem={({ item }) => (
      <List.Item
        title={item.name}
        onPress={ () => onSelect(item.id) }
      />
    )}
  />
    )
}

export default SelectFile

const styles = StyleSheet.create({})
