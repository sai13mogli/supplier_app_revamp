import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SectionList,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  deleteBulk,
  deleteNotification,
  fetchNotifications,
  markBulkRead,
  markRead,
} from '../../redux/actions/notifications';
import {STATE_STATUS} from '../../redux/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../component/common/Header';
import CustomeIcon from '../../component/common/CustomeIcon';
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
const NotificationScreen = props => {
  const notifications = useSelector(
    state => state.notificationsReducer.data || [],
  );
  const notificationsStatus = useSelector(
    state => state.notificationsReducer.status || STATE_STATUS.FETCHING,
  );
  const notificationsMaxpage = useSelector(
    state => state.notificationsReducer.maxPage || 0,
  );

  const notificationsPage = useSelector(
    state => state.notificationsReducer.page || 0,
  );

  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [singleNotificationAction, setsingleNotificationAction] =
    useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    dispatch(fetchNotifications(0));
  }, []);

  useEffect(() => {
    if (!singleNotificationAction) {
      setSelectedOrder({});
    }
  }, [singleNotificationAction]);

  const onEndReached = () => {
    if (
      notificationsStatus == STATE_STATUS.FETCHED &&
      notificationsPage + 1 < notificationsMaxpage
    ) {
      dispatch(fetchNotifications(notificationsPage + 1));
    }
  };

  const notificationsStatusIcon = status => {
    console.log('statu', status);

    switch (status) {
      case status == 1:
        return 'orders-line';
        break;
      case status == 2:
        return 'orders-line';
        break;
      case status == 3:
        return 'orders-line';
        break;
      case status == 4:
        return 'orders-line';
        break;
      case status == 5:
        return 'orders-line';
        break;
      case status == 6:
        return 'orders-line';
        break;
      case status == 7:
        return 'orders-line';
        break;
      case status == 8:
        return 'orders-line';
        break;
      case status == 9:
        return 'orders-line';

        break;
      default:
        break;
    }
  };

  const getTime = time => {
    let date = new Date(time);
    return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    } ${date.getHours() < 12 ? 'PM' : 'AM'}`;
  };

  const getNotificationIcon = recordType => {
    if (recordType == 17 || recordType == 18) {
      return true;
    } else {
      return false;
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={
          item.readStatus
            ? styles.notificationWrap
            : styles.ActivenotificationWrap
        }>
        <View style={{flexDirection: 'row', flex: 7, alignItems: 'center'}}>
          <View
            style={item.readStatus ? styles.iconWrap : styles.ActioniconWrap}>
            <CustomeIcon
              name={
                getNotificationIcon(item.recordType)
                  ? 'support-line'
                  : 'orders-line'
              }
              // name={item.readStatus ? notificationsStatusIcon(item.recordType) : notificationsStatusIcon(item.recordType)}
              size={Dimension.font20}
              //color={Colors.eyeIcon}
              color={item.readStatus ? Colors.eyeIcon : Colors.BrandColor}
            />
          </View>
          {/* <Icon
          name={'close'}
          color={'red'}
          onPress={() => dispatch(deleteNotification(item.id))}
        /> */}
          {/* <Text style={styles.titleCss}>{item.title}</Text> */}
          <Text style={styles.titleCss}>{item.content}</Text>
        </View>
        <View style={{flex: 3, alignItems: 'flex-end'}}>
          {/* {item.readStatus ? null : ( */}
          <TouchableOpacity
            onPress={() => {
              setsingleNotificationAction(true);
              setSelectedOrder(item);
            }}>
            <Icon
              name={'dots-horizontal'}
              color={Colors.FontColor}
              size={Dimension.font20}
              //onPress={() => dispatch(markRead(item.id))}
            ></Icon>
          </TouchableOpacity>
          {/* )} */}
          <Text style={styles.timeorDateCss}>{getTime(item.createdAt)}</Text>
          {/* {item.readStatus ? null : (
          <TouchableOpacity onPress={() => dispatch(markRead(item.id))}>
            <Text style={{color: 'red'}}>Mark Read</Text>
          </TouchableOpacity>
        )} */}
        </View>
      </View>
    );
  };

  const markAllReadNotification = async () => {
    let date = new Date();
    let supplierId = await AsyncStorage.getItem('userId');
    await analytics().logEvent('Notification', {
      action: `click`,
      label: `readAll`,
      supplierID: `${supplierId}`,
      datetimestamp: `${date.getTime()}`,
    });
    dispatch(markBulkRead());
    setModalVisible(false);
  };

  const deleteAllNotification = async () => {
    let date = new Date();
    let supplierId = await AsyncStorage.getItem('userId');
    await analytics().logEvent('Notification', {
      action: `click`,
      label: `deleteAll`,
      supplierID: `${supplierId}`,
      datetimestamp: `${date.getTime()}`,
    });
    dispatch(deleteBulk());
    setModalVisible(false);
  };

  const renderBulkActions = () => {
    return (
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        onDismiss={() => setModalVisible(false)}
        overlayPointerEvents={'auto'}
        coverScreen={true}
        style={{padding: 0, margin: 0}}
        //deviceWidth={deviceWidth}
        hasBackdrop={true}>
        <View style={styles.modalContainer}>
          <View style={styles.topbdr}></View>
          <View style={styles.ModalheadingWrapper}>
            <Text style={styles.ModalHeading}>All Action</Text>
            <CustomeIcon
              name={'close'}
              size={Dimension.font22}
              color={Colors.FontColor}
              onPress={() => setModalVisible(false)}></CustomeIcon>
          </View>
          <View
            style={{
              padding: Dimension.padding20,
              marginBottom: Dimension.margin40,
            }}>
            <TouchableOpacity
              onPress={() => {
                markAllReadNotification();
              }}
              style={styles.modalBtn}>
              <CustomeIcon
                name={'right-tick-line'}
                size={Dimension.font20}
                color={Colors.FontColor}></CustomeIcon>
              <Text style={styles.ModalTxt}>Mark All Read</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                deleteAllNotification();
              }}
              style={styles.modalBtn}>
              <CustomeIcon
                name={'delete'}
                size={Dimension.font20}
                color={Colors.FontColor}></CustomeIcon>

              <Text style={styles.ModalTxt}>Delete All Notification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const readNotification = async () => {
    let date = new Date();
    let supplierId = await AsyncStorage.getItem('userId');
    await analytics().logEvent('Notification', {
      action: `click`,
      label: `read`,
      supplierID: `${supplierId}`,
      datetimestamp: `${date.getTime()}`,
    });
    dispatch(markRead(selectedOrder.id));
    setsingleNotificationAction(false);
  };

  const deleteCurrNotification = async () => {
    let date = new Date();
    let supplierId = await AsyncStorage.getItem('userId');
    await analytics().logEvent('Notification', {
      action: `click`,
      label: `delete`,
      supplierID: `${supplierId}`,
      datetimestamp: `${date.getTime()}`,
    });
    dispatch(deleteNotification(selectedOrder.id));
    setsingleNotificationAction(false);
  };

  const renderIndividualAction = () => {
    return (
      <Modal
        isVisible={singleNotificationAction}
        onBackButtonPress={() => setsingleNotificationAction(false)}
        onBackdropPress={() => setsingleNotificationAction(false)}
        onDismiss={() => setsingleNotificationAction(false)}
        overlayPointerEvents={'auto'}
        coverScreen={true}
        style={{padding: 0, margin: 0}}
        //deviceWidth={deviceWidth}
        hasBackdrop={true}>
        <View style={styles.modalContainer}>
          <View style={styles.topbdr}></View>
          <View style={styles.ModalheadingWrapper}>
            <Text style={styles.ModalHeading}>Action</Text>
            <CustomeIcon
              name={'close'}
              size={Dimension.font22}
              color={Colors.FontColor}
              onPress={() => setsingleNotificationAction(false)}></CustomeIcon>
          </View>
          <View
            style={{
              padding: Dimension.padding20,
              marginBottom: Dimension.margin40,
            }}>
            {!selectedOrder.readStatus ? (
              <TouchableOpacity
                onPress={() => {
                  readNotification();
                }}
                style={styles.modalBtn}>
                <CustomeIcon
                  name={'right-tick-line'}
                  size={Dimension.font20}
                  color={Colors.FontColor}></CustomeIcon>
                <Text style={styles.ModalTxt}>Mark as Read</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                deleteCurrNotification();
              }}
              style={styles.modalBtn}>
              <CustomeIcon
                name={'delete'}
                size={Dimension.font20}
                color={Colors.FontColor}></CustomeIcon>

              <Text style={styles.ModalTxt}>Delete Notification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <View style={styles.ContainerCss}>
        <Header
          showText={'Notifications'}
          rightIconName={'notification'}
          showBack
          navigation={props.navigation}
          fromnotification={true}
        />
        {notifications && notifications.length ? (
          <View
            style={{
              flexDirection: 'row-reverse',
              marginHorizontal: Dimension.margin20,
            }}>
            <Icon
              name={'dots-horizontal'}
              color={Colors.FontColor}
              size={Dimension.font20}
              onPress={() => setModalVisible(true)}></Icon>
          </View>
        ) : null}
        <SectionList
          onEndReachedThreshold={0.9}
          onEndReached={onEndReached}
          ListFooterComponent={
            notificationsStatus == STATE_STATUS.FETCHING ? (
              <View
              style={{
                flex: 1,
                height: Dimensions.get('window').height,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
              }}>
              <ActivityIndicator
                style={{alignSelf: 'center', margin: Dimension.margin12}}
                size={'large'}
                color={Colors.BrandColor}
              />
            </View>
            ) : null
          }
          ListEmptyComponent={
            notificationsStatus !== STATE_STATUS.FETCHING ? (
              <View style={styles.EmptyNotificationList}>
                <Image
                  source={require('../../assets/images/EmptyNotification.png')}
                  style={{
                    height: Dimension.height200,
                    width: Dimension.width200,
                  }}
                />
                <Text style={styles.boldtxt}>No Notifications Yet</Text>
                <TouchableOpacity style={styles.NewTicktbtn}>
                  <Text style={styles.NewTicktbtnTxt}>
                    Upload More Products
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
          renderSectionHeader={({section}) => (
            <View style={styles.titleDateWrap}>
              <Text style={styles.TitleDateCss}>{section.title}</Text>
            </View>
          )}
          sections={notifications}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-item`}
          style={{marginHorizontal: Dimension.margin8}}
        />
      </View>
      {renderBulkActions()}
      {renderIndividualAction()}
    </>
  );
};

export default NotificationScreen;
