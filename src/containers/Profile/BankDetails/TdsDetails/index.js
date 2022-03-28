import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../../../Theme/Colors';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import Dimension from '../../../../Theme/Dimension';
import { useNavigation } from '@react-navigation/native'
import CustomeIcon from '../../../../component/common/CustomeIcon';
import AddressesModal from '../../../../component/common/AddressesModal';
import { fetchUpdateTDSDetails } from '../../../../redux/actions/profile';
import styles from './styles';
import { CheckBox } from 'react-native-elements';
import DotCheckbox from '../../../../component/common/Checkbox';

const TdsDetails = (props) => {
  const tdsInfoDetails = useSelector(
    state => state.profileReducer.tdsInfoDetails.data || [],
  );
  const [tdsInfoList, setTdsInfoList] = React.useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isYes, setIsYes] = useState(false);
  const [isNo, setIsNo] = useState(false);
  const [isNA, setIsNA] = useState(false);
  const [isYesITR, setIsYesITR] = useState(false);
  const [isNoITR, setIsNoITR] = useState(false);
  const [isNAITR, setIsNAITR] = useState(false);
  const [isYesTds, setIsYesTds] = useState(false);
  const [isNoTds, setIsNoTds] = useState(false);
  const [isNATds, setIsNATds] = useState(false);
  const [isYesTcs, setIsYesTcs] = useState(false);
  const [isNoTcs, setIsNoTcs] = useState(false);
  const [isNATcs, setIsNATcs] = useState(false);
  const [isYesTurn, setIsYesTurn] = useState(false);
  const [isNoTurn, setIsNoTurn] = useState(false);
  const [isNATurn, setIsNATurn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, seteditId] = useState(false);
  const [section, setSectionList] = React.useState([]);
  const { navigate } = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const _updateSections = activeSections => {
    setTdsInfoList(activeSections);
  };

  const OnYes = () => {
    setIsYes(true)
    setIsNo(false)
    setIsNA(false)
  }
  const OnNo = () => {
    setIsYes(false)
    setIsNo(true)
    setIsNA(false)
  }
  const OnNA = () => {
    setIsYes(false)
    setIsNo(false)
    setIsNA(true)
  }

  const OnYesITR = () => {
    setIsYesITR(true)
    setIsNoITR(false)
    setIsNAITR(false)
  }
  const OnNoITR = () => {
    setIsYesITR(false)
    setIsNoITR(true)
    setIsNAITR(false)
  }
  const OnNAITR = () => {
    setIsYesITR(false)
    setIsNoITR(false)
    setIsNAITR(true)
  }

  const OnYesTds = () => {
    setIsYesTds(true)
    setIsNoTds(false)
    setIsNATds(false)
  }
  const OnNoTds = () => {
    setIsYesTds(false)
    setIsNoTds(true)
    setIsNATds(false)
  }
  const OnNATds = () => {
    setIsYesTds(false)
    setIsNoTds(false)
    setIsNATds(true)
  }

  const OnYesTcs = () => {
    setIsYesTcs(true)
    setIsNoTcs(false)
    setIsNATcs(false)
  }
  const OnNoTcs = () => {
    setIsYesTcs(false)
    setIsNoTcs(true)
    setIsNATcs(false)
  }
  const OnNATcs = () => {
    setIsYesTcs(false)
    setIsNoTcs(false)
    setIsNATcs(true)
  }

  const OnYesTurn = () => {
    setIsYesTurn(true)
    setIsNoTurn(false)
    setIsNATurn(false)
  }
  const OnNoTurn = () => {
    setIsYesTurn(false)
    setIsNoTurn(true)
    setIsNATurn(false)
  }
  const OnNATurn = () => {
    setIsYesTurn(false)
    setIsNoTurn(false)
    setIsNATurn(true)
  }

  const _renderHeader = section => {
    global.year = section.financialyear
    const index = tdsInfoDetails.findIndex(
      i => i.tdsInfoDetails_id === section.tdsInfoDetails_id,
    );
    const iconName = index === tdsInfoList[0] ? 'angle-up' : 'angle-down';

    return (
      <View
        style={{
          margin: 10,
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>
          Year {section.financialyear}
        </Text>
        <CustomeIcon
          type="FontAwesome"
          name={iconName}
          size={Dimension.font18}
          color={colors.BrandColor}
        />
      </View>
    );
  };

  const myFilterList = (section) => {
    console.log("Sction====>", section);
    return (
      <ScrollView
        style={{ marginBottom: 0 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.Separater} />

        <Text style={styles.radioText}>
          TDS filed for AY {section.financialyear}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            checked={section.lastYearItr == 0 ? isYes == false : section.lastYearItr == 1 ? isYes == true :
              section.lastYearItr == "" ? isYes == true : isYes == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnYes}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"Yes"}
          />
          <CheckBox
            checked={section.lastYearItr == 0 ? isNo == false : section.lastYearItr == 1 ? isNo == true :
              section.lastYearItr == "" ? isNo == true : isNo == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnNo}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"No"}
          />
          <CheckBox
            checked={section.lastYearItr == 0 ? isNA == false : section.lastYearItr == 1 ? isNA == true :
              section.lastYearItr == "" ? isNA == true : isNA == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnNA}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"NA"}
          />


        </View>

        <Text style={styles.radioText}>
          ITR filed for AV  {section.financialyear}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            checked={section.lastToLastYearItr == 0 ? isYesITR == false : section.lastToLastYearItr == 1 ? isYesITR == true :
              section.lastToLastYearItr == "" ? isYesITR == true : isYesITR == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnYesITR}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"Yes"}
          />
          <CheckBox
            checked={section.lastToLastYearItr == 0 ? isNoITR == false : section.lastToLastYearItr == 1 ? isNoITR == true :
              section.lastToLastYearItr == "" ? isNoITR == true : isNoITR == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnNoITR}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"No"}
          />
          <CheckBox
            checked={section.lastToLastYearItr == 0 ? isNAITR == false : section.lastToLastYearItr == 1 ? isNAITR == true :
              section.lastToLastYearItr == "" ? isNAITR == true : isNAITR == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnNAITR}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"NA"}
          />

        </View>

        <Text style={styles.radioText}>
          Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY {section.financialyear}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            checked={section.lastYearTdsTcs == 0 ? isYesTds == false : section.lastYearTdsTcs == 1 ? isYesTds == true :
              section.lastYearTdsTcs == "" ? isYesTds == true : isYesTds == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnYesTds}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"Yes"}
          />
          <CheckBox
            checked={section.lastYearTdsTcs == 0 ? isNoTds == false : section.lastYearTdsTcs == 1 ? isNoTds == true :
              section.lastYearTdsTcs == "" ? isNoTds == true : isNoTds == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnNoTds}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"No"}
          />
          <CheckBox
            checked={section.lastYearTdsTcs == 0 ? isNATds == false : section.lastYearTdsTcs == 1 ? isNATds == true :
              section.lastYearTdsTcs == "" ? isNATds == true : isNATds == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnNATds}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"NA"}
          />

        </View>

        <Text numberOfLines={2} style={styles.radioText}>
          Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY {section.financialyear}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            checked={section.lastToLastYearTdsTcs == 0 ? isYesTcs == false : section.lastToLastYearTdsTcs == 1 ? isYesTcs == true :
              section.lastToLastYearTdsTcs == "" ? isYesTcs == true : isYesTcs == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnYesTcs}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"Yes"}
          />
          <CheckBox
            checked={section.lastToLastYearTdsTcs == 0 ? isNoTcs == false : section.lastToLastYearTdsTcs == 1 ? isNoTcs == true :
              section.lastToLastYearTdsTcs == "" ? isNoTcs == true : isNoTcs == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnNoTcs}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"No"}
          />
          <CheckBox
            checked={section.lastToLastYearTdsTcs == 0 ? isNATcs == false : section.lastToLastYearTdsTcs == 1 ? isNATcs == true :
              section.lastToLastYearTdsTcs == "" ? isNATcs == true : isNATcs == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnNATcs}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"NA"}
          />

        </View>
        <Text style={styles.radioText}>
          Turnover in financial year {section.financialyear} was exceeding 10 crores
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            checked={section.financialYearTurnover == 0 ? isYesTurn == false : section.financialYearTurnover == 1 ? isYesTurn == true :
              section.financialYearTurnover == "" ? isYesTurn == true : isYesTurn == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnYesTurn}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"Yes"}
          />
          <CheckBox
            checked={section.financialYearTurnover == 0 ? isNoTurn == false : section.financialYearTurnover == 1 ? isNoTurn == true :
              section.financialYearTurnover == "" ? isNoTurn == true : isYesTurn == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnNoTurn}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"No"}
          />
          <CheckBox
            checked={section.financialYearTurnover == 0 ? isNATurn == false : section.financialYearTurnover == 1 ? isNATurn == true :
              section.financialYearTurnover == "" ? isNATurn == true : isNATurn == false}
            size={Dimension.font20}
            fontFamily={Dimension.CustomMediumFont}
            containerStyle={styles.checkboxContainer}
            onPress={OnNATurn}
            checkedColor={'red'}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon={'circle-o'}
            title={"NA"}
          />

        </View>

      </ScrollView>
    );
  };

  const onPresEdit = section => {

    setModalVisible(true);
    setModalVisible(!modalVisible);
    setSectionList(section)
    seteditId(section.id);
  };

  const _renderContent = section => {
    return (
      <View>
        <TouchableOpacity
          style={styles.iconStyle}
          onPress={() => {
            onPresEdit(section);
          }}>
          <CustomeIcon
            type="FontAwesome"
            name={'add-circle'}
            size={Dimension.font18}
            color={colors.BrandColor}
          />
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>

        <View style={styles.sectionView}>
          <View style={styles.wrap}>
            <Text style={styles.text}>
              TDS filed for AY {section.financialyear}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.lastYearItr == 1 ? 'Yes' : section.lastYearItr == 0 ? "No" : section.lastYearItr == undefined || null || "" ? "-" : null}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 50 }]}>
            <Text style={styles.text}>
              ITR filed for AV {section.financialyear}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.lastToLastYearItr == 1 ? 'Yes' : section.lastToLastYearItr == 0 ? 'No' : section.lastToLastYearItr == undefined || null || "" ? "-" : null}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 40 }]}>
            <Text style={styles.text}>
              Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
              {section.financialyear}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.lastYearTdsTcs == 1 ? 'Yes' : section.lastYearTdsTcs == 0 ? 'No' : section.lastYearTdsTcs == undefined || null || "" ? "-" : null}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 30 }]}>
            <Text style={styles.text}>
              Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
              {section.financialyear}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.lastToLastYearTdsTcs == 1 ? 'Yes' : section.lastToLastYearTdsTcs == 0 ? 'No' : section.lastToLastYearTdsTcs == undefined || null || "" ? "-" : null}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 20 }]}>
            <Text style={styles.text}>
              Turnover in financial year {section.financialyear} was
              exceeding 10 crores
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.financialYearTurnover == 1 ? 'Yes' : section.financialYearTurnover == 0 ? 'No' : section.financialYearTurnover == undefined || null || "" ? "-" : null}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const onSubmit = (section) => {
    let data = {
      id: section.id,
      panNumber: "AAJCP7293G",
      financialyear: "2022-23",
      previousFinancialYear: "2021-22",
      financialYearTurnover: isYesTurn ? 1 : isNoTurn ? 0 : isNATurn == "" ? "" : null,
      lastYearItr: isYes ? 1 : isNo ? 0 : isNA ? "" : null,
      lastToLastYearItr: isYesITR ? 1 : isNoITR ? 0 : isNAITR == "" ? "" : null,
      lastYearTdsTcs: isYesTds ? 1 : isNoTds ? 0 : isNATds == "" ? "" : null,
      lastToLastYearTdsTcs: isYesTcs ? 1 : isNoTcs ? 0 : isNATcs == "" ? "" : null,
    }
    console.log("Data====>", data);
    dispatch(fetchUpdateTDSDetails(data));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView indicatorStyle="white" style={styles.ContainerCss}>
        <Accordion
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          sections={tdsInfoDetails || []}
          activeSections={tdsInfoList}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
          touchableComponent={TouchableOpacity}
          renderFooter={() => (
            <View style={{ height: 10, backgroundColor: '#E0E0E0' }}></View>
          )}
        />
      </ScrollView>
      <AddressesModal
        visible={modalVisible}
        filterListData={myFilterList(section)}
        transparent={true}
        onClose={() => setModalVisible(true)}
        onPress={() => { setModalVisible(!modalVisible), onSubmit(section) }}
      />
    </View>
  );
};
export default TdsDetails;
//Don
