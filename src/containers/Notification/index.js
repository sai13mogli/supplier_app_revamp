import React, {useEffect,useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SectionList,
  Image,
  
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
import CustomeIcon from "../../component/common/CustomeIcon"
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';
import styles from './style';
const NotificationScreen = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [singleNotificationAction, setsingleNotificationAction] = useState(false);
  const notifications = useSelector(
    state => state.notificationsReducer.data || [],
  );
  const notificationsStatus = useSelector(
    state => state.notificationsReducer.status || STATE_STATUS.FETCHING,
  );
  const notificationsMaxpage = useSelector(
    state => state.notificationsReducer.maxPage || 1,
  );

  const notificationsPage = useSelector(
    state => state.notificationsReducer.page || 1,
  );


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotifications(1));
  }, []);

  const onEndReached = () => {
    if (
      notificationsStatus == STATE_STATUS.FETCHED &&
      notificationsPage + 1 < notificationsMaxpage
    ) {
      dispatch(fetchNotifications(notificationsPage + 1));
    }
  };

  const getTime = time => {
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    let date = new Date(time);
    let currentDate = new Date();
    if (currentDate.getFullYear() == date.getFullYear()) {
      if (currentDate.getMonth() == date.getMonth()) {
        if (currentDate.getDate() == date.getDate()) {
          return `Today`;
        } else if (currentDate.getDate() - date.getDate() == 1) {
          return `Yesterday`;
        } else {
          return `${date.getDate()} ${
            months[date.getMonth()]
          } ${date.getFullYear()}`;
        }
      } else {
        return `${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`;
      }
    } else {
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={
          //styles.notificationWrap
          styles.ActivenotificationWrap
        }
          
          >
          <View style={{flexDirection:"row",flex:7,alignItems:"center"}}>
            <View 
            style={ 
              //styles.iconWrap
              styles.ActioniconWrap
            }>
            <CustomeIcon 
             // name={'support-line'} 
              name={'orders-line'}
              size={Dimension.font20}
              //color={Colors.eyeIcon}
              color={Colors.BrandColor}
              onPress={() => dispatch(deleteNotification(item.id))}
              >
            </CustomeIcon>

            </View>
          {/* <Icon
          name={'close'}
          color={'red'}
          onPress={() => dispatch(deleteNotification(item.id))}
        /> */}
        {/* <Text style={styles.titleCss}>{item.title}</Text> */}
        <Text style={styles.titleCss}>{item.content}</Text>
          </View>
        <View style={{flex:3,alignItems:"flex-end"}}>
        {item.readStatus ? null : (
          <TouchableOpacity onPress={() => setsingleNotificationAction(true)}>
          <Icon
          name={'dots-horizontal'}
          color={Colors.FontColor}
          size={Dimension.font20}
          //onPress={() => dispatch(markRead(item.id))}
          >
        </Icon>
        </TouchableOpacity>
        )}
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

  return (
    <>
    <View style={styles.ContainerCss}>
      <Header showText={'Notifications'} rightIconName ={'notification'} />
     
     
      <SectionList
        onEndReachedThreshold={0.9}
        onEndReached={onEndReached}
        ListEmptyComponent={
          notificationsStatus !== STATE_STATUS.FETCHING ? (
            <View style={styles.EmptyNotificationList}>
               <Image source={require('../../assets/images/EmptyNotification.png')} 
                   style={{height:Dimension.height200,width:Dimension.width200}} />
              <Text style={styles.boldtxt}>
                  No Notifications Yet
              </Text>
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
          <Icon
          name={'dots-horizontal'}
          color={Colors.FontColor}
          size={Dimension.font20}
          onPress={() => setModalVisible(true)}
          ></Icon>
          </View>
          
        )}
        sections={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-item`}
        style={{marginHorizontal:Dimension.margin8}}
      />
    </View>
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
        <Text style={styles.ModalHeading}>Action</Text>
        <CustomeIcon
          name={'close'}
          size={Dimension.font22}
          color={Colors.FontColor}
          onPress={() => setModalVisible(false)}></CustomeIcon>
      </View>
      <View style={{padding: Dimension.padding20,marginBottom:Dimension.margin40}}>

      <TouchableOpacity onPress={() => dispatch(markBulkRead())} style={styles.modalBtn}>
        <CustomeIcon name={'right-tick-line'} size={Dimension.font20} color={Colors.FontColor} ></CustomeIcon>
        <Text style={styles.ModalTxt}>Mark as Read</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(deleteBulk())} style={styles.modalBtn}>
      <CustomeIcon name={'delete'} size={Dimension.font20} color={Colors.FontColor} ></CustomeIcon>
       
        <Text style={styles.ModalTxt}>Delete Notification</Text>
      </TouchableOpacity>
      
        </View>
        </View>
        </Modal>



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
      <View style={{padding: Dimension.padding20,marginBottom:Dimension.margin40}}>

      <TouchableOpacity onPress={() => dispatch(markRead(item.id))} style={styles.modalBtn}>
        <CustomeIcon name={'right-tick-line'} size={Dimension.font20} color={Colors.FontColor} ></CustomeIcon>
        <Text style={styles.ModalTxt}>Mark as Read</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(deleteNotification(item.id))} style={styles.modalBtn}>
      <CustomeIcon name={'delete'} size={Dimension.font20} color={Colors.FontColor} ></CustomeIcon>
       
        <Text style={styles.ModalTxt}>Delete Notification</Text>
      </TouchableOpacity>
      
        </View>
        </View>
        </Modal>
        </>

  );
};

export default NotificationScreen;
