import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import Dimension from "../../Theme/Dimension";
import colors from "../../Theme/Colors"
import {StyleSheet} from 'react-native';
import CustomeIcon from './CustomeIcon';
const DotCheckbox = props => {
  const {inputDetails, onCheck, toggleCheck, value} = props;

  return (
    <>
      {(inputDetails || []).map((_, i) => (
        <CheckBox
          title={_.title}
          onPress={() => onCheck(_.title)}
          checkedIcon={<CustomeIcon name={'radio-fill'} size={Dimension.font20} color={colors.BrandColor} />}
          uncheckedIcon={<CustomeIcon name={'radio-blank'} size={Dimension.font20} color={colors.FontColor} />}
          checked={_.title == value ? true : false}
          textStyle={styles.checkboxTitle}
          fontFamily={Dimension.CustomMediumFont}
          wrapperStyle={styles.checkboxwrapper}
          containerStyle={styles.checkboxContainer}
        />
      ))}
    </>
  );
};
const styles = StyleSheet.create({
  checkboxTitle:{
    fontSize:Dimension.font12,
    color:colors.FontColor,
    fontWeight:"normal",
    marginLeft:Dimension.margin5,
  },
  checkboxwrapper:{
    backgroundColor:colors.transparent,
    
  },
  checkboxContainer:{
    backgroundColor:colors.transparent,
    paddingVertical:0,
    paddingHorizontal:0,
    borderWidth:0,
    borderColor:colors.WhiteColor,
    width:"auto"
  },

});

export default DotCheckbox;