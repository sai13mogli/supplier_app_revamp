import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SectionList,
} from 'react-native';
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
        style={{
          borderRadius: 4,
          padding: 12,
          borderWidth: 0.5,
          marginTop: 12,
          marginHorizontal: 12,
          borderColor: '#000',
        }}>
        <Icon
          name={'close'}
          color={'red'}
          onPress={() => dispatch(deleteNotification(item.id))}
        />
        <Text style={{color: '#000'}}>{item.title}</Text>
        <Text style={{color: '#000'}}>{item.content}</Text>
        <Text style={{color: '#000'}}>{getTime(item.createdAt)}</Text>
        {item.readStatus ? null : (
          <TouchableOpacity onPress={() => dispatch(markRead(item.id))}>
            <Text style={{color: 'red'}}>Mark Read</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, marginVertical: 12}}>
      <Text>NotificationScreen</Text>
      <TouchableOpacity onPress={() => dispatch(markBulkRead())}>
        <Text style={{color: 'red'}}>Mark all read</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(deleteBulk())}>
        <Text style={{color: 'red'}}>Clear all Notification</Text>
      </TouchableOpacity>
      <SectionList
        onEndReachedThreshold={0.9}
        onEndReached={onEndReached}
        ListEmptyComponent={
          notificationsStatus !== STATE_STATUS.FETCHING ? (
            <Text style={{alignSelf: 'center', margin: 12, color: '#000'}}>
              No Notifications Found
            </Text>
          ) : null
        }
        renderSectionHeader={({section}) => (
          <Text style={{color: '#000'}}>{section.title}</Text>
        )}
        sections={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-item`}
      />
    </View>
  );
};

export default NotificationScreen;
