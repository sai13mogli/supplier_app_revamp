import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, ScrollView, FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import CustomeIcon from '../../component/common/CustomeIcon';
import Dimension from "../../Theme/Dimension";
import colors from "../../Theme/Colors"
import DotCheckbox from './Checkbox';
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../common/Button';
import { filtersTypeData, filtersData } from '../../redux/constants/support';

const TDSEditModal = props => {
  const tdsInfoDetails = useSelector(
    state => state.profileReducer.tdsInfoDetails.data || [],
  );
  const [loading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const { navigate } = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("tdsInfoDetails===>", tdsInfoDetails);
    // setLastYearItr(tdsInfoDetails.financialYearTurnover)
  }, []);

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
              <Text style={styles.AddressType}>Year {props.header}</Text>
              <TouchableOpacity
                onPress={onPress}
              >
                <CustomeIcon name={'right-tick-line'} color={colors.SuccessStateColor} size={Dimension.font20}></CustomeIcon>
              </TouchableOpacity>
            </View>
            {/* <ScrollView style={styles.ContainerCss}>


              <ScrollView
                style={{ marginBottom: 0 }}
                showsVerticalScrollIndicator={false}>

                <View style={styles.verticalWrapper}>
                  <Text style={styles.radioText}>
                    TDS filed for AY {section.financialyear}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <DotCheckbox
                      data={EditTdsData && EditTdsData.type}
                      onCheck={getDotcheck}
                      value={lastYearItr}

                    />
                  </View>
                </View>
                <View style={styles.verticalWrapper}>
                  <Text style={styles.radioText}>
                    ITR filed for AV  {section.financialyear}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                  </View>
                </View>
                <View style={styles.verticalWrapper}>
                  <Text style={styles.radioText}>
                    Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY {section.financialyear}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>


                  </View>
                </View>
                <View style={styles.verticalWrapper}>
                  <Text numberOfLines={2} style={styles.radioText}>
                    Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY {section.financialyear}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>


                  </View>
                </View>
                <View style={styles.verticalWrapper}>
                  <Text style={styles.radioText}>
                    Turnover in financial year {section.financialyear} was exceeding 10 crores
                  </Text>
                  <View style={{ flexDirection: 'row' }}>


                  </View>
                </View>

              </ScrollView>
              );

              <View style={styles.sectionView}>
                <Text>
                  {props.filterListData}
                </Text>

              </View>
            </ScrollView> */}
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
    paddingVertical: 0,
    borderWidth: 0.9
  },
  crossView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ContainerCss: {
    backgroundColor: colors.WhiteColor,
    paddingHorizontal: Dimension.padding5,
    paddingVertical: Dimension.padding25
  },
  AddressType: {
    color: 'black',
    fontSize: Dimension.font18,
    fontFamily: Dimension.CustomRobotoBold
  }

});

export default TDSEditModal;

/* Created By Aakash  -------*/