import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import VersionCheck from 'react-native-version-check';

export const submitDocuments = async (body, supplierId) =>
  axios.post(`${BASE_URL}profile/submitDocuments`, body, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      supplierId: supplierId,
    },
  });

export const uploadDocumentService = async (body, token) =>
  axios.post(`${BASE_URL}profile/file/upload`, body, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data;',
    },
    params: {
      Platform: 'App',
      OS: Platform.OS,
      Version: VersionCheck.getCurrentVersion(),
    },
  });

export const submitProfile = token =>
  axios.get(`${BASE_URL}profile/submit`, {
    headers: {
      Authorization: token,
    },
    params: {
      Platform: 'App',
      OS: Platform.OS,
      Version: VersionCheck.getCurrentVersion(),
    },
  });

export const getDocuments = async token =>
  axios.get(`${BASE_URL}profile/documents`, {
    headers: {
      Authorization: token,
    },
  });
