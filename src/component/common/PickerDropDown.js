import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import {Picker} from '@react-native-picker/picker';
import CustomeIcon from './CustomeIcon';
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
      <Text style={styles.labelStyle}>
        {title}
      </Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.pickerStyle}
          enabled={enabled || disabled}>
          <Picker.Item
            key={'noKey'}
            label={label}
            style={styles.PickerItemStyle}
            value={false}
          />
          {items.map((value, idx) => {
            return (
              <Picker.Item
                key={idx}
                label={value.label}
                value={value.value}
                style={styles.PickerItemStyle}
              />
            );
          })}
        </Picker>
        <View
          style={
            props.isFromOrders
              ? styles.withoutBGiconWrapper
              : styles.iconWrapper
          }>
          <CustomeIcon
            name={'arrow-drop-down-line'}
            size={Dimension.font26}
            color={colors.FontColor}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: Dimension.font10,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
  },
  starIcon: {
    color: colors.BrandColor,
    fontSize: Dimension.font10,

    fontFamily: Dimension.CustomMediumFont,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.FontColor,
    padding: 1,
    position: 'relative',
    marginBottom:Dimension.margin15
  },
  pickerStyle: {
    backgroundColor: colors.WhiteColor,
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontWeight: 'normal',
    fontFamily: Dimension.CustomRegularFont,
    //height:40

  },
  iconWrapper: {
    position: 'absolute',
    width: Dimension.width24,
    height: Dimension.height24,
    right: Dimension.padding10,
    top: Dimension.padding10,
    backgroundColor: colors.WhiteColor,
  },
  PickerItemStyle: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontWeight: 'normal',
    fontFamily: Dimension.CustomRegularFont,
  },
  labelStyle: {
    fontSize: Dimension.font10,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
    fontWeight: 'normal',
  },
  withoutborderPicker: {
    position: 'relative',
    paddingTop: Dimension.padding8,
  },
  withoutBGPickerStyle: {},
  withoutBGiconWrapper: {
    position: 'absolute',
    width: Dimension.width24,
    height: Dimension.height24,
    right: -Dimension.padding18,
    top: Dimension.padding6,
  },
});

export default PickerDropDown;
