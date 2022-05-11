import React, { useEffect, useState } from 'react';
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
import { Input, } from 'react-native-elements';
import CustomeIcon from '../CustomeIcon';
import styles from './styles';

const CustomeDatePicker = props => {
  const { display, value, activeFilter, maxdate } = props;
  const [date, setDate] = useState(new Date());
  const [isFocused, setIsFocused] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Select Date');

  const onchangeDate = (event, selectedDate) => {
    console.log('event', event);
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    if (event.type != 'dismissed') {
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
    }
  };

  useEffect(() => {
    handleBlur();
    if (props.autoFocus) {
      handleFocus();
    }
  }, []);

  // useEffect(() => {
  //   if (activeFilter) {
  //     setText(value);
  //   }
  // }, [activeFilter]);

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (props.handleFocus) {
      props.handleFocus();
    }
  };

  const handleBlur = runOnBlur => {
    if (props.hideLabel) {
      setIsFocused(true);
    } else {
      if (!props.value) {
        setIsFocused(false);
      } else {
        setIsFocused(true);
      }
    }
    if (props.onBlur && runOnBlur) {
      props.onBlur();
    }
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <>
      <TouchableOpacity
        onPress={showDatepicker}>
        <View style={{ flexDirection: "row" }}>
          <Input
            {...props}
            label={() => (
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.labelStyle}>{props.label}</Text>
                {props.isImp ? <Text style={styles.starIcon}>*</Text> : null}
              </View>
            )}
            editable={false}
            selectionColor={'#3c3c3c'}
            disabled={props.disabled}
            onFocus={handleFocus}
            onBlur={() => handleBlur(true)}
            containerStyle={styles.WrapperStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            errorStyle={styles.errorText}
            disabledInputStyle={styles.disabledInputStyle}
            errorMessage={props.showError ? props.errorMessage : null}
            rightIcon={<CustomeIcon
              name={'calendar'}
              size={Dimension.font20}
              color={colors.FontColor}
            />}
            rightIconContainerStyle={
              styles.iconStyle
            }
          />
          {/* <View style={{ flexDirection: "row" }}>
            <Text style={styles.placeholderCss}>{text || 'Select Date'}</Text>

          </View> */}
        </View>


      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          maximumDate={maxdate}
          is24Hour={true}
          display={display}
          onChange={onchangeDate}
        />
      )}

    </>
  );
};

export default CustomeDatePicker;

/*Created by Aakash*/