import React, {useState} from 'react';
import {Text} from 'react-native';
import CustomButton from '../../component/common/Button';
import DropDown from '../../component/common/DropDown';
import CustomeIcon from '../../component/common/CustomeIcon';
import Checkbox from '../../component/common/Checkbox/index';
import CustomeDatePicker from '../../component/common/Datepicker/index';

const OrdersScreen = () => {
  const [gender, setGender] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = value => {
    setGender(value);
  };

  const onchangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  
  const onCheckAction = value => {
    setSelection(value);
  };

   const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


 

  return (
    <>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
        OrdersScreen
      </Text>

      {/* Exampe for CustomButton Component */}
      <CustomButton
        title={'Hello'}
        buttonColor={'dodgerblue'}
        iconName={'user'}
        icon={() => <CustomeIcon name={'add-box'} size={22} />}
        showIcon
        iconColor={'#fff'}
        iconType={'font-awesome'}
        onPress={() => alert('running')}
      />
      {/* End */}

      {/* Example for Dropdown Component */}
      <DropDown
        // enabled={false}
        placeholder={'Gender'}
        items={[
          {label: 'Male', value: 'M'},
          {label: 'Female', value: 'F'},
        ]}
        selectedValue={gender}
        onValueChange={onChange}
      />
      {/* End */}
      
       {/* Example for DatePicker Component */}
       
      <CustomeDatePicker
        onChange={onchangeDate}
        onPress={showDatepicker}
        display={'default'}
        mode={mode}
      />
      {/* Example for CheckBox Component */}
       <Checkbox
        value={isSelected}
        onValueChange={onCheckAction}
       />
    </>
  );
};

export default OrdersScreen;
