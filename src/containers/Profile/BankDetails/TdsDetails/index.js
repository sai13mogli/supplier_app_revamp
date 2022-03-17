import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import colors from '../../../../Theme/Colors';
import {useSelector, useDispatch} from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import Dimension from '../../../../Theme/Dimension';
import CustomButton from '../../../../component/common/Button';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import AddressesModal from '../../../../component/common/AddressesModal';
import styles from './styles';
import Checkbox from '../../../../component/common/Checkbox/index';

const TdsDetails = () => {
  const tdsInfoDetails = useSelector(
    state => state.profileReducer.tdsInfoDetails.data || {},
  );
  const [tdsInfoList, setTdsInfoList] = React.useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [inputText, setInputText] = useState();
  const [loading, setLoading] = useState(false);
  const [editId, seteditId] = useState(false);
  const [filterListData, setFilterListData] = useState([
    {
      label: 'ITR filed for AV',
      checked: true,
    },
    {
      label: 'Pending Clarification (1)',
      checked: true,
    },
    {
      label: 'Accepted (1)',
      checked: true,
    },
    {
      label: 'Material Being Procured (1)',
      checked: true,
    },
    {
      label: 'QC Done - Ready to Ship (1)',
      checked: true,
    },
    {
      label: 'QC is in Progress (1)',
      checked: true,
    },
    {
      label: 'Other',
      checked: true,
    },
  ]);

  console.log('Aakash====>', tdsInfoDetails);

  const _updateSections = activeSections => {
    setTdsInfoList(activeSections);
  };

  const _renderHeader = section => {
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
        <Text style={{fontSize: 16, fontWeight: '600'}}>
          {section.financialyear}
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

  const myFilterList = (item, index) => {
    console.log('Dataee===>', item);
    return (
      <ScrollView
        style={{marginBottom: 0}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.Separater} />

        {/* <Text style={styles.radioText}>
          {item?.label}
        </Text> */}
        <Checkbox
          checked={isSelected}
          onPress={() => setSelection(!isSelected)}
        />
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
    // console.log("xsxxgcsgd====>", section.id);
    setModalVisible(true);
    setModalVisible(!modalVisible);
    setInputText(section);
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
            <Text style={{fontSize: 16}}>
              {section.lastYearItr == 1 ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={[styles.wrap, {bottom: 50}]}>
            <Text style={styles.text}>
              ITR filed for AV {section.previousFinancialYear}
            </Text>
            <Text style={{fontSize: 16}}>
              {section.lastToLastYearItr == 1 ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={[styles.wrap, {bottom: 40}]}>
            <Text style={styles.text}>
              Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
              {section.previousFinancialYear}
            </Text>
            <Text style={{fontSize: 16}}>
              {section.lastYearTdsTcs == 1 ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={[styles.wrap, {bottom: 30}]}>
            <Text style={styles.text}>
              Some of TDS $ TCS as per 26AS is more than Rs. 50,000 in AY{' '}
              {section.previousFinancialYear}
            </Text>
            <Text style={{fontSize: 16}}>
              {section.lastToLastYearTdsTcs == 1 ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={[styles.wrap, {bottom: 20}]}>
            <Text style={styles.text}>
              Turnover in financial year {section.previousFinancialYear} was
              exceeding 10 crores
            </Text>
            <Text style={{fontSize: 16}}>
              {section.financialYearTurnover == 1 ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView indicatorStyle="white" style={styles.ContainerCss}>
        <Accordion
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 80}}
          sections={tdsInfoDetails || []}
          activeSections={tdsInfoList}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
          touchableComponent={TouchableOpacity}
          renderFooter={() => (
            <View style={{height: 10, backgroundColor: '#E0E0E0'}}></View>
          )}
        />
      </ScrollView>
      <View style={styles.bottombtnWrap}>
        <CustomButton
          buttonColor={colors.BrandColor}
          borderColor={colors.BrandColor}
          TextColor={colors.WhiteColor}
          TextFontSize={Dimension.font16}
          title={'Next'}
          loading={loading}
          // onPress={onSubmit}
        />
      </View>
      <AddressesModal
        visible={modalVisible}
        // data={section}
        // filterListData={console.log('Section===>', section)}
        transparent={true}
        onClose={() => setModalVisible(true)}
        onPress={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
};
export default TdsDetails;
//Don
