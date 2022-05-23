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
  Dimensions,
  Linking,
} from 'react-native';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
import {STATE_STATUS} from '../../redux/constants';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders, fetchTabCount} from '../../redux/actions/orders';
import {getImageUrl, acceptBulk} from '../../services/orders';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDown from '../../component/common/DropDown';
import Ordercard from '../../component/Ordercard';
import styles from './style';
import CustomeIcon from '../../component/common/CustomeIcon';
import OrdersFilterModal from '../../component/OrdersFilterModal';
import Toast from 'react-native-toast-message';
import BulkActionsModal from '../../component/BulkActionsModal';
import {fetchProfile, setNavigation} from '../../redux/actions/profile';
import Colors from '../../Theme/Colors';
import {requestUserPermission} from '../../utils/firebasepushnotification';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from '../../generic/navigator';
import analytics from '@react-native-firebase/analytics';
import {getAppInfo} from '../../services/auth';
import {setVersion} from '../../redux/actions/homepage';
import AppUpdateBanner from '../../component/common/AppUpdateBanner';

const OrdersScreen = props => {
  const dispatch = useDispatch();

  const profileStatus = useSelector(
    state => (state.profileReducer || {}).status || STATE_STATUS.UNFETCHED,
  );

  const profileData = useSelector(state => state.profileReducer.data || {});
  const navigateProfile = useSelector(
    state => state.profileReducer.navigateProfile || false,
  );
  const notifications = useSelector(
    state => state.notificationsReducer.data || [],
  );
  const scrollRef = useRef(null);
  const tabStatus = useSelector(state =>
    state.ordersReducer.getIn(['tabCounts', 'status']),
  );
  const tabData = useSelector(state =>
    state.ordersReducer.getIn(['tabCounts', 'data']),
  );
  const OrderStatus = useSelector(state =>
    state.ordersReducer.getIn(['orders', 'status']),
  );
  const OrderStage = useSelector(state =>
    state.ordersReducer.getIn(['orders', 'orderStage']),
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

  const RETAIN_TABS = {
    PENDING_ACCEPTANCE: 'Open_Orders',
    SCHEDULED_PICKUP: 'Open_Orders',
    PICKUP: 'Open_Orders',
    UPLOAD_INVOICE: 'Open_Orders',
    PACKED: 'Open_Orders',
    SHIPMENT: 'Open_Orders',
    MARK_SHIPPED: 'Open_Orders',
    FULFILLED: 'Fulfilled_Orders',
    CANCELLED: 'Cancelled',
    RETURN_PENDING: 'Returned',
    RETURN_DONE: 'Returned',
  };

  const [loadingTabs, setLoadingTabs] = useState(true);
  const [selectedType, setSelectedType] = useState(
    RETAIN_TABS[OrderStage] || 'Open_Orders',
  );
  const [selectedTab, setSelectedTab] = useState(
    props.route.params.selectedTab || OrderStage || 'PENDING_ACCEPTANCE',
  );
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
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const COMMON_OPTIONS = [
    {label: 'Open Orders', key: 'Open_Orders', value: 'Open_Orders'},
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

  const ONLINE_OPTIONS = [
    {label: 'Open Orders', key: 'Open_Orders', value: 'Open_Orders'},
    {
      label: 'Fulfilled Orders',
      key: 'Fulfilled_Orders',
      value: 'Fulfilled_Orders',
    },
    {
      label: 'Returned Orders',
      key: 'Returned',
      value: 'Returned',
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
      {label: 'Mark Shipped/Delivered', key: 'MARK_SHIPPED'},
    ],
    Fulfilled_Orders: [{label: 'Fulfilled', key: 'FULFILLED'}],
    Cancelled: [{label: 'Cancelled', key: 'CANCELLED'}],
    Returned: [
      {label: 'Return Pending', key: 'RETURN_PENDING'},
      {label: 'Return Done', key: 'RETURN_DONE'},
    ],
  };

  useEffect(() => {
    if (profileData && profileData.verificationStatus !== 15) {
    } else {
      if (tabStatus == STATE_STATUS.FETCHED && loadingTabs) {
        setLoadingTabs(false);
        const index = TABS[selectedType].findIndex(_ => _.key == selectedTab);
        upButtonHandler(index + 1);
      }
    }
  }, [tabStatus]);

  useEffect(() => {
    if (
      profileStatus == STATE_STATUS.FETCHED &&
      profileData.verificationStatus < 10 &&
      initLoader &&
      props.navigation.getState().history.length <= 1 &&
      navigateProfile
    ) {
      dispatch(setNavigation(false));
      setInitLoader(false);
      props.navigation.push('Profile');
    }
  }, [profileStatus]);

  const getNotif = async () => {
    const {data} = await getAppInfo();
    if (data) {
      if (data && data.list && data.list.find(_ => _.name == 'APP_VERSION')) {
        dispatch(
          setVersion(
            data.list
              .find(_ => _.name == 'APP_VERSION')
              .value.split('.')
              .join(''),
          ),
        );
      }
    }
    const status = await AsyncStorage.getItem('notification');
    if (status == 'true' || !status) {
      await requestUserPermission();
      await messaging()
        .hasPermission()
        .then(async enabled => {
          if (enabled) {
            messaging().setBackgroundMessageHandler(async remoteMessage => {
              showToastNotification(remoteMessage);
            });
            //app is running in background
            messaging().onNotificationOpenedApp(remoteMessage => {
              handleOpenUrl(remoteMessage, true, '');
              // navigation.navigate(remoteMessage.data.type);
            });

            // app is in foreground
            messaging().onMessage(async remoteMessage => {
              showToastNotification(remoteMessage);

              // handleOpenUrl(remoteMessage, true, '');
            });

            //app is in quit state
            messaging()
              .getInitialNotification()
              .then(remoteMessage => {
                if (remoteMessage) {
                  handleOpenUrl(remoteMessage, true, '');
                }
              });
          }
        });
    }

    try {
      let deepLinkData = await AsyncStorage.getItem('@deepLinkUrl');
      deepLinkData = JSON.parse(deepLinkData);
      if (deepLinkData) {
        const {screen, obj} = deepLinkData;
        if (screen) {
          handleOpenUrl(obj, false, screen);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showToastNotification = remoteMsg => {
    Toast.show({
      type: 'success',
      text2: `${remoteMsg.data.title} \n ${remoteMsg.data.body}`,
      visibilityTime: 5000,
      autoHide: true,
    });
  };

  const handleOpenUrl = async (event, fromNotification, deepLinkScreen) => {
    let obj = {};
    let screen = '';
    if (event && event.data && fromNotification) {
      obj = JSON.parse(event.data.params) || {};
      screen = event.data.screen;
      if (screen == 'Orders') {
        if (obj.parentTab) {
          setSelectedType(obj.parentTab);
        }
        if (obj.childTab) {
          setSelectedTab(obj.childTab);
          fetchOrdersFunc(0, '', obj.childTab, shipmentType, {
            pickupFromDate: '',
            pickupToDate: '',
            poFromDate: '',
            poToDate: '',
            orderType: [],
            deliveryType: [],
            orderRefs: [],
          });
          // fetchTabCountFunc(obj.childTab, shipmentType);
        }
      } else {
        props.navigation.push(screen, {
          ...obj,
        });
      }
    } else {
      obj = event;
      if (deepLinkScreen == 'Orders') {
        if (obj.parentTab) {
          setSelectedType(obj.parentTab);
        }
        if (obj.childTab) {
          setSelectedTab(obj.childTab);
          fetchOrdersFunc(0, '', obj.childTab, shipmentType, {
            pickupFromDate: '',
            pickupToDate: '',
            poFromDate: '',
            poToDate: '',
            orderType: [],
            deliveryType: [],
            orderRefs: [],
          });
          fetchTabCountFunc(obj.childTab, shipmentType);
        }
      } else {
        props.navigation.push(deepLinkScreen, {...obj});
      }
      await AsyncStorage.removeItem('@deepLinkUrl');
    }
  };

  useEffect(() => {
    getNotif();
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
      setLoadingTabs(true);
    }

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const getOptions = () => {
    if (!profileData.enterpriseFlag) {
      return ONLINE_OPTIONS;
    } else {
      return COMMON_OPTIONS;
    }
  };

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
        key={index}
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
        setLoadingTabs={setLoadingTabs}
        itemId={item.itemId}
        invoiceUrl={item.invoiceUrl || item.poUrl}
        manifestId={item.manifestId}
        bulkItemIds={bulkItemIds}
        setBulkItemIds={setBulkItemIds}
        selectItemId={selectItemId}
        shipmentUrl={item.shipmentUrl}
        podUrl={item.podUrl}
        selectItemData={selectItemData}
        OrderStage={OrderStage}
        remark={item.remark}
        source={item.source}
        statusText={item.statusText}
        initialPickupDate={item.initialPickupDate}
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
    fetchTabCountFunc(val.key, shipmentType);
    setLoadingTabs(true);
    setSelectAll(false);
    resetFilters(true);
    setTabsAnalytics(val);
  };

  const setTabsAnalytics = async tab => {
    let date = new Date();
    let supplierId = await AsyncStorage.getItem('userId');
    let currTab = mutateTabName(tab);
    if (currTab) {
      await analytics().logEvent(`${currTab}`, {
        action: `click`,
        label: getLabel(),
        supplierID: `${supplierId}`,
        datetimestamp: `${date.getTime()}`,
      });
    }
  };

  const setOrdersAnalytics = async currText => {
    let date = new Date();
    let supplierId = await AsyncStorage.getItem('userId');
    let currOrderType = mutateOrderType(currText);
    if (currOrderType) {
      await analytics().logEvent(`${currOrderType}`, {
        action: `click`,
        supplierID: `${supplierId}`,
        datetimestamp: `${date.getTime()}`,
      });
    }
    setSelectedType(currText);
  };

  const mutateTabName = tabKey => {
    switch (tabKey && tabKey.key) {
      case 'PENDING_ACCEPTANCE':
        return `AcceptancePendingTab`;
      case 'SCHEDULED_PICKUP':
        return `ScheduledPickupTab`;
      case 'PICKUP':
        return `PickupTab`;
      case 'UPLOAD_INVOICE':
        return `UploadInvoiceTab`;
      case 'MARK_SHIPPED':
        return `MarkedShippedTab`;
      case 'RETURN_PENDING':
        return `ReturnPendingTab`;
      case 'RETURN_DONE':
        return `ReturnCompleteTab`;
      default:
        return ``;
    }
  };

  const getLabel = () => {
    if (profileData && profileData.enterpriseFlag && profileData.onlineFlag) {
      return `supplier type_both`;
    } else if (
      profileData &&
      profileData.enterpriseFlag &&
      !profileData.onlineFlag
    ) {
      return `supplier type_enterprise`;
    } else {
      return `supplier type_online`;
    }
  };

  const mutateOrderType = paramOrderType => {
    switch (paramOrderType) {
      case 'Fulfilled_Orders':
        return `FulfilledOrderTab`;
      case 'Cancelled':
        return `CancelledOrderTab`;
      case 'Returned':
        return `ReturnedOrderTab`;
      default:
        return ``;
    }
  };

  //selectedFilter
  const selectFilter = term => {
    let currentFilters = {...appliedFilter};
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
    console.log(currentItemIds.includes(itemId), itemId);
    if (currentItemIds.includes(itemId)) {
      currentItemIds = currentItemIds.filter(_ => _ != itemId);
    } else {
      if (currentItemIds && currentItemIds.length) {
        currentItemIds.push(itemId);
      } else {
        currentItemIds = [];
        currentItemIds.push(itemId);
      }
    }
    if (currentItemIds && currentItemIds.length == OrderData.toArray().length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
    console.log(currentItemIds);
    setBulkItemIds([...currentItemIds]);
  };

  //select Item Data
  const selectItemData = itemObj => {
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
    if (currItemIds.length == OrderData.toArray().length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
    setBulkDownloadItems([...currentBulkDownloadItems]);
    setBulkItemIds([...currItemIds]);
  };

  useEffect(() => {
    let currentItemIds = [];
    if (selectAll) {
      currentItemIds = ([...OrderData] || []).map((_, i) => _.itemId);
      setBulkItemIds([...currentItemIds]);
    } else {
      // setBulkItemIds([]);
    }
  }, [selectAll]);

  useEffect(() => {
    if (selectedTab == 'SHIPMENT' && bulkItemIds && bulkItemIds.length) {
      setBulkActionsModal(true);
    }
  }, [bulkItemIds]);

  const upButtonHandler = tabIndex => {
    scrollRef.current.scrollTo({
      x: tabIndex == 1 ? 0 : tabIndex * 60,
      y: 0,
      animated: true,
    });
  };

  const getTabs = (tab, tabIndex, selectedType) => {
    if (selectedType == 'Open_Orders') {
      if (tab.key == 'PENDING_ACCEPTANCE') {
        if (profileData.enterpriseFlag) {
          return profileData.enterpriseFlag;
        }
      } else if (tab.key == 'SCHEDULED_PICKUP') {
        return true;
      } else if (tab.key == 'PICKUP') {
        if (
          profileData.enterpriseFlag ||
          (profileData.onlineFlag &&
            profileData.onlineShipmentMode == 'ONESHIP')
        ) {
          return true;
        }
      } else if (tab.key == 'UPLOAD_INVOICE') {
        if (
          profileData.enterpriseFlag ||
          (profileData.onlineFlag &&
            profileData.onlineShipmentMode == 'DROPSHIP')
        ) {
          return true;
        }
      } else if (tab.key == 'PACKED') {
        if (
          profileData.onlineFlag &&
          profileData.onlineShipmentMode == 'DROPSHIP'
        ) {
          return true;
        }
      } else if (tab.key == 'SHIPMENT') {
        if (
          profileData.onlineFlag &&
          profileData.onlineShipmentMode == 'DROPSHIP'
        ) {
          return true;
        }
      } else if (tab.key == 'MARK_SHIPPED') {
        if (
          profileData.enterpriseFlag ||
          (profileData.onlineFlag &&
            profileData.onlineShipmentMode == 'DROPSHIP')
        ) {
          return true;
        }
      }
    } else if (selectedType == 'Fulfilled_Orders') {
      return true;
    } else if (selectedType == 'Cancelled') {
      return true;
    } else {
      return true;
    }
  };

  const textRenderer = label => {
    let isSlash = label.includes('/');
    let chunks = [];
    if (isSlash) {
      chunks = label.split('/');
      return chunks.join('/\n');
    } else {
      chunks = label.split(' ');
      return chunks.join('\n');
    }
  };

  const renderHeaderComponent = () => {
    return (
      <ScrollView
        bounces
        horizontal={true}
        ref={scrollRef}
        style={styles.TopTabWrap}
        contentContainerStyle={{paddingBottom: Dimension.padding30}}>
        {TABS[selectedType].map((tab, tabIndex) =>
          getTabs(tab, tabIndex, selectedType) ? (
            <TouchableOpacity
              onPress={() => {
                changeTab(tab);
              }}
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
                {textRenderer(tab.label)} ({tabData.get(tab.key)})
              </Text>
            </TouchableOpacity>
          ) : null,
        )}
      </ScrollView>
    );
  };

  const renderFooterComponent = () => {
    if (OrderStatus == STATE_STATUS.FETCHING) {
      return (
        <View
          style={{
            padding: 100,
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
      profileData.verificationStatus == 16
    ) {
      return (
        <View style={styles.emptyWrap}>
          <Image
            source={require('../../assets/images/rejected.png')}
            style={{width: 350, height: 300}}
          />
          <Text style={styles.profilependingTxt}>
            Your profile is rejected, as it does not{'\n'}match to our
            requirements
          </Text>
        </View>
      );
    } else if (
      profileStatus == STATE_STATUS.FETCHED &&
      profileData.verificationStatus < 10
    ) {
      return (
        <View style={styles.emptyWrap}>
          <Image
            source={require('../../assets/images/profilePending.png')}
            style={{width: 350, height: 300}}
          />
          <Text style={styles.profilependingTxt}>
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
            style={{width: 300, height: 200}}
          />
          <Text style={styles.profilependingTxt}>
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
            style={{width: 300, height: 200}}
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
    openOrdersSearchAnalytics();
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

  const openOrdersSearchAnalytics = async () => {
    if (selectedType == 'Open_Orders') {
      let date = new Date();
      let supplierId = await AsyncStorage.getItem('userId');
      let currTab = mutateTabName(selectedTab);
      await analytics().logEvent('SearchOpenOrders', {
        action: `click`,
        label: `${inputValue}/Tabname_${currTab}`,
        supplierID: `${supplierId}`,
        datetimestamp: `${date.getTime()}`,
      });
    }
  };

  //applied filters api hit
  const applyFilters = () => {
    setOrdersFiltersModal(false);
    checkFilters();
    setOrderFiltersAnalytics();
    if (selectedType == 'Open_Orders') {
      setOrderFiltersAnlyticsOpenOrders();
    }
    fetchOrdersFunc(0, inputValue, selectedTab, shipmentType, {
      pickupFromDate: pickupFromDate,
      pickupToDate: pickupToDate,
      poFromDate: poFromDate,
      poToDate: poToDate,
      orderType: appliedFilter['orderType'] || [],
      deliveryType: appliedFilter['deliveryType'] || [],
      orderRefs: appliedFilter['orderRefs'] || [],
    });
  };

  const setOrderFiltersAnlyticsOpenOrders = async () => {
    await analytics().logEvent('ApplyOpenOrderFilter', {
      action: `submit`,
      label: `${selectedTab}`,
    });
  };

  const setOrderFiltersAnalytics = async () => {
    let filterSelected = [];
    for (let filter in appliedFilter) {
      if (filter && appliedFilter[filter]) {
        if (filter == 'orderRefs') {
          filterSelected.push(`poId`);
        } else {
          filterSelected.push(filter);
        }
      }
    }
    if (pickupFromDate && pickupToDate) {
      filterSelected.push(`pickupDate`);
    }
    if (poFromDate && poToDate) {
      filterSelected.push(`poDate`);
    }
    let filters = filterSelected.join(',');
    await analytics().logEvent('OrdersFilter', {
      action: `submit`,
      label: `filter type selected- ${filters}`,
    });
  };

  //reset filters api hit
  const resetFilters = fromChangeTab => {
    setIsFilterApplied(false);
    setPickupFromDate('');
    setPickupToDate('');
    setPoFromDate('');
    setPoToDate('');
    setActiveFilter('orderRefs');
    if (!fromChangeTab) {
      fetchOrdersFunc(0, '', selectedTab, shipmentType, {
        pickupFromDate: '',
        pickupToDate: '',
        poFromDate: '',
        poToDate: '',
        orderType: [],
        deliveryType: [],
        orderRefs: [],
      });
    }
    setAppliedFilter({});
    setOrdersFiltersModal(false);
  };

  const ctaAnalyticsBulkAccept = async label => {
    let date = new Date();
    let supplierId = await AsyncStorage.getItem('userId');
    await analytics().logEvent(`AcceptancePendingCTA`, {
      action: `click`,
      label: label,
      supplierID: `${supplierId}`,
      datetimestamp: `${date.getTime()}`,
    });
  };

  const onBulkAccept = async () => {
    try {
      ctaAnalyticsBulkAccept(`BulkAccept`);
      setBulkAcceptLoader(true);
      const {data} = await acceptBulk({
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
        fetchTabCountFunc(selectedTab, shipmentType);
        setLoadingTabs(true);
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

  const getAppliedFilter = obj => {
    for (let property in obj) {
      if (obj[property] && obj[property].length) {
        return true;
      }
    }
    return false;
  };

  const checkFilters = () => {
    if (
      getAppliedFilter(appliedFilter) ||
      pickupFromDate ||
      pickupToDate ||
      poFromDate ||
      poToDate
    ) {
      setIsFilterApplied(true);
    } else {
      setIsFilterApplied(false);
    }
  };

  const renderUnreadIcon = () => {
    let notificationsArr = ([...notifications] || []).map(_ => _.data);
    let flatArr = [];
    if (notificationsArr && notificationsArr.length) {
      flatArr = notificationsArr.flat();
    }
    let unread = (flatArr || []).find(_ => !_.readStatus);
    if (unread) {
      return <View style={styles.reddot}></View>;
    } else {
      return <></>;
    }
  };

  const navigateNotification = async () => {
    let date = new Date();
    let supplierId = await AsyncStorage.getItem('userId');
    await analytics().logEvent('NotificationIcon', {
      action: `click`,
      supplierID: `${supplierId}`,
      datetimestamp: `${date.getTime()}`,
    });
    props.navigation.navigate('Notification');
  };

  const onPressFilters = async () => {
    await analytics().logEvent(`OrdersFilter`, {
      action: `click`,
      label: getLabel(),
    });
    setOrdersFiltersModal(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.grayShade7}}>
      <View style={styles.topHeaderWrap}>
        <DropDown
          title={'Orders'}
          // label={'Orders'}
          selectedValue={selectedType}
          onValueChange={text => {
            setOrdersAnalytics(text);
            // setSelectedType(text);
            changeTab(TABS[text][0]);
          }}
          items={getOptions()}
          enabled={true}
          isFromOrders={true}
        />

        <TouchableOpacity
          onPress={() => navigateNotification()}
          style={{
            //position: 'relative',
            paddingLeft: Dimension.padding8,
            marginTop: Dimension.margin20,
          }}>
          <CustomeIcon
            name={'notification-3-line'}
            size={Dimension.font20}
            color={colors.FontColor}></CustomeIcon>
          {renderUnreadIcon()}
        </TouchableOpacity>
      </View>
      <AppUpdateBanner />
      {tabStatus == STATE_STATUS.FETCHING ? (
        <View
          style={{
            flex: 1,
            height: Dimensions.get('window').height,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          <ActivityIndicator
            color={colors.BrandColor}
            style={{alignSelf: 'center', margin: 12}}
            size={'large'}
          />
        </View>
      ) : (
        <>
          {renderHeaderComponent()}
          <FlatList
            bounces
            data={OrderData.toArray()}
            // stickyHeaderIndices={[0]}
            renderItem={renderItem}
            ListEmptyComponent={renderListEmptyComponent}
            keyExtractor={(item, index) => `${index}-item`}
            // ListHeaderComponent={renderHeaderComponent}
            ListFooterComponent={renderFooterComponent}
            onEndReachedThreshold={0.9}
            style={{paddingBottom: 380}}
            contentContainerStyle={{
              paddingBottom: 380,
              backgroundColor: colors.grayShade1,
            }}
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

          <View style={styles.footerWrap}>
            {profileStatus == STATE_STATUS.FETCHED &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17].includes(
              profileData.verificationStatus,
            ) ? null : (
              <View style={styles.footerSearchWrap}>
                <View style={styles.searchWrapper}>
                  <TextInput
                    placeholder={'Search MSN/Product Name/PO Id/PO Item Id'}
                    returnKeyType={'search'}
                    onChangeText={onSearchText}
                    // onFocus={() => console.log('onFocus!!')}
                    value={inputValue}
                    onSubmitEditing={event => {
                      if (inputValue && inputValue.length > 1) {
                        onSubmitSearch();
                      }
                    }}
                    blurOnSubmit={true}
                    ellipsizeMode="tail"
                    placeholderTextColor={Colors.eyeIcon}
                    numberOfLines={1}
                    style={styles.SearchInputCss}></TextInput>
                  <CustomeIcon
                    onPress={() => {
                      if (inputValue && inputValue.length > 1) {
                        onSubmitSearch();
                      }
                    }}
                    name={'search'}
                    style={styles.seacrhIcon}></CustomeIcon>
                </View>
                {!isKeyboardVisible ? (
                  <View style={styles.filterBtnWrap}>
                    <TouchableOpacity
                      style={styles.filterBtn}
                      onPress={() => onPressFilters()}>
                      <Text style={styles.filtertxt}>Filters</Text>
                      {isFilterApplied ? (
                        <View style={styles.filterApplied}></View>
                      ) : null}
                      <CustomeIcon
                        name={'filter-line'}
                        style={styles.filterIcon}></CustomeIcon>
                      {/* <Image
                      source={require('../../assets/images/filterLine.png')}
                      style={{ width:Dimension.width16, height:Dimension.height16}}
                    /> */}
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            )}
            {/* )} */}
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
                  if (selectAll) {
                    setBulkItemIds([]);
                  }
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
                    if (selectAll) {
                      setBulkItemIds([]);
                    }
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
                      style={{marginRight: 4}}
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

export default React.memo(OrdersScreen);
