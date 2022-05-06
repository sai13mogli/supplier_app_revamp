import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../../../Theme/Colors';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import Dimension from '../../../../Theme/Dimension';
import { useNavigation } from '@react-navigation/native'
import CustomeIcon from '../../../../component/common/CustomeIcon';
import { fetchUpdateTDSDetails } from '../../../../redux/actions/profile';
import styles from './styles';
import CustomButton from '../../../../component/common/Button';
import TDSEditModal from '../../../../component/common/TDSEditModal';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchUpdateBankDetails } from '../../../../redux/actions/profile';

const TdsDetails = (props) => {
  const profileData = useSelector(state => state.profileReducer.data || {});
  const bankDetails = useSelector(
    state => state.profileReducer.bankDetails.data || {},
  );
  const tdsInfoDetails = useSelector(
    state => state.profileReducer.tdsInfoDetails.data || [],
  );
  const [tdsInfoList, setTdsInfoList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [section, setSectionList] = useState([]);
  const { navigate } = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const _updateSections = activeSections => {
    setTdsInfoList(activeSections);
  };

  const _renderHeader = (section, _, isActive) => {
    global.year = section.financialyear

    const iconName = isActive ? 'chevron-up' : 'chevron-down';
    const showEdit = isActive ? true : false;

    return (
      <View
        style={styles.AccordianHeaderWrap}>
        <Text style={styles.AccordianheadingTxt}>
          Year {section.financialyear}
        </Text>
        {showEdit == true ?
          <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => {
              onPresEdit(section);
            }}>
            <CustomeIcon name={'edit-box'} size={Dimension.font16} color={colors.BrandColor} />
            <Text style={styles.addnewtxt}>
              Edit
            </Text>
          </TouchableOpacity>
          : null}
        <MaterialCommunityIcon

          name={iconName}
          size={Dimension.font22}
          color={colors.FontColor}
        />
      </View>
    );
  };

  const onPresEdit = section => {
    setModalVisible(true);
    setModalVisible(!modalVisible);
    setSectionList(section)
  };

  const _renderContent = section => {
    return (
      <View style={{}}>


        <View style={styles.sectionView}>
          <View style={styles.wrap}>
            <Text style={styles.HeadinngInnerTxt}>
              TDS filed for AY {section.financialyear}
            </Text>
            <Text style={styles.yesNotxt}>
              {section.lastYearItr == 1 ? 'Yes' :
                section.lastYearItr == 0 ? "No" :
                  section.lastYearItr == "" ? "-" : null}
            </Text>
          </View>
          <View style={styles.wrap}>
            <Text style={styles.HeadinngInnerTxt}>
              ITR filed for AV {section.financialyear}
            </Text>
            <Text style={styles.yesNotxt}>
              {section.lastToLastYearItr == 1 ? 'Yes'
                : section.lastToLastYearItr == 0 ? 'No'
                  : section.lastToLastYearItr == "" ? "dccjsd"
                    : null}
            </Text>
          </View>
          <View style={styles.wrap}>
            <Text style={styles.HeadinngInnerTxt}>
              Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
              {section.financialyear}
            </Text>
            <Text style={styles.yesNotxt}>
              {section.lastYearTdsTcs == 1 ? 'Yes' :
                section.lastYearTdsTcs == 0 ? 'No' :
                  section.lastYearTdsTcs == "" ? "-"
                    : null}
            </Text>
          </View>
          <View style={styles.wrap}>
            <Text style={styles.HeadinngInnerTxt}>
              Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
              {section.financialyear}
            </Text>
            <Text style={styles.yesNotxt}>
              {section.lastToLastYearTdsTcs == 1 ? 'Yes'
                : section.lastToLastYearTdsTcs == 0 ? 'No' :
                  section.lastToLastYearTdsTcs == "" ? "-"
                    : null}
            </Text>
          </View>
          <View style={[styles.wrap, { borderBottomWidth: 0 }]}>
            <Text style={styles.HeadinngInnerTxt}>
              Turnover in financial year {section.financialyear} was
              exceeding 10 crores
            </Text>
            <Text style={styles.yesNotxt}>
              {section.financialYearTurnover == 1 ? 'Yes'
                : section.financialYearTurnover == 0 ? 'No'
                  : section.financialYearTurnover == "" ? "-"
                    : null}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const onPressNext = (value) => {
    setModalVisible(false)
    dispatch(fetchUpdateTDSDetails(value));
  };

  const onSubmit = () => {

    if (bankDetails) {
      const data = {
        id: bankDetails?.id,
        accountHolderName: bankDetails.accountHolderName,
        accountNumber: bankDetails.accountNumber,
        accountType: bankDetails.accountType,
        ifscCode: bankDetails.ifscCode,
        branch: bankDetails.branch,
        bankName: bankDetails.bankName,
        city: 'delhi',
        currencyType: '2',
        countryCode: '217',
        businessType: 'businessType',
      };
      dispatch(fetchUpdateBankDetails(data));
      props.navigation.navigate("Profile")
    } else {
      alert("bank detail not found")
    }

    // dispatch(saveBankDetailAction())
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView indicatorStyle="white" style={styles.ContainerCss}>
        <Accordion
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80, position: "relative" }}
          sections={tdsInfoDetails || []}
          activeSections={tdsInfoList}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
          touchableComponent={TouchableOpacity}
          renderFooter={() => (
            <View style={{ height: 1, backgroundColor: colors.BoxBorderColor, marginVertical: Dimension.padding10 }}></View>
          )}
        />
      </ScrollView>
      {profileData && profileData.verificationStatus !== 15 ? (
        <View style={styles.bottombtnWrap}>
          <CustomButton
            buttonColor={colors.BrandColor}
            borderColor={colors.BrandColor}
            TextColor={colors.WhiteColor}
            TextFontSize={Dimension.font16}
            title={'Submit'}
            onPress={onSubmit}
          />
        </View>
      ) : null}
      {modalVisible && <TDSEditModal
        header={section.financialyear}
        panNumber={section.panNumber}
        previousFinYear={section.previousFinancialYear}
        editId={section.id}
        lastYearItr={section.lastYearItr}
        lastToLastYearItr={section.lastToLastYearItr}
        lastYearTdsTcs={section.lastYearTdsTcs}
        lastToLastYearTdsTcs={section.lastToLastYearTdsTcs}
        financialYearTurnover={section.financialYearTurnover}
        visible={modalVisible}
        transparent={true}
        onPressNext={onPressNext}
        onPress={() => { setModalVisible(!modalVisible) }}
      />}
    </View>
  );
};
export default TdsDetails;
//Don
