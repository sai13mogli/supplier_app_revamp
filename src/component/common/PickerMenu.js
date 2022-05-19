import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import CustomeIcon from '../../component/common/CustomeIcon';

const PickerMenu = props => {
  const {options, onValueChange, selectedValue, title, isImp, placeholder} =
    props;
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  console.log(placeholder, selectedValue);

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.labelStyle}>{title}</Text>
        {isImp ? <Text style={styles.starIcon}>*</Text> : null}
      </View>
      <Menu
        visible={visible}
        anchor={
          <TouchableOpacity onPress={showMenu} style={styles.dropDownBtn}>
            {selectedValue ? (
              <Text style={styles.qtVal}>{selectedValue}</Text>
            ) : (
              <Text style={styles.placeholderCss}>{placeholder}</Text>
            )}
            {/* <Text style={styles.qtVal}>{selectedValue || placeholder}</Text> */}
            <CustomeIcon
              name="arrow-drop-down-line"
              size={24}
              color={colors.FontColor}></CustomeIcon>
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}
        style={styles.dropDownWrap}>
        {options.map((item, itemIndex) => (
          <MenuItem
            key={`${item.label}`}
            onPress={() => {
              onValueChange(item.value, item.label);
              hideMenu();
            }}
            textStyle={styles.dropdownval}
            style={styles.dropDowninnerWrap}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
  dropDownBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.FontColor,
    paddingHorizontal: Dimension.padding5,
    paddingVertical: Dimension.padding10,
    borderRadius: 4,
    //width: Dimension.width60,
    justifyContent: 'space-between',

    //marginTop: Dimension.margin5,
    marginBottom: Dimension.margin15,
    height: Dimension.height40,
  },
  starIcon: {
    color: colors.BrandColor,
    fontSize: Dimension.font10,
    fontFamily: Dimension.CustomMediumFont,
  },
  dropDownWrap: {
    borderWidth: 1,
    borderColor: colors.eyeIcon,
    borderRadius: 4,
    backgroundColor: '#fff',
    width: '65%',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    // marginTop:Dimension.margin20
  },
  dropdownval: {
    fontSize: Dimension.font12,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    paddingLeft: Dimension.padding12,
    paddingRight: Dimension.padding12,
    borderBottomColor: colors.eyeIcon,
    borderBottomWidth: 0.5,
    width: '100%',
    paddingVertical: Dimension.padding10,
  },
  labelStyle: {
    fontSize: Dimension.font10,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
  },

  qtVal: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomRegularFont,
    color: colors.PrimaryTextColor,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingLeft: Dimension.padding10,
  },
  errorText: {
    fontSize: Dimension.font10,
    color: colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  dropDowninnerWrap: {
    width: '100%',
  },
  placeholderCss: {
    fontSize: Dimension.font14,
    color: colors.placeholderColor,
    fontFamily: Dimension.CustomMediumFont,
  },
});

export default PickerMenu;
