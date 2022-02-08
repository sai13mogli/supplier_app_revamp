import React from "react";
import {View,StyleSheet} from "react-native";
import { CheckBox, Icon } from 'react-native-elements';
import Dimension from "../../../Theme/Dimension";
import colors from "../../../Theme/Colors"

import CustomeIcon from '../CustomeIcon';
//import styles from './styles';

const Checkbox = props => { 
  const {
    onPress,
    checked,
  } = props;

  return (
  
        <CheckBox
          checked={checked}
          onPress={onPress}
          checkedIcon={<CustomeIcon name={'checkbox-tick'} size={Dimension.font20} color={colors.BrandColor} />}
          uncheckedIcon={<CustomeIcon name={'checkbox-blank'} size={Dimension.font20} color={colors.FontColor} />}
          
          textStyle={styles.checkboxTitle}
          fontFamily={Dimension.CustomMediumFont}
          wrapperStyle={styles.checkboxwrapper}
          containerStyle={styles.checkboxContainer}

        />
      
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
export default Checkbox;

/* Created By Aakash  -------*/