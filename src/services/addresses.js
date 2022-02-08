import axios from 'axios';
import {QA_BASE_URL} from '../redux/constants/index';

export const getAddressesDetails = (userId, token) =>
  axios.get(`${QA_BASE_URL}profile/addressList`, {
    // params: {customerid: userId, orderid: orderId},
    headers: {
      'x-access-token': token,
      'userId': userId,
    },
}); 