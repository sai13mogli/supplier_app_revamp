import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Input, Icon} from 'react-native-elements';

const FloatingLabelInputField = props => {
  const [isFocused, setIsFocused] = useState(false);

  let inputRef = useRef();
  const handleFocus = () => {
    setIsFocused(true);
    if (props.handleFocus) {
      props.handleFocus();
    }
  };

  useEffect(() => {
    handleBlur();
    if (props.autoFocus) {
      handleFocus();
    }
  }, []);

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

  return (
    <TouchableOpacity activeOpacity={1}>
      <View>
        {props.disabled ? (
          <Text>{props.value}</Text>
        ) : (
          <Input
            {...props}
            rightIcon={props.extraView ? props.extraView() : null}
            underlineColorAndroid={'transparent'}
            selectionColor={'#3c3c3c'}
            onFocus={handleFocus}
            onBlur={() => handleBlur(true)}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default FloatingLabelInputField;
