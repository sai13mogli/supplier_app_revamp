import React, {useState} from 'react';
import {
  View,
  Button,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimension from '../../../Theme/Dimension';
import colors from '../../../Theme/Colors';

import CustomeIcon from '../CustomeIcon';
import styles from './styles';

const CustomeDatePicker = props => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Select Date');

  const onchangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getFullYear();
    props.onChange(fDate);
    setText(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const {onChange, onPress, display, label, title, isImp} = props;

  return (
    <>
      <Text style={{color: '#000'}}>{label}</Text>
      {isImp ? <Text style={{color: 'red'}}>*</Text> : null}
      <View>
        <TouchableOpacity
          style={styles.inputContainerStyle}
          onPress={showDatepicker}>
          <Text style={styles.placeholderCss}>{text}</Text>
          <CustomeIcon
            name={'calendar'}
            size={Dimension.font20}
            color={colors.FontColor}
          />
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display={display}
            onChange={onchangeDate}
          />
        )}
      </View>
    </>
  );
};

export default CustomeDatePicker;

/*Created by Aakash*/
