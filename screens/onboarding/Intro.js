import React from 'react';
import { StyleSheet, Text, View, Button, Input } from 'react-native';

const Intro = ({ onSkip, onRestore, onLink }) => {
  return (
    <View>
      <Text>
        Эту настройку можно <Button onPress={onSkip}>пропустить</Button> и выполнить позднее
      </Text>
      <Text>
        Если Вы ранее уже использовали это приложение, то можно <Button onPress={onRestore}>восстановить</Button> из
        прежней версии
      </Text>
      <Text>
        Если Вы пришли по приглашению и будете использовать общую таблицу, <Input placeholder="вставьте ссылку" onChange={onLink} />
      </Text>
      <Text>Если впервые запускаете это приложение, просто нажмите далее</Text>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({});
