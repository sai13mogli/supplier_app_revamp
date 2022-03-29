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
import DotCheckbox from '../../../../component/common/Checkbox';
import TDSEditModal from '../../../../component/common/TDSEditModal';

const TdsDetails = (props) => {
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

  const onPresEdit = section => {
    setModalVisible(true);
    setModalVisible(!modalVisible);
    setSectionList(section)
  };

  const _renderContent = section => {
    console.log("AScga====>", section.lastYearItr);
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
              {section.lastYearItr == 1 ? 'Yes' :
                section.lastYearItr == 0 ? "No" :
                  section.lastYearItr == undefined || null || "" ? "-" : null}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 50 }]}>
            <Text style={styles.text}>
              ITR filed for AV {section.financialyear}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.lastToLastYearItr == 1 ? 'Yes'
                : section.lastToLastYearItr == 0 ? 'No'
                  : section.lastToLastYearItr == undefined || null || "" ? "-"
                    : null}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 40 }]}>
            <Text style={styles.text}>
              Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
              {section.financialyear}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.lastYearTdsTcs == 1 ? 'Yes' :
                section.lastYearTdsTcs == 0 ? 'No' :
                  section.lastYearTdsTcs == undefined || null || "" ? "-"
                    : null}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 30 }]}>
            <Text style={styles.text}>
              Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
              {section.financialyear}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.lastToLastYearTdsTcs == 1 ? 'Yes'
                : section.lastToLastYearTdsTcs == 0 ? 'No' :
                  section.lastToLastYearTdsTcs == undefined || null || "" ? "-"
                    : null}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 20 }]}>
            <Text style={styles.text}>
              Turnover in financial year {section.financialyear} was
              exceeding 10 crores
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.financialYearTurnover == 1 ? 'Yes'
                : section.financialYearTurnover == 0 ? 'No'
                  : section.financialYearTurnover == undefined || null || "" ? "-"
                    : null}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const onPressNext = () => {
    let data = {
      id: radioStates.id,
      panNumber: "AAJCP7293G",
      financialyear: "2022-23",
      previousFinancialYear: "2021-22",
      financialYearTurnover: radioStates.financialYearTurnover,
      lastYearItr: radioStates.lastYearItr,
      lastToLastYearItr: radioStates.lastToLastYearItr,
      lastYearTdsTcs: radioStates.lastYearTdsTcs,
      lastToLastYearTdsTcs: radioStates.lastToLastYearTdsTcs,
    }
    console.log("fsasa=====>", global.states);
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
      <TDSEditModal
        header={section.financialyear}
        Id={section.id}
        lastYearItr={section.lastYearItr}
        lastToLastYearItr={section.lastToLastYearItr}
        lastYearTdsTcs={section.lastYearTdsTcs}
        lastToLastYearTdsTcs={section.lastToLastYearTdsTcs}
        financialYearTurnover={section.financialYearTurnover}
        visible={modalVisible}
        transparent={true}
        onClose={() => setModalVisible(true)}
        onPressNext={(value) => { setModalVisible(!modalVisible), onPressNext() }}
      />
    </View>
  );
};
export default TdsDetails;
//Don
