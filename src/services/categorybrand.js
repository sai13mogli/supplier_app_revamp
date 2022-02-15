import axios from 'axios';
import {BASE_URL, SEARCH_API_URL} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getBrandsByCategoryCodes = async data =>
  axios.post(`${SEARCH_API_URL}utils/searchBrandsOfCategories`, data, {
    headers: {
      authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const getBrands = async data =>
  axios.post(`${SEARCH_API_URL}utils/searchBrandsMap`, data, {
    headers: {
      authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
