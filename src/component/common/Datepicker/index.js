import React, {useState} from 'react';
import {View, Button, Platform,Text, TouchableOpacity,StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimension from "../../../Theme/Dimension";
import colors from "../../../Theme/Colors"

import CustomeIcon from '../CustomeIcon';
//import styles from './styles';

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
      <TouchableOpacity 
        style={styles.inputContainerStyle}
        onPress={showDatepicker} 
      > 
    
     <Text style={styles.placeholderCss}>{text}</Text>
     <CustomeIcon name={'calendar'} size={Dimension.font20} color={colors.FontColor} />
     
     
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
  );
};
const styles = StyleSheet.create({
  WrapperStyle: {
    marginBottom: Dimension.margin10,
    paddingHorizontal: 0,
  },

  inputContainerStyle: {
    borderWidth: 1,
    borderColor: colors.FontColor,
    borderRadius: 4,
    paddingHorizontal: Dimension.padding12,
    height: Dimension.height40,
    paddingBottom: 0,
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:Dimension.margin10,
    backgroundColor:colors.WhiteColor,
    textAlignVertical:'center',
    paddingVertical:Dimension.padding12
    

  },
  placeholderCss:{
    fontSize: Dimension.font14,
    color: colors.placeholderColor,
    fontFamily: Dimension.CustomMediumFont,
    
  },
  labelStyle: {
    fontSize: Dimension.font10,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
    fontWeight: 'normal',
  },
  inputStyle: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,

    paddingLeft: 0,
  },
  iconStyle: {
    width: Dimension.width24,
    height: Dimension.height24,
    paddingRight: 0,
  },
  errorText: {
    fontSize: Dimension.font10,
    color: colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  disabledInputStyle: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,

    paddingLeft: 0,
    backgroundColor: colors.DisableStateColor,
  },
});
export default CustomeDatePicker;

/*Created by Aakash*/