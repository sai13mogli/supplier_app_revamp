import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';


const MultiSelectInput = props => {
  const getText = selectedValue => {
    if (selectedValue.length == 1) {
      return selectedValue[0].label;
    } else {
      return `${selectedValue[0].label}, +${selectedValue.length - 1} more`;
    }
  };

  const {
    value,
    placeHolder,
    onPress,
    isImp,
    label,
    rightComponentText,
    rightComponent,
  } = props;

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.labelStyle}>{label}</Text>
        {isImp ? <Text style={styles.starIcon}>*</Text> : null}
      </View>
      <View style={styles.inputContainerStyle}>
        <Text style={styles.inputStyle}>
          {value && value.length ? getText(value) : placeHolder}
        </Text>
        {rightComponent ? (
          rightComponent()
        ) : (
          <TouchableOpacity onPress={onPress} style={styles.addbtn}>
            <Text style={styles.addBtnTxt}>
              {rightComponentText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default MultiSelectInput;

const styles = StyleSheet.create({
  addbtn:{
borderRadius:4,
paddingHorizontal:Dimension.padding15,
paddingVertical:Dimension.padding8,
backgroundColor:Colors.LightBrandColor
  },
  addBtnTxt:{
    fontSize: Dimension.font12,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  inputStyle: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,

    paddingLeft: 0,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: Colors.FontColor,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Dimension.padding12,
    height: Dimension.height40,
    paddingBottom: 0,
    marginBottom:Dimension.margin20
  },
  labelStyle: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
  },
  starIcon: {
    color: Colors.BrandColor,
    fontSize: Dimension.font10,

    fontFamily: Dimension.CustomMediumFont,
  },
});
