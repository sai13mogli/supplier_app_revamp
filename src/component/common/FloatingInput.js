import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';

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
            containerStyle={styles.WrapperStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            rightIconContainerStyle={styles.iconStyle}
            errorStyle={styles.errorText}
            disabledInputStyle={styles.disabledInputStyle}
            // errorStyle={}
          />
        )}
      </View>
    </TouchableOpacity>
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

export default FloatingLabelInputField;
