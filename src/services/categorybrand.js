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

export const addOrUpdateCategoryAndBrand = async data =>
  axios.post(`${BASE_URL}profile/addOrUpdateCategoryAndBrand`, data, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5NTc5NSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY0NTA5ODYwNywiZXhwIjoxNjQ1MTg1MDA3fQ.CeML6dZa7XI-49KHOP-8pgx1NoFskUQqaTNnPp4azJxiZ-VfMvogoGq924iNo4hrXo4iT_V-AtkChcuU5eB-ew`,
    },
  });
