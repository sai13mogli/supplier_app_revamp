import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CustomeIcon from './CustomeIcon';
import DropDownModal from '../DropDownModal';

const DropDown = props => {
  const {
    items,
    title,
    selectedValue,
    placeholder,
    onValueChange,
    enabled,
    showError,
    errorMessage,
    fromRejectModal,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const getTitle = () => {
    return (items.find(_ => _.value == selectedValue) || {}).label;
  };

  return (
    <View
      style={{
        marginBottom: props.isFromOrders ? 0 : Dimension.margin20,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.labelStyle}>{props.label}</Text>
        {props.isImp ? <Text style={styles.starIcon}>*</Text> : null}
      </View>
      <TouchableOpacity
        disabled={!enabled}
        style={
          props.isFromOrders 
          ? styles.withoutborderPicker 
          : !enabled
          ? styles.DisabledpickerWrapper
          : styles.pickerWrapper
        }
        onPress={() => setIsVisible(true)}>
        <View
          style={
            props.isFromOrders
              ? styles.withoutBGPickerStyle
              : !enabled
              ? styles.disabledpickerStyle
              : styles.pickerStyle
          }>
          <Text
            style={[
              {
                color: '#000',
                fontSize: 14,
                fontFamily: Dimension.CustomRegularFont,
              },
              styles.PickerItemStyle,
            ]}>
            {getTitle() || selectedValue || placeholder}
          </Text>
        </View>

        {/* <Picker
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
        </Picker> */}
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
      </TouchableOpacity>
      {showError ? <Text style={styles.starIcon}>{errorMessage}</Text> : null}
      {isVisible && (
        <DropDownModal
          visible={isVisible}
          closeModal={() => setIsVisible(false)}
          onSelect={val => {
            onValueChange(val);
            setIsVisible(false);
          }}
          title={title}
          items={items}
          selectedValue={selectedValue}
          fromRejectModal={fromRejectModal}
        />
      )}
    </View>
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
    padding: Dimension.padding10,
    position: 'relative',
  },
  DisabledpickerWrapper: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.FontColor,
    padding: Dimension.padding10,
    position: 'relative',
    backgroundColor:colors.DisableStateColor,
  },
  pickerStyle: {
    backgroundColor: colors.WhiteColor,
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontWeight: 'normal',
    fontFamily: Dimension.CustomRegularFont,
  },
  disabledpickerStyle: {
    backgroundColor: colors.DisableStateColor,
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontWeight: 'normal',
    fontFamily: Dimension.CustomRegularFont,
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
export default DropDown;
