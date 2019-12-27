import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Dinero from 'dinero.js';
import { StyleSheet, TextInput as NativeTextInput, View } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  inputContainer: { backgroundColor: 'transparent', height: 45, flex: 1 },
  text: {
    marginRight: 20,
    lineHeight: 45,
    textAlign: 'right',
  },
  input: { width: '100%', position: 'absolute', color: 'transparent' },
});

const PriceItemInput = observer(({ priceItem, children, ...rest }) => {
  const [price, setPrice] = useState(Dinero({ amount: priceItem.price }));
  const onUpdate = text => {
    const digitsOnly = text.match(/\d+/g);
    const parsedValue = Dinero({ amount: digitsOnly ? parseInt(digitsOnly.join('')) : 0 });
    setPrice(parsedValue);
    priceItem.setPrice(parsedValue.getAmount());
  };
  return (
    <View style={styles.container}>
      {children}
      <TextInput
        dense
        caretHidden
        autoCorrect={false}
        clearButtonMode="always"
        keyboardType="number-pad"
        style={styles.inputContainer}
        value={`${price.getAmount()}`}
        {...rest}
        onChangeText={onUpdate}
        render={props => (
          <>
            <Text style={[props.style, styles.text]}>{price.toFormat()}</Text>
            <NativeTextInput {...props} style={[props.style, styles.input]} />
          </>
        )}
      />
    </View>
  );
});

PriceItemInput.propTypes = {
  priceItem: PropTypes.object.isRequired,
};

export default PriceItemInput;
