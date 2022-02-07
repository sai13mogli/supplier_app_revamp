import React from "react";
import {View } from "react-native";
import { CheckBox, Icon } from 'react-native-elements';
import styles from './styles';

const Checkbox = props => {
  
  const {
    onPress,
    checked,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={checked}
          onPress={onPress}
          style={styles.checkbox}
        />
      </View>
    </View>
  );
};

export default Checkbox;

/* Created By Aakash  -------*/