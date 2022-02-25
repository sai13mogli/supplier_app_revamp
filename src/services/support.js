import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTickets = async (pageNum, daysCount, openOnly, search) =>
  axios.post(
    `${BASE_URL}api/ticket/list`,
    {
      pageNum,
      daysCount,
      openOnly,
      search,
      ticketNumber: '',
      recordLimit: 30,
      supplierId: await AsyncStorage.getItem('userId'),
      orderBy: 'CREATED_AT',
      OrderDir: 'DESC',
    },
    {
      // params: {customerid: userId, orderid: orderId},
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );