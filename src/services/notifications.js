import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getNotifications = async currentPage =>
  axios.post(
    `${BASE_URL}api/notification/list`,
    {size: 20, currentPage},
    {
      // params: {customerid: userId, orderid: orderId},
      headers: {
        userId: await AsyncStorage.getItem('userId'),
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );

export const markNotificatioReadById = async id =>
  axios.get(`${BASE_URL}api/notification/markRead?id=${id}`, {
    // params: {customerid: userId, orderid: orderId},
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const deleteNotificationById = async id =>
  axios.get(`${BASE_URL}api/notification/delete?id=${id}`, {
    // params: {customerid: userId, orderid: orderId},
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const markBulkNotificationRead = async () =>
  axios.get(`${BASE_URL}api/notification/markReadBulk`, {
    // params: {customerid: userId, orderid: orderId},
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const deleteBulkNotification = async () =>
  axios.get(`${BASE_URL}api/notification/deleteBulk`, {
    // params: {customerid: userId, orderid: orderId},
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
