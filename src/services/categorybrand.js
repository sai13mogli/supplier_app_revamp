import axios from 'axios';
import {BASE_URL, SEARCH_API_URL} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import VersionCheck from 'react-native-version-check';

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

export const addOrUpdateCategoryAndBrand = async data =>
  axios.post(`${BASE_URL}profile/addOrUpdateCategoryAndBrand`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
    params: {
      Platform: 'App',
      OS: Platform.OS,
      Version: VersionCheck.getCurrentVersion(),
    },
  });

export const deleteBrand = async data =>
  axios.post(`${BASE_URL}/profile/deleteBrand`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
    params: {
      Platform: 'App',
      OS: Platform.OS,
      Version: VersionCheck.getCurrentVersion(),
    },
  });
