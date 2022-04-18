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
import { Input } from 'react-native-elements';
import CustomeIcon from '../CustomeIcon';
import styles from './styles';

const CustomeDatePicker = props => {
  const {
    onChange,
    onPress,
    display,
    label,
    title,
    isImp,
    value,
    activeFilter,
    fromCategoryBrand,
    fileUpload,
  } = props;
  console.log('expiryDate', value);
  const [date, setDate] = useState(new Date());
  const [isFocused, setIsFocused] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState(value || 'Select Date');

  const onchangeDate = (event, selectedDate) => {
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

  useEffect(() => {
    if (activeFilter) {
      setText(value);
    }
  }, [activeFilter]);

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

  const renderDateTimePicker = () => {
    return (
      <>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.labelStyle}>{label}</Text>
          {isImp ? <Text style={styles.starIcon}>*</Text> : null}
        </View>

        <View>
          <TouchableOpacity
            style={styles.inputContainerStyle}
            onPress={showDatepicker}>
            <Text style={styles.placeholderCss}>{text || 'Select Date'}</Text>
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

  if (fromCategoryBrand) {
    if (fileUpload == 3) {
      return renderDateTimePicker();
    } else {
      return null;
    }
  } else {
    return renderDateTimePicker();
  }
};

export default CustomeDatePicker;
