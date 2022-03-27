import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, ScrollView, FlatList } from "react-native";
import CustomeIcon from '../../component/common/CustomeIcon';
import Dimension from "../../Theme/Dimension";
import colors from "../../Theme/Colors"
import DotCheckbox from './Checkbox';

import CustomButton from '../common/Button';
import { filtersTypeData, filtersData } from '../../redux/constants/support';

const AddressesModal = props => {

  const [loading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const {
    onPress,
    onClose,
    visible,
    dataList,
    transparent,
  } = props;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={transparent}
        visible={props.visible}
        hasBackdrop={true}
        backdropOpacity={0.4}
        onRequestClose={onClose}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#0000004D',
          }}>
          <View
            style={{
              height: '60%',
              marginTop: 'auto',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              padding: 10,
              backgroundColor: 'white',
            }}>
            <View style={styles.crossView}>
              <Text style={styles.AddressType}>Year {global.year}</Text>

              <TouchableOpacity
                onPress={onPress}
              >
                <CustomeIcon name={'right-tick-line'} color={colors.SuccessStateColor} size={Dimension.font20}></CustomeIcon>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.ContainerCss}>
              <View style={styles.sectionView}>
                <Text>
                  {props.filterListData}
                </Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.bottombtnWrap}>
            <CustomButton
              buttonColor={colors.BrandColor}
              borderColor={colors.BrandColor}
              TextColor={colors.WhiteColor}
              TextFontSize={Dimension.font16}
              title={'Next'}
              loading={loading}
              onPress={onPress}
            />
          </View>
        </View>
      </Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  RightInnerPart: {
    paddingLeft: Dimension.padding30,
    marginBottom: Dimension.padding30
  },
  Separater: {
    height: 0.8,
    backgroundColor: '#e0e0e0',
    marginTop: 5,
  },
  radioText: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  warp: {
    flexDirection: 'row'
  },
  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: colors.grayShade2,
    borderTopWidth: 1,
    backgroundColor: colors.WhiteColor
  },
  sectionView: {
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 0.9
  },
  crossView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ContainerCss: {
    backgroundColor: colors.WhiteColor,
    paddingHorizontal: Dimension.padding15,
    paddingVertical: Dimension.padding35
  },
  AddressType: {
    color: 'black',
    fontSize: Dimension.font18,
    fontFamily: Dimension.CustomRobotoBold
  }

});

export default AddressesModal;

/* Created By Aakash  -------*/