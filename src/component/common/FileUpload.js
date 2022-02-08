import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
import CustomeIcon from './CustomeIcon';

const FileUpload = props => {
  return (
    <View>
      {/* {props.disabled ? (
        <Text style={styles.labelStyle}>{props.value}</Text>
      ) : (
        
        <Input
          {...props}
          rightIcon={props.extraView ? props.extraView() : null}
          // rightIcon={
          //   <CustomeIcon
          //     name={'upload'}
          //     size={Dimension.font20}
          //     color={colors.BrandColor}
          //   />
          // }
          underlineColorAndroid={'transparent'}
          selectionColor={'#3c3c3c'}
          containerStyle={styles.WrapperStyle}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          rightIconContainerStyle={styles.iconStyle}
          errorStyle={styles.errorText}
          disabledInputStyle={styles.disabledInputStyle}
        />
      )} */}
      <TouchableOpacity style={styles.inputContainerStyle}>
        <Text  style={styles.placeholderCss}>Tap to upload</Text>
        <View style={{flexDirection:"row"}}>
        <Text  style={styles.inputStyle}>FIle Name</Text>
        <CustomeIcon
          name={'close'}
          size={Dimension.font20}
          color={colors.FontColor}
         />


        </View>
        <CustomeIcon
          name={'upload'}
          size={Dimension.font20}
          color={colors.BrandColor}
         />
         {/* <CustomeIcon
          name={'eye-open'}
          size={Dimension.font20}
          color={colors.eyeIcon}
         /> */}
      </TouchableOpacity>
    </View>
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
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:Dimension.margin10,
    backgroundColor:colors.WhiteColor,
    textAlignVertical:'center',
    paddingVertical:Dimension.padding12
    

  },
  placeholderCss:{
    fontSize: Dimension.font14,
    color: colors.placeholderColor,
    fontFamily: Dimension.CustomMediumFont,
    
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
export default FileUpload;
