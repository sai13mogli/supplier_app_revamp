import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import {Picker} from '@react-native-picker/picker';

const PickerDropDown = props => {
  const {
    placeholder,
    value,
    onValueChange,
    label,
    items,
    enabled,
    title,
    disabled,
  } = props;

  return (
    <>
      <Text style={{fontSize: 12, fontWeight: 'bold', color: '#000'}}>
        {title}
      </Text>
      <View style={styles.selectionWrap}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.selectionTxt}
          enabled={enabled || disabled}>
          <Picker.Item
            key={'noKey'}
            label={label}
            style={styles.selectionPopupTxt}
            value={false}
          />
          {items.map((value, idx) => {
            return (
              <Picker.Item
                key={idx}
                label={value.label}
                value={value.value}
                style={styles.selectionPopupTxt}
              />
            );
          })}
        </Picker>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  selectionTxt: {
    color: Colors.placeholderGray,
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
  },
  selectionPopup: {
    marginTop: Dimension.margin60,
  },
  selectionPopupTxt: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
    color: '#000',
  },
  selectionWrap: {
    borderWidth: 1,
    borderColor: Colors.lightGrayText,
    borderRadius: Dimension.borderRadius8,
    backgroundColor: '#fff',
    position: 'relative',
    marginBottom: Dimension.margin10,
  },
});

export default PickerDropDown;
