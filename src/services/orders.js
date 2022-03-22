import axios from 'axios';
import {BASE_URL, SUPPLIER_CENTRAL_API} from '../redux/constants/index';
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

export const getImageUrl = async productMsn =>
  axios.get(`${SUPPLIER_CENTRAL_API}utility/productinfo`, {
    params: {msn: productMsn},
  });

export const acceptOrder = async body =>
  axios.post(
    `${BASE_URL}api/order/accept`,
    {
      ...body,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );

// export const getpoChallan = async orderRef =>
//   axios.get(`${SUPPLIER_CENTRAL_API}utility/pochallan`, {
//     params: {poid: orderRef, cid: 356},
//   });

export const getpoChallan = async orderRef =>
  axios.get(
    `https://suppliercentralqa.moglilabs.com/utility/pochallan?poid=121336&cid=356`,
  );

export const rejectOrder = async body =>
  axios.post(
    `${BASE_URL}api/order/reject`,
    {
      ...body,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );
