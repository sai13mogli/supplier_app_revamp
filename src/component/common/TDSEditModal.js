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
import { EditTdsData } from '../../redux/constants/support';


const TDSEditModal = props => {
  const tdsInfoDetails = useSelector(state => state.profileReducer.tdsInfoDetails.data || []);
  const tdsInfoData = tdsInfoDetails
  const [lastYearItr, setLastYearItr] = useState("");
  const [lastToLastYearItr, setLastToLastYearItr] = useState("");
  const [lastYearTdsTcs, setLastYearTdsTcs] = useState("");
  const [lastToLastYearTdsTcs, setLastToLastYearTdsTcs] = useState("");
  const [financialYearTurnover, setFinancialYearTurnover] = useState("");
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch();

  // let data = tdsInfoData.map((i) => (item))

  const getlastItr = (value) => {
    setLastYearItr(value)
  }
  const getlastYearTds = (value) => {
    setLastYearTdsTcs(value)
  }
  const getlastToLastYearItr = (value) => {
    setLastToLastYearItr(value)
  }
  const getlastToLastYearTdsTcs = (value) => {
    setLastToLastYearTdsTcs(value)
  }
  const getFinancialYearTurnover = (value) => {
    setFinancialYearTurnover(value)
  }

  // useEffect(() => {
  //   console.log("props===>", props.lastYearITR);
  //   setLastYearItr(props.lastYearItr)
  //   setLastToLastYearItr(props.lastToLastYearItr)
  //   setLastYearTdsTcs(props.lastYearTdsTcs)
  //   setLastToLastYearTdsTcs(props.lastToLastYearTdsTcs)
  //   setFinancialYearTurnover(props.financialYearTurnover)
  // }, []);

  const {
    onPress,
    onClose,
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
            <ScrollView style={styles.ContainerCss}>
              <View style={styles.sectionView}>
                <View style={styles.verticalWrapper}>
                  <Text style={styles.radioText}>
                    TDS filed for AY {props.header}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <DotCheckbox
                      data={EditTdsData && EditTdsData.type}
                      onCheck={getlastItr}
                      value={props.lastYearITR}
                    />
                  </View>
                </View>
                <View style={styles.verticalWrapper}>
                  <Text style={styles.radioText}>
                    ITR filed for AV  {props.header}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <DotCheckbox
                      data={EditTdsData && EditTdsData.type}
                      onCheck={getlastToLastYearItr}
                      value={props.lastToLastYearItr}
                    />
                  </View>
                </View>
                <View style={styles.verticalWrapper}>
                  <Text style={styles.radioText}>
                    Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY {props.header}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <DotCheckbox
                      data={EditTdsData && EditTdsData.type}
                      onCheck={getlastYearTds}
                      value={lastYearTdsTcs}
                    />
                  </View>
                </View>
                <View style={styles.verticalWrapper}>
                  <Text numberOfLines={2} style={styles.radioText}>
                    Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY {props.header}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <DotCheckbox
                      data={EditTdsData && EditTdsData.type}
                      onCheck={getlastToLastYearTdsTcs}
                      value={lastToLastYearTdsTcs}
                    />
                  </View>
                </View>
                <View style={styles.verticalWrapper}>
                  <Text style={styles.radioText}>
                    Turnover in financial year {props.header} was exceeding 10 crores
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <DotCheckbox
                      data={EditTdsData && EditTdsData.type}
                      onCheck={getFinancialYearTurnover}
                      value={financialYearTurnover}
                    />
                  </View>
                </View>
              </View>

            </ScrollView>
          </View>


          {/* <Text>
              {props.filterListData}
            </Text> */}


          <View style={styles.bottombtnWrap}>
            <CustomButton
              buttonColor={colors.BrandColor}
              borderColor={colors.BrandColor}
              TextColor={colors.WhiteColor}
              TextFontSize={Dimension.font16}
              title={'Next'}
              loading={loading}
              onPress={() => props.onPressNext({
                id: props.Id,
                lastYearITR: lastYearItr,
                lastToLastYearITR: lastToLastYearItr,
                lastYearTDS: lastToLastYearItr,
                lastToLastYearTDS: lastToLastYearTdsTcs,
                lastYearFinacialTurnOver: financialYearTurnover
              })}
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
  verticalWrapper: {
    paddingVertical: Dimension.padding5
  },
  radioText: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin11,
    width: Dimension.width280
  },
  Separater: {
    height: 0.8,
    backgroundColor: '#e0e0e0',
    marginTop: 5,
  },
  AddressType: {
    color: 'black',
    fontSize: Dimension.font18,
    fontFamily: Dimension.CustomRobotoBold
  }

});

export default TDSEditModal;

