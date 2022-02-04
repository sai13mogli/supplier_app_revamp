import React, {useState} from 'react';
import {View, Button, Platform,Text, TouchableHighlight} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const CustomeDatePicker = props => {

 const {
    onChange,
    value,
    onPress,
    show,
    mode,
    display
  } = props;

  return (
    <View>
      <TouchableHighlight 
        style={styles.dateView}
        onPress={onPress} 
      > 
     <View style={styles.wrap}>
     <Text style={styles.dateText}>4/02/22</Text>
     <Icon name="calendar-check-o" size={25}
      style={styles.date} />
     </View>
     
     
      </TouchableHighlight>
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode={mode}
          is24Hour={true}
          display={display}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default CustomeDatePicker;

/*Created by Aakash*/