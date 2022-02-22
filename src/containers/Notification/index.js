import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {fetchNotifications} from '../../redux/actions/notifications';

const NotificationScreen = props => {
  const notifications = useSelector(
    state => state.notificationsReducer.data || [],
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);
  return (
    <View>
      <Text>NotificationScreen</Text>
    </View>
  );
};

export default NotificationScreen;
