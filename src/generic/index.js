
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Dimension from '../Theme/Dimension';
import colors from "../Theme/Colors";
import CustomeIcon from '../component/common/CustomeIcon';









export const toastConfig = {
 
  success: ({text1, text2, onPress, ...rest}) => (
    <View style={styles.successView}>
      <Text style={styles.successText}>{text2}</Text>
      <CustomeIcon name={'close'} size={Dimension.font16} color={colors.WhiteColor}></CustomeIcon>

    </View>
  ),
  error: ({text1, text2, onPress, ...rest}) => (
    <View style={styles.errorView}>
      <Text style={styles.errorText}>{text2}</Text>
      <CustomeIcon name={'close'} size={Dimension.font16} color={colors.WhiteColor}></CustomeIcon>

    </View>
  ),
};

const styles = StyleSheet.create({
  
  successText: {
    color: '#fff',
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomRegularFont,
    marginRight:Dimension.margin15
  },
  errorText: {
    color: '#fff',
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomRegularFont,
    marginRight:Dimension.margin15
  },
  successView: {
    //height: 53,
    width: '85%',
    backgroundColor: 'rgba(0,0,0,.7)',
    borderRadius: 4,
    paddingHorizontal:Dimension.padding15,
    paddingVertical:Dimension.padding10,
    borderLeftColor:colors.SuccessStateColor,
    borderLeftWidth:7,
    flexDirection:"row",
    justifyContent:"space-between"
  },
  errorView: {
    //height: 53,
    width: '85%',
    backgroundColor: 'rgba(0,0,0,.7)',
    borderRadius: 4,
    paddingHorizontal:Dimension.padding15,
    paddingVertical:Dimension.padding10,
    borderLeftColor:colors.BrandColor,
    borderLeftWidth:7,
    flexDirection:"row",
    justifyContent:"space-between"

  },
});
