import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {fetchNotifications} from '../../redux/actions/notifications';
import {STATE_STATUS} from '../../redux/constants';

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
        style={{
          borderRadius: 4,
          padding: 12,
          borderWidth: 0.5,
          marginTop: 12,
          marginHorizontal: 12,
          borderColor: '#000',
        }}>
        <Text style={{color: '#000'}}>{item.title}</Text>
        <Text style={{color: '#000'}}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>NotificationScreen</Text>
      <FlatList
        onEndReachedThreshold={0.9}
        onEndReached={onEndReached}
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-item`}
      />
    </View>
  );
};

export default NotificationScreen;
