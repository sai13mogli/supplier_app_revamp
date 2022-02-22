import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getNotifications = async () =>
  axios.post(
    `${BASE_URL}api/notification/list`,
    {size: 100, currentPage: 0},
    {
      // params: {customerid: userId, orderid: orderId},
      headers: {
        userId: await AsyncStorage.getItem('userId'),
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );
