import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomeIcon from '../../component/common/CustomeIcon';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
import DotCheckbox from './Checkbox';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../common/Button';
import { EditTdsData } from '../../redux/constants/support';

const TDSEditModal = props => {
  const [lastYearItr, setLastYearItr] = useState(undefined);
  const [lastToLastYearItr, setLastToLastYearItr] = useState('');
  const [lastYearTdsTcs, setLastYearTdsTcs] = useState('');
  const [lastToLastYearTdsTcs, setLastToLastYearTdsTcs] = useState('');
  const [financialYearTurnover, setFinancialYearTurnover] = useState('');
  const [loading, setLoading] = useState(false);

  const getlastItr = value => {
    setLastYearItr(value);
  };
  const getlastYearTds = value => {
    setLastYearTdsTcs(value);
  };
  const getlastToLastYearItr = value => {
    setLastToLastYearItr(value);
  };
  const getlastToLastYearTdsTcs = value => {
    setLastToLastYearTdsTcs(value);
  };
  const getFinancialYearTurnover = value => {
    setFinancialYearTurnover(value);
  };

  useEffect(() => {
    setLastYearItr(props.lastYearItr);
    setLastToLastYearItr(props.lastToLastYearItr);
    setLastYearTdsTcs(props.lastYearTdsTcs);
    setLastToLastYearTdsTcs(props.lastToLastYearTdsTcs);
    setFinancialYearTurnover(props.financialYearTurnover);
  }, []);

  const { onPress, transparent } = props;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={transparent}
        visible={props.visible}
        hasBackdrop={true}
        backdropOpacity={0.4}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#0000004D',
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.ModalheadingWrapper}>
              <Text style={styles.ModalHeading}>Year {props.header}</Text>
              <TouchableOpacity onPress={onPress}>
                <CustomeIcon
                  name={'close'}
                  size={Dimension.font22}
                  color={colors.FontColor}></CustomeIcon>
              </TouchableOpacity>
            </View>
            <ScrollView bounces style={styles.ContainerCss}>
              <View style={styles.sectionView}>
                <View style={styles.verticalWrapper}>
                  <Text style={styles.radioText}>
                    TDS filed for AY {props.header}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <DotCheckbox
                      data={EditTdsData && EditTdsData.type}
                      onCheck={getlastItr}
                      value={lastYearItr}
                    />
                  </View>
                </View>
                <View style={styles.verticalWrapper}>
                  <Text style={styles.radioText}>
                    ITR filed for AV {props.header}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <DotCheckbox
                      data={EditTdsData && EditTdsData.type}
                      onCheck={getlastToLastYearItr}
                      value={lastToLastYearItr}
                    />
                  </View>
                </View>
                <View style={styles.verticalWrapper}>
                  <Text style={styles.radioText}>
                    Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
                    {props.header}
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
                    Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
                    {props.header}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <DotCheckbox
                      data={EditTdsData && EditTdsData.type}
                      onCheck={getlastToLastYearTdsTcs}
                      value={lastToLastYearTdsTcs}
                    />
                  </View>
                </View>
                <View style={[styles.verticalWrapper, { borderBottomWidth: 0 }]}>
                  <Text style={styles.radioText}>
                    Turnover in financial year {props.header} was exceeding 10
                    crores
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
          <View style={styles.bottombtnWrap}>
            <CustomButton
              buttonColor={colors.BrandColor}
              borderColor={colors.BrandColor}
              TextColor={colors.WhiteColor}
              TextFontSize={Dimension.font16}
              title={'Next'}
              loading={loading}
              onPress={() => {
                props.onPressNext({
                  id: props.editId,
                  panNumber: props.panNumber,
                  previousFinancialYear: props.previousFinYear,
                  financialyear: props.header,
                  financialYearTurnover: financialYearTurnover,
                  lastYearItr: lastYearItr,
                  lastToLastYearItr: lastToLastYearItr,
                  lastYearTdsTcs: lastYearTdsTcs,
                  lastToLastYearTdsTcs: lastToLastYearTdsTcs,
                });
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  modalContainer: {
    backgroundColor: colors.WhiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    marginTop: 'auto',
    paddingTop: Dimension.padding10,
  },
  sectionView: {
    borderColor: colors.grayShade14,
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: Dimension.margin15,
  },
  radioText: {
    fontSize: Dimension.font12,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginBottom: Dimension.margin5,
  },

  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: colors.grayShade2,
    borderTopWidth: 1,
    backgroundColor: colors.WhiteColor,
  },

  ContainerCss: {
    backgroundColor: colors.WhiteColor,
    paddingHorizontal: Dimension.padding5,
    paddingVertical: Dimension.padding20,
  },
  verticalWrapper: {
    paddingHorizontal: Dimension.padding15,
    paddingVertical: Dimension.padding10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayShade9,
  },

  ModalheadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Dimension.padding15,
  },
  ModalHeading: {
    fontSize: Dimension.font16,
    color: colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin5,
  },
});

export default TDSEditModal;
