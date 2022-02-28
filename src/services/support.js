import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTickets = async ({page, days, openOnly, search}) =>
  axios.post(
    `${BASE_URL}api/ticket/list`,
    {
      pageNum: page,
      daysCount: days,
      openOnly,
      ticketNumber: search,
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
