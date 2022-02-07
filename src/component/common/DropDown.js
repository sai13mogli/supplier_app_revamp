import React from 'react';
  import {Picker} from '@react-native-picker/picker';
import Dimension from "../../Theme/Dimension";
import colors from "../../Theme/Colors"
import {StyleSheet,View} from 'react-native';
import CustomeIcon from './CustomeIcon';
const DropDown = props => {
  const {items, selectedValue, placeholder, onValueChange, enabled} = props;
  return (
    <View style={styles.pickerWrapper}>
    <Picker
      mode="dropdown"
      note
      selectedValue={selectedValue}
      placeholder={placeholder}
      onValueChange={onValueChange}
      style={styles.pickerStyle}
      itemStyle={styles.PickerItemStyle}
      
      enabled={enabled}>
      <Picker.Item
        key={'noKey'}
        label={placeholder}
         style={styles.PickerItemStyle} 
        value={''}
        fontFamily={Dimension.CustomRegularFont}
      />
      {items.map((item, itemKey) => (
        <Picker.Item
          key={itemKey}
          label={item.label}
          style={styles.PickerItemStyle} //to be added
          value={item.value}
          fontFamily={Dimension.CustomRegularFont}
        />
      ))}
      
    </Picker>
    <View style={styles.iconWrapper}>
    <CustomeIcon name={'arrow-drop-down-line'} size={Dimension.font26} color={colors.FontColor} />
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pickerWrapper:{
    borderWidth:1,
    borderRadius:4,
    borderColor:colors.FontColor,
    padding:1,
    position:"relative"
  },
  pickerStyle:{
    backgroundColor:colors.WhiteColor,
    fontSize:Dimension.font14,
    color:colors.FontColor,
    fontWeight:"normal",
    fontFamily:Dimension.CustomRegularFont,
  
  },
  iconWrapper:{
    position:"absolute",
    width:Dimension.width24,
    height:Dimension.height24,
    right:Dimension.padding10,
    top:Dimension.padding10,
    backgroundColor:colors.WhiteColor
  },
  PickerItemStyle:{
    fontSize:Dimension.font14,
    color:colors.FontColor,
    fontWeight:"normal",
    fontFamily:Dimension.CustomRegularFont,

    
  },
  

});
export default DropDown;
