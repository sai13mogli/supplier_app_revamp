import React, {useState} from 'react';
import {View,TextInput,ScrollView} from "react-native";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const MultiSelect = props => {


  const {
    blurOnSubmit,
    onChangeText,
    value,
    placeholder,
    placeholderTextColor
  } = props;

  return (
    <View style={styles.container}>
       <TextInput
            style={styles.inputField}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            value={value}
            blurOnSubmit={blurOnSubmit}
            placeholder={placeholder}>
       </TextInput>
            <MaterialCommunityIcon
              name="magnify"
              style={styles.magnifyIcon}
            />
           <ScrollView>
           </ScrollView>  
    </View>
  );
};

export default MultiSelect;

/* Created By Aakash  */