import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const uploadDocumentService = async (body, token) =>
  axios.post(`${BASE_URL}profile/file/upload`, body, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data;',
    },
  });

export const submitProfile = token =>
  axios.get(`${BASE_URL}profile/submit`, {
    headers: {
      Authorization: token,
    },
  });

export const getDocuments = async token =>
  axios.get(`${BASE_URL}profile/documents`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
