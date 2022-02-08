import React from "react";
import {View } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';

const Checkbox = props => { 
  const {
    onValueChange,
    value,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={value}
          onValueChange={onValueChange}
          style={styles.checkbox}
        />
      </View>
    </View>
  );
};

export default Checkbox;

/* Created By Aakash  -------*/