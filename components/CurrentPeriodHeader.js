import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'react-native';
import { Appbar, Button, Text, Modal, Portal } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const years = new Array(20).fill().map((_, idx) => `${2010+idx}`);

const ModalDatepicker = ({ date: initialDate }) => {
  const [showDatepicker, toggleDatepicker] = useState(false);
  const [date, setDate] = useState(moment(initialDate));
  const [month, setMonth] = useState(moment(date).month());
  const [year, setYear] = useState(moment(date).year());
  const months = moment.months();

  return (
    <Button mode="text" onPress={() => toggleDatepicker(true)}>
      <Text style={{ color: '#ecf0f1', fontSize: 16}}>
        {date.format('MMMM YYYY')}
      </Text>
      <Portal>
        <Modal visible={showDatepicker} onDismiss={() => {
          toggleDatepicker(false);
          setDate(moment(date).year(year).month(month))
        }} contentContainerStyle={{ flexDirection: 'row', paddingHorizontal: 20 }}>
          <Picker
            selectedValue={month}
            style={{ backgroundColor: '#fefefe', width: '60%' }}
            onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}
            itemStyle={{ textAlign: 'right' }}>
            {months.map((label, idx) => <Picker.Item key={label} label={label} value={idx} />)}
          </Picker>
          <Picker selectedValue={year}
                  style={{ backgroundColor: '#fefefe', width: '40%' }}
                  onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
                  itemStyle={{ marginLeft: -15 }}>
            {years.map((label, idx) => <Picker.Item key={label} label={label} value={+label} />)}
          </Picker>
        </Modal>
      </Portal>
    </Button>
  );
};

CurrentPeriodHeader.propTypes = {

};

function CurrentPeriodHeader() {
  return (
    <Appbar.Header style={{ flex: 1, justifyContent: 'space-around', backgroundColor: '#735184' }}>
      <Appbar.Action icon={props => <Ionicons name='ios-arrow-back' {...props} />} color={'#ecf0f1'} size={20} onPress={() => {}} />
      <ModalDatepicker />
      <Appbar.Action icon={props => <Ionicons name='ios-arrow-forward' {...props} />} color={'#ecf0f1'} size={20} onPress={() => {}} />
    </Appbar.Header>
  );
}

export default CurrentPeriodHeader;
