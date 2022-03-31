import axios from 'axios';
import {BASE_URL, SUPPLIER_CENTRAL_API} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getOrders = async (
  page,
  search,
  orderStage,
  onlineShipmentMode,
  filter,
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
      filter,
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

export const getpoChallan = async orderRef =>
  axios.get(`https://purchase.moglilabs.com/purchase/api/v1/po/challan-spo`, {
    params: {poID: orderRef, system: `SC`},
    headers: {
      Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbXNAb21nbGl4LmNvbSIsImlkUmVmcmVzaFRva2VuIjo2MzYsImV4cCI6MTY3MTA5MDM3OSwiaWF0IjoxNjM5NTU0Mzc5LCJlbWFpbCI6ImVtc0BvbWdsaXguY29tIn0.D-BMqbDVgZGn-qVIL4sbWL7WQyq0lvWeNwB_ZZnCTw2m-_3lFV8X02WK6SNcE1eOVbKXAdvH7KbzfeyFqOJzfg`,
    },
  });

// export const getpoChallan = async orderRef =>
//   axios.get(
//     `https://purchase.moglilabs.com/purchase/api/v1/po/challan-spo?poid=121336&cid=356`,
//   );

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

export const getTabItemCount = async (onlineShipmentMode, supplierId, tabRef) =>
  axios.post(
    `${BASE_URL}searchapi/order/tabItemCount`,
    {
      onlineShipmentMode,
      supplierId,
      tabRef,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );

export const acceptBulk = async payload =>
  axios.post(
    `${BASE_URL}api/order/acceptBulk`,
    {
      ...payload,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );

export const viewSerialNumber = async payload =>
  axios.post(
    `${BASE_URL}api/order/oms/getSerialNumber`,
    {
      ...payload,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );

export const addSerialNumber = async payload =>
  axios.post(
    `${BASE_URL}api/order/oms/addSerialNumber`,
    {
      ...payload,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );
