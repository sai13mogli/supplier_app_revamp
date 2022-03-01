import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPPLIER = 'https://supplierapiqa.moglilabs.com/';

export const getTickets = async ({page, days, openOnly, search}) =>
  axios.post(
    `${BASE_URL}api/ticket/list`,
    {
      page,
      days,
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

export const getCategories = async () =>
  axios.get(`${SUPPLIER}util/ticketCategory`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const getSubCategories = async id =>
  axios.get(`${SUPPLIER}util/ticketSubCategory?parentId=${id}`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
