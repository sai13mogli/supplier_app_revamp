import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';

export const getProducts = () =>
  axios.get(`${BASE_URL}search/getAllCategories`);

export const getAddressesDetails = (userId, token) =>
  axios.get(`${QA_BASE_URL}profile/addressList`, {
    // params: {customerid: userId, orderid: orderId},
    headers: {
      'x-access-token': token,
      'userId': userId,
    },
}); 