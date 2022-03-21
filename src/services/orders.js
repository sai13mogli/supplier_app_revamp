import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getOrders = async (
  page,
  search,
  orderStage,
  onlineShipmentMode,
  filters,
) =>
  axios.post(
    `${BASE_URL}searchapi/order/list`,
    {
      currentPage: page,
      supplierId: await AsyncStorage.getItem('userId'),
      searchString: search,
      pageSize: 20,
      orderStage,
      onlineShipmentMode,
      filters,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );

export const getTabCount = async filters =>
  axios.post(
    `${BASE_URL}searchapi/order/tabCount`,
    {
      ...filters,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );
