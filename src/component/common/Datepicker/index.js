import React, {useState} from 'react';
import {View, Button, Platform,Text, TouchableHighlight} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/'+ tempDate.getFullYear();
    setText(fDate)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

 const {
    onChange,
    onPress,
    display
  } = props;

  return (
    <View>
      <TouchableHighlight 
        style={styles.dateView}
        onPress={showDatepicker} 
      > 
     <View style={styles.wrap}>
     <Text style={styles.dateText}>{text}</Text>
     <Icon name="calendar-check-o" size={25}
      style={styles.date} />
     </View>
     </TouchableHighlight>
      
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
  );
};

export default CustomeDatePicker;

/*Created by Aakash*/