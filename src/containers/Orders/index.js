import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  BackHandler,
  Keyboard,
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
import styles from './style';
import CustomeIcon from '../../component/common/CustomeIcon';

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
  const [inputValue, setInputValue] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    if (OrderStatus !== STATE_STATUS.FETCHED) {
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
    }
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
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
        actionCTA={item.actionCTA}
        taxPercentage={item.taxPercentage}
        totalAmount={item.totalAmount}
        fetchOrdersFunc={fetchOrdersFunc}
        selectedTab={selectedTab}
        fetchTabCountFunc={fetchTabCountFunc}
        itemId={item.itemId}
        invoiceUrl={item.invoiceUrl}
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
          padding: Dimension.padding10,
          flexDirection: 'row',
          backgroundColor: colors.grayShade7,
        }}>
        {TABS[selectedType].map((tab, tabIndex) => (
          <TouchableOpacity
            onPress={() => changeTab(tab)}
            style={
              selectedTab == tab.key
                ? styles.selectedTabCss
                : styles.Unselectedtabcss
            }
            key={tabIndex}>
            <Text
              style={
                selectedTab == tab.key
                  ? styles.selectedTabTxt
                  : styles.UnselectedtabTxt
              }>
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

  const onSearchText = text => {
    setInputValue(text);
  };

  const onSubmitSearch = () => {
    fetchOrdersFunc(0, inputValue, selectedTab, 'ONESHIP', {
      pickupFromDate: '',
      pickupToDate: '',
      poFromDate: '',
      poToDate: '',
      orderType: [],
      deliveryType: [],
      orderRefs: [],
    });
  };

  // const handleKeyDown = e => {
  //   console.log(e, e && e.nativeEvent && e.nativeEvent.key);
  // };

  return (
    <View style={{flex: 1, backgroundColor: colors.grayShade7}}>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
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
              isFromOrders={true}
            />
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Notification')}
              style={styles.notifocationBtn}>
              <CustomeIcon
                name={'notification'}
                size={Dimension.font22}
                color={colors.FontColor}
              />
            </TouchableOpacity>
          </View>

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
            maxToRenderPerBatch={5}
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
            initialNumToRender={5}
          />
          <ScrollView>
            <TextInput
              // autoFocus={true}
              // style={styles.inputField}
              // onKeyPress={e => {
              //   console.log('hehhe', e.nativeEvent.key);
              // }}
              blurOnSubmit={true}
              style={{color: '#000'}}
              placeholder={'Search MSN/Product Name/PO Id/PO Item Id'}
              placeholderTextColor={'#888'}
              selectionColor={'#888'}
              returnKeyType={'search'}
              onChangeText={onSearchText}
              onFocus={() => console.log('onFocus!!')}
              // ref={searchInput}
              value={inputValue}
              onSubmitEditing={event => {
                if (inputValue && inputValue.length > 1) {
                  onSubmitSearch();
                }
              }}
            />
            {!isKeyboardVisible ? (
              <TouchableOpacity style={{width: 40, height: 50}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  Filters
                </Text>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default OrdersScreen;
