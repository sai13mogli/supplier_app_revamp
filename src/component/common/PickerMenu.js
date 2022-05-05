import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import CustomeIcon from '../../component/common/CustomeIcon';

const PickerMenu = props => {
  const {options, onValueChange, selectedValue} = props;
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  return (
    <Menu
      visible={visible}
      anchor={
        <TouchableOpacity onPress={showMenu} style={styles.dropDownBtn}>
          <Text style={styles.qtVal}>{selectedValue}</Text>
          <CustomeIcon
            name="arrow_down"
            size={24}
            color={'#3c3c3c'}></CustomeIcon>
        </TouchableOpacity>
      }
      onRequestClose={hideMenu}>
      {options.map((item, itemIndex) => (
        <MenuItem
          onPress={() => {
            onValueChange(item.value, item.label);
            hideMenu();
          }}
          textStyle={styles.dropdownval}>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

const styles = StyleSheet.create({
  dropDownBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.lightBlue,
    paddingHorizontal: Dimension.padding5,
    paddingVertical: Dimension.padding3,
    borderRadius: 6,
    width: Dimension.width60,
    justifyContent: 'space-between',

    marginTop: Dimension.margin5,
  },
  dropDownWrap: {
    position: 'absolute',
    top: 40,
    left: 0,
    zIndex: 9999999999999,
    borderWidth: 1,
    borderColor: colors.ProductBorderColor,
    borderRadius: 4,
    backgroundColor: '#fff',
    width: Dimension.width80,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  dropdownval: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.PrimaryTextColor,
    padding: Dimension.padding8,
    borderBottomColor: colors.ProductBorderColor,
    borderBottomWidth: 1,
  },
  Adddropdownval: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.PrimaryTextColor,
    padding: Dimension.padding8,
  },
  qtTitle: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.PrimaryTextColor,
    padding: Dimension.padding8,
  },
  qtVal: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.PrimaryTextColor,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingLeft: Dimension.padding5,
  },
});

export default PickerMenu;
