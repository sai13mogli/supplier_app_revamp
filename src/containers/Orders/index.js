import React, { useEffect, useState, useCallback, useRef } from 'react';
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
import { STATE_STATUS } from '../../redux/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchTabCount } from '../../redux/actions/orders';
import { getImageUrl, acceptBulk } from '../../services/orders';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDown from '../../component/common/DropDown';
import Ordercard from '../../component/Ordercard';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import CustomeIcon from '../../component/common/CustomeIcon';
import OrdersFilterModal from '../../component/OrdersFilterModal';
import Toast from 'react-native-toast-message';
import BulkActionsModal from '../../component/BulkActionsModal';

const OrdersScreen = props => {
  const dispatch = useDispatch();

  const profileStatus = useSelector(
    state => (state.profileReducer || {}).status || STATE_STATUS.UNFETCHED,
  );
  const profileData = useSelector(state => state.profileReducer.data || {});

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
  const shipmentType = useSelector(state =>
    state.ordersReducer.getIn(['shipmentType']),
  );

  const paramsAppliedFilters = useSelector(state =>
    state.ordersReducer.getIn(['orders', 'filters']),
  );

  const [selectedType, setSelectedType] = useState('Open_Orders');
  const [selectedTab, setSelectedTab] = useState('PENDING_ACCEPTANCE');
  const onEndReachedCalledDuringMomentum = useRef(true);
  const [inputValue, setInputValue] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [ordersfiltersModal, setOrdersFiltersModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('orderRefs');
  const [appliedFilter, setAppliedFilter] = useState(
    paramsAppliedFilters || {},
  );
  const [initialFilter, setInitialFilter] = useState('orderRefs');
  const [pickupFromDate, setPickupFromDate] = useState('');
  const [pickupToDate, setPickupToDate] = useState('');
  const [poFromDate, setPoFromDate] = useState('');
  const [poToDate, setPoToDate] = useState('');
  const [bulkItemIds, setBulkItemIds] = useState([]);
  const [bulkAcceptLoader, setBulkAcceptLoader] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkActionsModal, setBulkActionsModal] = useState(false);
  const [bulkDownloadItems, setBulkDownloadItems] = useState([]);
  const [initLoader, setInitLoader] = useState(true);

  const OPTIONS = [
    { label: 'Open Orders', key: 'Open_Orders', value: 'Open_Orders' },
    {
      label: 'Fulfilled Orders',
      key: 'Fulfilled_Orders',
      value: 'Fulfilled_Orders',
    },
    {
      label: 'Cancelled Orders',
      key: 'Cancelled',
      value: 'Cancelled',
    },
    {
      label: 'Returned Orders',
      key: 'Returned',
      value: 'Returned',
    },
  ];

  const TABS = {
    Open_Orders: [
      { label: 'Pending Acceptance', key: 'PENDING_ACCEPTANCE' },
      { label: 'Scheduled Pickup', key: 'SCHEDULED_PICKUP' },
      { label: 'Pickup', key: 'PICKUP' },
      { label: 'Upload Invoice', key: 'UPLOAD_INVOICE' },
      { label: 'Packed', key: 'PACKED' },
      { label: 'Shipment', key: 'SHIPMENT' },
      { label: 'Mark Shipped', key: 'MARK_SHIPPED' },
    ],
    Fulfilled_Orders: [{ label: 'Fulfilled', key: 'FULFILLED' }],
    Cancelled: [{ label: 'Cancelled', key: 'CANCELLED' }],
    Returned: [
      { label: 'Return Pending', key: 'RETURN_PENDING' },
      { label: 'Return Done', key: 'RETURN_DONE' },
    ],
  };

  useEffect(() => {
    if (
      profileStatus == STATE_STATUS.FETCHED &&
      profileData.verificationStatus < 10 &&
      initLoader
    ) {
      props.navigation.push('Profile');
      setInitLoader(false);
    }
  }, [profileStatus]);

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
      fetchOrdersFunc(0, '', selectedTab, shipmentType, {
        pickupFromDate: '',
        pickupToDate: '',
        poFromDate: '',
        poToDate: '',
        orderType: [],
        deliveryType: [],
        orderRefs: [],
      });
      fetchTabCountFunc('SCHEDULED_PICKUP', shipmentType);
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

  const renderItem = ({ item, index }) => {
    return (
      <Ordercard
        warehouseId={item.warehouseId}
        msn={item.productMsn}
        quantity={item.quantity}
        shipmentType={shipmentType}
        orderRef={item.orderRef}
        itemRef={item.itemRef}
        createdAt={item.createdAt}
        supplierId={item.supplierId}
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
        bulkItemIds={bulkItemIds}
        setBulkItemIds={setBulkItemIds}
        selectItemId={selectItemId}
        shipmentUrl={item.shipmentUrl}
        podUrl={item.poUrl}
        selectItemData={selectItemData}
      />
    );
  };

  const changeTab = val => {
    setBulkItemIds([]);
    setInputValue('');
    setSelectedTab(val.key);
    fetchOrdersFunc(0, '', val.key, shipmentType, {
      pickupFromDate: '',
      pickupToDate: '',
      poFromDate: '',
      poToDate: '',
      orderType: [],
      deliveryType: [],
      orderRefs: [],
    });
  };

  //selectedFilter
  const selectFilter = term => {
    let currentFilters = { ...appliedFilter };
    if (
      currentFilters[initialFilter] &&
      currentFilters[initialFilter].includes(term)
    ) {
      currentFilters[initialFilter] = currentFilters[initialFilter].filter(
        _ => _ != term,
      );
    } else {
      if (currentFilters[initialFilter]) {
        currentFilters[initialFilter].push(term);
      } else {
        currentFilters[initialFilter] = [];
        currentFilters[initialFilter].push(term);
      }
    }
    setAppliedFilter(currentFilters);
  };

  //select Item Id
  const selectItemId = itemId => {
    let currentItemIds = [...bulkItemIds];
    if (currentItemIds.includes(itemId)) {
      currentItemIds = currentItemIds.filter(_ => _ != itemId);
    } else {
      if (currentItemIds) {
        currentItemIds.push(itemId);
      } else {
        currentItemIds = [];
        currentItemIds.push(itemId);
      }
    }
    setBulkItemIds(currentItemIds);
  };

  //select Item Data
  const selectItemData = itemObj => {
    console.log('itemdata hai mc', itemObj);
    let currentBulkDownloadItems = [...bulkDownloadItems];
    let currItemIds = [...bulkItemIds];
    if (currItemIds.includes(itemObj.itemId)) {
      currentBulkDownloadItems = currentBulkDownloadItems.filter(
        _ => _.itemId != itemObj.itemId,
      );
      currItemIds = currItemIds.filter(_ => _ != itemObj.itemId);
    } else {
      if (currentBulkDownloadItems) {
        currentBulkDownloadItems.push(itemObj);
        currItemIds.push(itemObj.itemId);
      } else {
        currentBulkDownloadItems = [];
        currentBulkDownloadItems.push(itemObj);
        currItemIds.push(itemObj.itemId);
      }
    }
    console.log(currentBulkDownloadItems, 'mc data hai', currItemIds);
    setBulkDownloadItems(currentBulkDownloadItems);
    setBulkItemIds(currItemIds);
  };

  useEffect(() => {
    let currentItemIds = [];
    if (selectAll) {
      currentItemIds = ([...OrderData] || []).map((_, i) => _.itemId);
      setBulkItemIds([...currentItemIds]);
    } else {
      setBulkItemIds([]);
    }
  }, [selectAll]);

  useEffect(() => {
    if (selectedTab == 'SHIPMENT' && bulkItemIds && bulkItemIds.length) {
      console.log('bhk bulkActions', bulkItemIds.length);
      setBulkActionsModal(true);
    }
  }, [bulkItemIds]);

  // const selectItemId = itemId => {

  //   let currentItemIds = [...bulkItemIds];
  //   if (currentItemIds.includes(itemId)) {
  //     currentItemIds = currentItemIds.filter(_ => _ != itemId);
  //   } else {
  //     if (currentItemIds) {
  //       currentItemIds.push(itemId);
  //     } else {
  //       currentItemIds = [];
  //       currentItemIds.push(itemId);
  //     }
  //   }
  //   setBulkItemIds(currentItemIds);
  // };

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
      return (
        <View
          style={{
            flex: 1,
            //backgroundColor:"#ccc",
            justifyContent: 'center',
            alignContent: 'center',
            height: '100%',
            padding: Dimension.padding20,
          }}>
          <ActivityIndicator
            //style={{alignSelf: 'center'}}
            color={colors.BrandColor}
            size={'large'}
          />
        </View>
      );
    }
    return null;
  };

  const renderListEmptyComponent = () => {
    if (
      profileStatus == STATE_STATUS.FETCHED &&
      profileData.verificationStatus < 10
    ) {
      return (
        <View style={styles.emptyWrap}>
          <Image
            source={require('../../assets/images/pending_approval.png')}
            style={{ width: 300, height: 200 }}
          />
          <Text style={styles.emptyTxt}>
            Your profile is incomplete, please complete your profile, To get
            started
          </Text>
        </View>
      );
    } else if (
      profileStatus == STATE_STATUS.FETCHED &&
      profileData.verificationStatus == 10
    ) {
      return (
        <View style={styles.emptyWrap}>
          <Image
            source={require('../../assets/images/pending_approval.png')}
            style={{ width: 300, height: 200 }}
          />
          <Text style={styles.emptyTxt}>
            Your profile is currently in approval pending stage Once approved
            you will start receiving orders
          </Text>
        </View>
      );
    } else if (
      profileStatus == STATE_STATUS.FETCHED &&
      OrderData.size == 0 &&
      OrderStatus == STATE_STATUS.FETCHED
    ) {
      return (
        <View style={styles.emptyWrap}>
          <Image
            source={require('../../assets/images/emptyOrders.png')}
            style={{ width: 300, height: 200 }}
          />
          <Text style={styles.emptyTxt}>No Data Available</Text>
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
      fetchOrdersFunc(pageIndex + 1, '', selectedTab, shipmentType, {
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
    fetchOrdersFunc(0, inputValue, selectedTab, shipmentType, {
      pickupFromDate: '',
      pickupToDate: '',
      poFromDate: '',
      poToDate: '',
      orderType: [],
      deliveryType: [],
      orderRefs: [],
    });
  };

  //applied filters api hit
  const applyFilters = () => {
    setOrdersFiltersModal(false);
    fetchOrdersFunc(0, inputValue, selectedTab, shipmentType, {
      pickupFromDate: pickupFromDate,
      pickupToDate: pickupToDate,
      poFromDate: poFromDate,
      poToDate: poToDate,
      orderType: appliedFilter['orderType'],
      deliveryType: appliedFilter['deliveryType'],
      orderRefs: appliedFilter['orderRefs'],
    });
  };

  //reset filters api hit
  const resetFilters = () => {
    fetchOrdersFunc(0, '', selectedTab, shipmentType, {
      pickupFromDate: '',
      pickupToDate: '',
      poFromDate: '',
      poToDate: '',
      orderType: [],
      deliveryType: [],
      orderRefs: [],
    });
    setAppliedFilter({});
    setOrdersFiltersModal(false);
  };

  const onBulkAccept = async () => {
    try {
      setBulkAcceptLoader(true);
      const { data } = await acceptBulk({
        supplierId: await AsyncStorage.getItem('userId'),
        itemIds: bulkItemIds,
      });
      if (data && data.success) {
        setBulkAcceptLoader(false);
        setBulkItemIds([]);
        fetchOrdersFunc(0, inputValue, selectedTab, shipmentType, {
          pickupFromDate: pickupFromDate || '',
          pickupToDate: pickupToDate || '',
          poFromDate: poFromDate || '',
          poToDate: poToDate || '',
          orderType: appliedFilter['orderType'] || [],
          deliveryType: appliedFilter['deliveryType'] || [],
          orderRefs: appliedFilter['orderRefs'] || [],
        });
      } else {
        setBulkAcceptLoader(false);
        Toast.show({
          type: 'success',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      setBulkAcceptLoader(false);
      console.log(error);
    }
  };

  // const handleKeyDown = e => {
  //   console.log(e, e && e.nativeEvent && e.nativeEvent.key);
  // };

  return (
    <View style={{ flex: 1, backgroundColor: colors.grayShade7 }}>
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
        <ActivityIndicator style={{ alignSelf: 'center', margin: 12 }} />
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
            {/* <TouchableOpacity
              onPress={() => props.navigation.navigate('Notification')}
              style={styles.notifocationBtn}>
              <CustomeIcon
                name={'notification'}
                size={Dimension.font22}
                color={colors.FontColor}
              />
            </TouchableOpacity> */}
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
            style={{ paddingBottom: 380 }}
            contentContainerStyle={{
              paddingBottom: 380,
              backgroundColor: '#fff',
            }}
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            onEndReached={({ distanceFromEnd }) => {
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

          {ordersfiltersModal && (
            <OrdersFilterModal
              ordersfiltersModal={ordersfiltersModal}
              setOrdersFiltersModal={setOrdersFiltersModal}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              selectedTab={selectedTab}
              appliedFilter={appliedFilter}
              setAppliedFilter={setAppliedFilter}
              initialFilter={initialFilter}
              setInitialFilter={setInitialFilter}
              selectFilter={selectFilter}
              applyFilters={applyFilters}
              pickupFromDate={pickupFromDate || appliedFilter['pickupFromDate']}
              pickupToDate={pickupToDate || appliedFilter['pickupToDate']}
              setPickupFromDate={setPickupFromDate}
              setPickupToDate={setPickupToDate}
              poFromDate={poFromDate || appliedFilter['poFromDate']}
              poToDate={poToDate || appliedFilter['poToDate']}
              setPoFromDate={setPoFromDate}
              setPoToDate={setPoToDate}
              resetFilters={resetFilters}
            />
          )}
          <View style={styles.footerWrap}>
            <View style={styles.footerSearchWrap}>
              <View style={styles.searchWrapper}>
                <TextInput
                  placeholder={'Search MSN/Product Name/PO Id/PO Item Id'}
                  returnKeyType={'search'}
                  onChangeText={onSearchText}
                  onFocus={() => console.log('onFocus!!')}
                  value={inputValue}
                  onSubmitEditing={event => {
                    if (inputValue && inputValue.length > 1) {
                      onSubmitSearch();
                    }
                  }}
                  blurOnSubmit={true}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.SearchInputCss}>
                  
                  </TextInput>
                <CustomeIcon
                  name={'search'}
                  style={styles.seacrhIcon}></CustomeIcon>
              </View>
              {/* <TextInput
              blurOnSubmit={true}
              style={{color: '#000'}}
              placeholder={'Search MSN/Product Name/PO Id/PO Item Id'}
              placeholderTextColor={'#888'}
              selectionColor={'#888'}
              returnKeyType={'search'}
              onChangeText={onSearchText}
              onFocus={() => console.log('onFocus!!')}
              value={inputValue}
              onSubmitEditing={event => {
                if (inputValue && inputValue.length > 1) {
                  onSubmitSearch();
                }
              }}
            /> */}
              {!isKeyboardVisible ? (
                <View style={styles.filterBtnWrap}>
                  <TouchableOpacity
                    style={styles.filterBtn}
                    onPress={() => setOrdersFiltersModal(true)}>
                    <Text style={styles.filtertxt}>Filters</Text>
                    <CustomeIcon
                      name={'filter-line'}
                      style={styles.filterIcon}></CustomeIcon>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
            {ordersfiltersModal && (
              <OrdersFilterModal
                shipmentType={shipmentType}
                ordersfiltersModal={ordersfiltersModal}
                setOrdersFiltersModal={setOrdersFiltersModal}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                selectedTab={selectedTab}
                appliedFilter={appliedFilter}
                setAppliedFilter={setAppliedFilter}
                initialFilter={initialFilter}
                setInitialFilter={setInitialFilter}
                selectFilter={selectFilter}
                applyFilters={applyFilters}
                pickupFromDate={
                  pickupFromDate || appliedFilter['pickupFromDate']
                }
                pickupToDate={pickupToDate || appliedFilter['pickupToDate']}
                setPickupFromDate={setPickupFromDate}
                setPickupToDate={setPickupToDate}
                poFromDate={poFromDate || appliedFilter['poFromDate']}
                poToDate={poToDate || appliedFilter['poToDate']}
                setPoFromDate={setPoFromDate}
                setPoToDate={setPoToDate}
                resetFilters={resetFilters}
              />
            )}
            {bulkItemIds && bulkItemIds.length ? (
              <TouchableOpacity
                onPress={() => {
                  setSelectAll(!selectAll);
                }}
                style={styles.selectAllBtn}>
                <Text style={styles.selectBtnTxt}>
                  Select All ({bulkItemIds.length})
                </Text>
                <CustomeIcon
                  name={selectAll ? 'checkbox-tick' : 'checkbox-blank'}
                  color={'#fff'}
                  size={Dimension.font18}
                  onPress={() => {
                    setSelectAll(!selectAll);
                    // bulkSelect();
                  }}></CustomeIcon>
                {/* <MaterialCommunityIcon
                name={selectAll ? 'checkbox-marked' : 'checkbox-blank-outline'}
                onPress={() => {
                  setSelectAll(!selectAll);
                }}
                size={20}
                color={selectAll ? 'blue' : '#000'}
              /> */}
              </TouchableOpacity>
            ) : null}
            {selectedTab !== 'SHIPMENT' && bulkItemIds && bulkItemIds.length ? (
              <View style={styles.bulkItemfooter}>
                <View style={styles.CountWrap}>
                  <Text style={styles.selectedtxt}>Selcted</Text>
                  <Text style={styles.Counttxt}>
                    {bulkItemIds && bulkItemIds.length < 10
                      ? `0${bulkItemIds.length}`
                      : bulkItemIds.length}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={onBulkAccept}
                  style={styles.BulkAcceptbtn}>
                  <Text style={styles.BulkAcceptTxt}>BULK ACCEPT</Text>
                  {bulkAcceptLoader && (
                    <ActivityIndicator
                      size={'small'}
                      color={'white'}
                      style={{ marginRight: 4 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            ) : null}

            {selectedTab == 'SHIPMENT' &&
              bulkItemIds &&
              bulkItemIds.length &&
              bulkActionsModal ? (
              <BulkActionsModal
                bulkActionsModal={bulkActionsModal}
                setBulkActionsModal={setBulkActionsModal}
                bulkItemIds={bulkItemIds}
                selectedTab={selectedTab}
                shipmentType={shipmentType}
                bulkDownloadItems={bulkDownloadItems}
              />
            ) : null}
          </View>
        </>
      )}
    </View>
  );
};

export default OrdersScreen;
