import React, {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {deleteBulk, deleteNotification, fetchNotifications, markBulkRead, markRead} from '../../redux/actions/notifications';
import {STATE_STATUS} from '../../redux/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../component/common/Header';

const NotificationScreen = props => {
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
    state => state.notificationsReducer.page || 0,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotifications(1));
  }, []);

  useEffect(() => {
    console.log(notifications);
  });

  const onEndReached = () => {
    console.log(notificationsPage, notificationsMaxpage, notificationsStatus);
    if (
      notificationsStatus == STATE_STATUS.FETCHED &&
      notificationsPage < notificationsMaxpage
    ) {
      dispatch(fetchNotifications(notificationsPage + 1));
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          borderRadius: 4,
          padding: 12,
          borderWidth: 0.5,
          marginTop: 12,
          marginHorizontal: 12,
          borderColor: '#000',
        }}>
          <Icon name={"close"} color={'red'} onPress={() => dispatch(deleteNotification(item.id))} />
        <Text style={{color: '#000'}}>{item.title}</Text>
        <Text style={{color: '#000'}}>{item.content}</Text>
        {item.readStatus ? null : <TouchableOpacity onPress={() => dispatch(markRead(item.id))}>
          <Text style={{color: 'red'}}>Mark Read</Text>
        </TouchableOpacity>}
      </View>
    );
  };

  return (

    <View style={{flex:1,}}>
      <Header showText={'Notifications'} rightIconName ={'notification'} />
      
      {/* <TouchableOpacity onPress={() => dispatch(markBulkRead())}>
        <Text style={{color: 'red'}}>Mark all read</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(deleteBulk())}>
        <Text style={{color: 'red'}}>Clear all Notification</Text>
      </TouchableOpacity> */}
      <FlatList
        onEndReachedThreshold={0.9}
        onEndReached={onEndReached}
        ListEmptyComponent={notificationsStatus !== STATE_STATUS.FETCHING ? <Text style={{alignSelf: 'center',margin: 12, color: '#000'}}>No Notifications Found</Text> : null}
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-item`}
      />
    </View>
  );
};

export default NotificationScreen;
