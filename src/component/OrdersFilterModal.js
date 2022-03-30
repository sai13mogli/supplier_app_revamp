import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {
  orderFiltersTypeData,
  orderfiltersData,
} from '../redux/constants/orders';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPOs} from '../redux/actions/orders';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STATE_STATUS} from '../redux/constants';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomeDatePicker from '../component/common/Datepicker/index';
import CustomeIcon from './common/CustomeIcon';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const OrdersFilterModal = props => {
  const dispatch = useDispatch();
  const {
    ordersfiltersModal,
    setOrdersFiltersModal,
    activeFilter,
    setActiveFilter,
    selectedTab,
    appliedFilter,
    setAppliedFilter,
    initialFilter,
    setInitialFilter,
    selectFilter,
    applyFilters,
    pickupFromDate,
    pickupToDate,
    setPickupFromDate,
    setPickupToDate,
    poFromDate,
    poToDate,
    setPoFromDate,
    setPoToDate,
    resetFilters,
  } = props;

  const poStatus = useSelector(state =>
    state.ordersReducer.getIn(['tabItemCounts', 'status']),
  );
  const poData = useSelector(state =>
    state.ordersReducer.getIn(['tabItemCounts', 'data']),
  );

  useEffect(() => {
    if (activeFilter == 'orderRefs') {
      fetchPOIdsFunc();
    }
  }, [activeFilter]);

  const fetchPOIdsFunc = async () => {
    if (poStatus !== STATE_STATUS.FETCHED) {
      dispatch(
        fetchPOs({
          supplierId: await AsyncStorage.getItem('userId'),
          tabRef: selectedTab,
        }),
      );
    }
  };

  const renderRight = () => {
    if (activeFilter == 'orderRefs') {
      let poIds = [];
      let arr = poData.toArray();
      (arr || []).forEach((ele, idx) => {
        ele.forEach((_, i) => {
          if (i < 1) {
            poIds.push(_);
          }
        });
      });

      return (
        <View style={{width: deviceWidth, height: deviceHeight}}>
         
          <ScrollView>
            {poIds.map((_, i) => (
              <TouchableOpacity onPress={() => selectFilter(_)} style={styles.checkboxWrap}>
               <CustomeIcon
                  name={
                    appliedFilter[initialFilter] &&
                    appliedFilter[initialFilter].includes(_)
                      ? 'checkbox-tick'
                      : 'checkbox-blank'
                  }
                  color={
                    appliedFilter[initialFilter] &&
                    appliedFilter[initialFilter].includes(_)
                      ? Colors.BrandColor
                      : Colors.blackColor
                  }
                  size={Dimension.font22}
                  >

                  </CustomeIcon>
              
                {/* <MaterialCommunityIcon
                  name={
                    appliedFilter[initialFilter] &&
                    appliedFilter[initialFilter].includes(_)
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  size={20}
                  color={
                    appliedFilter[initialFilter] &&
                    appliedFilter[initialFilter].includes(_)
                      ? 'blue'
                      : '#000'
                  }
                /> */}
                <Text style={styles.checkBoxTitle}>
                  {_} (
                  {poData.get(_) == '1'
                    ? `${poData.get(_)} item`
                    : `${poData.get(_)} items`}
                  )
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={{width: deviceWidth, height: deviceHeight}}>
          <ScrollView>
            <>
              {orderfiltersData[activeFilter].map((_, i) => (
                <TouchableOpacity onPress={() => selectFilter(_.key)} style={styles.checkboxWrap}>
                  <CustomeIcon
                  name={
                    appliedFilter[initialFilter] &&
                    appliedFilter[initialFilter].includes(_.key)
                      ? 'checkbox-tick'
                      : 'checkbox-blank'
                  }
                  color={
                    appliedFilter[initialFilter] &&
                    appliedFilter[initialFilter].includes(_.key)
                      ? Colors.BrandColor
                      : Colors.blackColor
                  }
                  size={Dimension.font22}
                  >

                  </CustomeIcon>
                  {/* <MaterialCommunityIcon
                    name={
                      appliedFilter[initialFilter] &&
                      appliedFilter[initialFilter].includes(_.key)
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    size={20}
                    color={
                      appliedFilter[initialFilter] &&
                      appliedFilter[initialFilter].includes(_.key)
                        ? 'blue'
                        : '#000'
                    }
                  /> */}
                  <Text
                    style={styles.checkBoxTitle}>
                    {_.title}
                  </Text>
                </TouchableOpacity>
              ))}
              {activeFilter == 'deliveryType' ? (
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#fff'}}>
                  What is Delivery Type
                </Text>
              ) : null}
            </>
          </ScrollView>
        </View>
      );
    }
  };

  const setFromDatePickup = date => {
    setPickupFromDate(date);
  };
  const setFromDatePo = date => {
    setPoFromDate(date);
  };

  const setPickupDateTo = date => {
    setPickupToDate(date);
  };
  const setPoDateTo = date => {
    setPoToDate(date);
  };

  console.log(pickupFromDate, pickupToDate, poFromDate, poToDate);

  const renderComponent = () => {
    return (
      <>
        <CustomeDatePicker
          title={'From Date'}
          isImp={true}
          label={'From Date'}
          placeholder={'DD/MM/YYYY'}
          value={activeFilter == 'pickupDate' ? pickupFromDate : poFromDate}
          onChange={
            activeFilter == 'pickupDate' ? setFromDatePickup : setFromDatePo
          }
          activeFilter={activeFilter}
        />
        <CustomeDatePicker
          title={'To Date'}
          isImp={true}
          label={'To Date'}
          placeholder={'DD/MM/YYYY'}
          value={activeFilter == 'pickupDate' ? pickupToDate : poToDate}
          onChange={
            activeFilter == 'pickupDate' ? setPickupDateTo : setPoDateTo
          }
          activeFilter={activeFilter}
        />
      </>
    );
  };

  /* 
            {poData.map((_, i) => {
              return (
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}></Text>
              );
            })} */
  /* {_ == '1' ? `${_} item` : `${_} items`} */

  useEffect(() => {
    if (poStatus == STATE_STATUS.FETCHED) {
      console.log(poData);
      // poData.map((_, i) => {
      //   console.log(_, i);
      // });
    }
  }, [poStatus]);

  return (
    <Modal
      overlayPointerEvents={'auto'}
      isVisible={ordersfiltersModal}
      onTouchOutside={() => {
        setOrdersFiltersModal(false);
      }}
      onDismiss={() => {
        setOrdersFiltersModal(false);
      }}
      coverScreen={true}
      style={{padding: 0, margin: 0, width: '100%', height: '100%'}}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      hasBackdrop={true}
      onBackdropPress={() => setOrdersFiltersModal(false)}
      onBackButtonPress={() => setOrdersFiltersModal(false)}>
      <View style={{height: deviceHeight, width: deviceWidth}}>
      <View style={styles.headerWrap}>
          <CustomeIcon
                name={'arrow-back'}
                size={Dimension.font22}
                color={Colors.FontColor}
              />
              <Text style={styles.headerTxt}>Filter</Text>
          </View>
          <View style={styles.MidWrapper}>
          <View style={styles.leftPart}>
          {orderFiltersTypeData.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setActiveFilter(item.key);
              setInitialFilter(item.key);
            }}
            style={[
              item && item.key == activeFilter
                ? styles.activeBackground
                : styles.inactiveBackground,
            ]}>
            <Text
              style={[
                item && item.key == activeFilter
                  ? styles.LeftActiveTxt
                  : styles.LeftInActiveTxt,
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
          </View>
          <View style={styles.rightPart}>
          {['poDate', 'pickupDate'].includes(activeFilter)
          ? renderComponent()
          : renderRight()}
          </View>
        </View>
        
     
        <View style={styles.bottomAction}>
          <TouchableOpacity
            onPress={() => applyFilters()}
            style={styles.filterTouch}>
            <Text style={styles.filterText}>APPLY FILTERS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => resetFilters()}
            style={styles.filterTouch}>
            <Text style={styles.filterText}>RESET</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerWrap:{
    flexDirection:"row",
    backgroundColor:"#fff",
    paddingTop:Dimension.padding20,
    paddingHorizontal:Dimension.padding10,
    paddingBottom:Dimension.padding10
  },
  headerTxt:{
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginLeft:Dimension.margin10,

  },
  activeBackground: {
    backgroundColor: Colors.LightBrandColor,
     paddingVertical: Dimension.padding15,
    paddingHorizontal: Dimension.padding20,
  },
  inactiveBackground: {
    backgroundColor: '#fff',
     paddingVertical: Dimension.padding15,
     paddingHorizontal: Dimension.padding20,
  },
  LeftInActiveTxt: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  LeftActiveTxt: {
    fontSize: Dimension.font12,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  bottomAction: {
    backgroundColor: '#EFEFF4',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: Dimension.padding5,
    flexDirection: 'row',
  },
  filterTouch: {
    backgroundColor: 'red',
    borderRadius: Dimension.borderRadius4,
    height: 60,
    width: 200,
    justifyContent: 'center',
    margin: 10,
  },
  filterText: {
    color: '#fff',
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomBoldFont,
    alignSelf: 'center',
  },
  ModalBottomBtnWrap: {
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade2,
    padding: Dimension.padding15,
    backgroundColor: Colors.WhiteColor,
  },

  MidWrapper: {
    flexDirection: "row",
    borderTopColor: Colors.grayShade2,
    borderTopWidth: 1,
   backgroundColor:"#fff"

  },
  leftPart: {
    flex: 3,
    borderRightColor: Colors.grayShade2,
    borderRightWidth: 1, 
  backgroundColor:"#fff",
  paddingTop:Dimension.padding20
  },
  rightPart: {
    flex: 7,
    //alignItems:"flex-start"
    paddingTop:Dimension.padding25
  },
  RightInnerPart: {
    paddingLeft: Dimension.padding30,
    marginBottom: Dimension.padding30
  },

  checkBoxTitle:{
    color: Colors.blackColor,
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft:Dimension.margin10,
    marginTop:Dimension.margin4
  },
  checkboxWrap:{
    flexDirection:"row",
    marginVertical:Dimension.padding10,
    marginHorizontal:Dimension.margin25,

  },
});

export default OrdersFilterModal;
