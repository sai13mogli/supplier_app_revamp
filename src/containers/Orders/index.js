import React, {useState} from 'react';
import {Text,View} from 'react-native';
import styles from './style';
import Checkbox from '../../component/common/Checkbox/index';
import CustomeDatePicker from '../../component/common/Datepicker/index';

const OrdersScreen = () => {
  
  const [isSelected, setSelection] = useState(false);

  const options = [
    { label: 'Thing 1', value: 1},
    { label: 'Thing 2', value: 2},
  ];
  
 const onchangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  
  const onChange = value => {
    setSelection(value);
  };

  return (
    <View >
    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
      OrdersScreen
    </Text>
    
   <CustomeDatePicker
    onChange={onchangeDate}
   />

   
  
    <Checkbox
     value={isSelected}
     onValueChange={onChange}
    />
    </View>
  );
};

export default OrdersScreen;
