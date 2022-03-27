import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../../../Theme/Colors';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import Dimension from '../../../../Theme/Dimension';
import { useNavigation } from '@react-navigation/native'
import CustomeIcon from '../../../../component/common/CustomeIcon';
import AddressesModal from '../../../../component/common/AddressesModal';
import { fetchUpdateTDSDetails } from '../../../../redux/actions/profile';
import styles from './styles';
import Checkbox from '../../../../component/common/Checkbox/index';
import DotCheckbox from '../../../../component/common/Checkbox';
import { EditTdsData } from '../../../../redux/constants/support';

const TdsDetails = (props) => {
  const tdsInfoDetails = useSelector(
    state => state.profileReducer.tdsInfoDetails.data || [],
  );
  console.log("Dtaill====>", tdsInfoDetails);
  const [tdsInfoList, setTdsInfoList] = React.useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, seteditId] = useState(false);
  const [section, setSectionList] = React.useState([]);
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

  const myFilterList = (section) => {
    return (
      <ScrollView
        style={{ marginBottom: 0 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.Separater} />

        <Text style={styles.radioText}>
          TDS filed for AY {section.financialyear}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            checked={section.financialYearTurnover == 1 ? true : false}
            onPress={() => setSelection(!isSelected)}
            title={"Yes"}
          />
          <Checkbox
            checked={section.financialYearTurnover == 1 ? true : false}
            onPress={() => setSelection(!isSelected)}
            title={"No"}
          />
          <DotCheckbox
            // data={"ok"}
            // onCheck={getFilterValue}
            // value={props.typeFilter}
            formfilterModal={true}
          />

        </View>

        <Text style={styles.radioText}>
          ITR filed for AV  {section.financialyear}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"Yes"}
          />
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"No"}
          />
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"NA"}
          />

        </View>

        <Text style={styles.radioText}>
          Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY {section.financialyear}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"Yes"}
          />
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"No"}
          />
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"NA"}
          />

        </View>

        <Text numberOfLines={2} style={styles.radioText}>
          Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY {section.financialyear}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"Yes"}
          />
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"No"}
          />
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"NA"}
          />

        </View>
        <Text style={styles.radioText}>
          Turnover in financial year {section.financialyear} was exceeding 10 crores
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"Yes"}
          />
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"No"}
          />
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={"NA"}
          />

        </View>
        {/* <Text>hi</Text> */}
        {/* <View style={styles.RightInnerPart}>
          <DotCheckbox
            data={filtersData && filtersData[props.activeFilterType]}
            onCheck={getFilterValue}
            value={props.typeFilter}
            formfilterModal={true}
          />
        </View>
        <DotCheckbox
          checked={isSelected}
          onPress={() => setSelection(!isSelected)}
        />
        <DotCheckbox
          checked={isSelected}
          onPress={() => setSelection(!isSelected)}
        /> */}
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
              TDS filed for AY {section.previousFinancialYear}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.lastYearItr == 1 ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 50 }]}>
            <Text style={styles.text}>
              ITR filed for AV {section.previousFinancialYear}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.lastToLastYearItr == 1 ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 40 }]}>
            <Text style={styles.text}>
              Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
              {section.previousFinancialYear}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.lastYearTdsTcs == 1 ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 30 }]}>
            <Text style={styles.text}>
              Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
              {section.previousFinancialYear}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.lastToLastYearTdsTcs == 1 ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={[styles.wrap, { bottom: 20 }]}>
            <Text style={styles.text}>
              Turnover in financial year {section.previousFinancialYear} was
              exceeding 10 crores
            </Text>
            <Text style={{ fontSize: 16 }}>
              {section.financialYearTurnover == 1 ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const onSubmit = () => {
    let data = {
      id: 19,
      panNumber: "AAJCP7293G",
      financialyear: "2022-23",
      previousFinancialYear: "2021-22",
      financialYearTurnover: 0,
      lastYearItr: 0,
      lastToLastYearItr: 0,
      lastYearTdsTcs: 0,
      lastToLastYearTdsTcs: 0
    }
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
      {/* <View style={styles.bottombtnWrap}>
        <CustomButton
          buttonColor={colors.BrandColor}
          borderColor={colors.BrandColor}
          TextColor={colors.WhiteColor}
          TextFontSize={Dimension.font16}
          title={'Next'}
          loading={loading}
          onPress={onSubmit}
        />
      </View> */}
      <AddressesModal
        visible={modalVisible}
        filterListData={myFilterList(section)}
        transparent={true}
        onClose={() => setModalVisible(true)}
        onPress={() => { setModalVisible(!modalVisible), onSubmit() }}
      />
    </View>
  );
};
export default TdsDetails;
//Don
