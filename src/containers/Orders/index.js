import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
import {STATE_STATUS} from '../../redux/constants';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders, fetchTabCount} from '../../redux/actions/orders';
import {getImageUrl} from '../../services/orders';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDown from '../../component/common/DropDown';
import Ordercard from '../../component/Ordercard';
import {Icon} from 'react-native-elements';

const OrdersScreen = props => {
  const dispatch = useDispatch();
  const tabStatus = useSelector(state =>
    state.ordersReducer.getIn(['tabCounts', 'status']),
  );
  const tabData = useSelector(state =>
    state.ordersReducer.getIn(['tabCounts', 'data']),
  );
  const OrderStatus = useSelector(state =>
    state.ordersReducer.getIn(['orders', 'status']),
  );
  const OrderData = useSelector(state =>
    state.ordersReducer.getIn(['orders', 'data']),
  );
  const maxPage = useSelector(state =>
    state.ordersReducer.getIn(['orders', 'maxPage']),
  );
  const pageIndex = useSelector(state =>
    state.ordersReducer.getIn(['orders', 'page']),
  );

  const [selectedType, setSelectedType] = useState('Open_Orders');
  const [selectedTab, setSelectedTab] = useState('PENDING_ACCEPTANCE');
  const onEndReachedCalledDuringMomentum = useRef(true);

  const OPTIONS = [
    {label: 'Open Orders', key: 'Open_Orders', value: 'Open_Orders'},
    {
      label: 'Fulfilled Orders',
      key: 'Fulfilled_Orders',
      value: 'Fulfilled_Orders',
    },
    {
      label: 'Cancelled Orders/Returned Orders',
      key: 'Cancelled_Returned',
      value: 'Cancelled_Returned',
    },
  ];

  const TABS = {
    Open_Orders: [
      {label: 'Pending Acceptance', key: 'PENDING_ACCEPTANCE'},
      {label: 'Scheduled Pickup', key: 'SCHEDULED_PICKUP'},
      {label: 'Pickup', key: 'PICKUP'},
      {label: 'Upload Invoice', key: 'UPLOAD_INVOICE'},
      {label: 'Packed', key: 'PACKED'},
      {label: 'Shipment', key: 'SHIPMENT'},
      {label: 'Mark Shipped', key: 'MARK_SHIPPED'},
    ],
    Fulfilled_Orders: [{label: 'Fulfilled', key: 'FULFILLED'}],
    Cancelled_Returned: [
      {label: 'Return Pending', key: 'RETURN_PENDING'},
      {label: 'Return Done', key: 'RETURN_DONE'},
      {label: 'Cancelled', key: 'CANCELLED'},
    ],
  };

  useEffect(() => {
    fetchOrdersFunc(0, '', selectedTab, 'ONESHIP', {
      pickupFromDate: '',
      pickupToDate: '',
      poFromDate: '',
      poToDate: '',
      orderType: [],
      deliveryType: [],
      orderRefs: [],
    });
    fetchTabCountFunc('SCHEDULED_PICKUP', 'ONESHIP');
  }, []);

  const fetchOrdersFunc = (
    page,
    search,
    orderStage,
    onlineShipmentMode,
    filters,
  ) => {
    dispatch(
      fetchOrders(page, search, orderStage, onlineShipmentMode, filters),
    );
  };

  const fetchTabCountFunc = async (tabRef, onlineShipmentMode) => {
    dispatch(
      fetchTabCount({
        supplierId: await AsyncStorage.getItem('userId'),
        tabRef,
        onlineShipmentMode,
      }),
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <Ordercard
        msn={item.productMsn}
        quantity={item.quantity}
        orderRef={item.orderRef}
        itemRef={item.itemRef}
        createdAt={item.createdAt}
        transferPrice={item.transferPrice}
        hsn={item.productHsn}
        pickupDate={item.pickupDate}
        productName={item.productName}
        orderTypeString={item.orderTypeString}
        shipmentMode={item.shipmentMode}
        isVmi={item.isVmi}
        shipmentModeString={item.shipmentModeString}
      />
    );
  };

  const changeTab = val => {
    setSelectedTab(val.key);
    fetchOrdersFunc(0, '', val.key, 'ONESHIP', {
      pickupFromDate: '',
      pickupToDate: '',
      poFromDate: '',
      poToDate: '',
      orderType: [],
      deliveryType: [],
      orderRefs: [],
    });
  };

  const renderHeaderComponent = () => {
    return (
      <ScrollView
        horizontal={true}
        style={{
          padding: Dimension.padding12,
          flexDirection: 'row',
          backgroundColor: '#e7e7e7',
        }}>
        {TABS[selectedType].map((tab, tabIndex) => (
          <TouchableOpacity
            onPress={() => changeTab(tab)}
            style={{
              padding: 8,
              marginRight: 12,
              borderRadius: 4,
              backgroundColor: selectedTab == tab.key ? '#000' : '#fff',
            }}
            key={tabIndex}>
            <Text style={{color: selectedTab == tab.key ? '#fff' : '#000'}}>
              {tab.label} ({tabData.get(tab.key)})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderFooterComponent = () => {
    if (OrderStatus == STATE_STATUS.FETCHING) {
      return <ActivityIndicator style={{alignSelf: 'center', margin: 12}} />;
    }
    return null;
  };

  const renderListEmptyComponent = () => {
    if (OrderData.size == 0 && OrderStatus == STATE_STATUS.FETCHED) {
      return (
        <View style={{padding: 20}}>
          <Text style={{color: '#000', alignSelf: 'center'}}>
            No Data Available
          </Text>
        </View>
      );
    }
    return null;
  };

  const endReachedFetchListing = () => {
    console.log(pageIndex, pageIndex < maxPage);
    if (
      OrderStatus === STATE_STATUS.FETCHED &&
      OrderStatus !== STATE_STATUS.FETCHING &&
      pageIndex + 1 < maxPage
    ) {
      fetchOrdersFunc(pageIndex + 1, '', selectedTab, 'ONESHIP', {
        pickupFromDate: '',
        pickupToDate: '',
        poFromDate: '',
        poToDate: '',
        orderType: [],
        deliveryType: [],
        orderRefs: [],
      });
    }
  };

  return (
    <View style={{flex: 1, paddingTop: 80}}>
      {/* <CustomButton
        title={'Open Notifications'}
        buttonColor={'dodgerblue'}
        iconName={'user'}
        icon={() => (
          <CustomeIcon
            name={'add-box'}
            size={Dimension.font22}
            color={colors.BrandColor}
          />
        )}
        showIcon
        iconColor={'#fff'}
        iconType={'font-awesome'}
        onPress={() => props.navigation.navigate('Notification')}
        TextColor={colors.WhiteColor}
        borderColor={colors.WhiteColor}
      /> */}
      {tabStatus == STATE_STATUS.FETCHING ? (
        <ActivityIndicator style={{alignSelf: 'center', margin: 12}} />
      ) : (
        <>
          <DropDown
            title={''}
            label={''}
            selectedValue={selectedType}
            onValueChange={text => {
              setSelectedType(text);
              changeTab(TABS[text][0]);
            }}
            items={OPTIONS}
            enabled={true}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Notification')}>
            <Icon name="notifications" size={26}></Icon>
          </TouchableOpacity>
          <FlatList
            data={OrderData.toArray()}
            stickyHeaderIndices={[0]}
            renderItem={renderItem}
            ListEmptyComponent={renderListEmptyComponent}
            keyExtractor={(item, index) => `${index}-item`}
            ListHeaderComponent={renderHeaderComponent}
            ListFooterComponent={renderFooterComponent}
            onEndReachedThreshold={0.9}
            style={{paddingBottom: 380}}
            contentContainerStyle={{paddingBottom: 380}}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            onEndReached={({distanceFromEnd}) => {
              if (!onEndReachedCalledDuringMomentum.current) {
                endReachedFetchListing();
                onEndReachedCalledDuringMomentum.current = true;
              }
            }}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum.current = false;
            }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

export default OrdersScreen;
