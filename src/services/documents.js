import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';

export const uploadDocumentService = (body, token) =>
  axios.post(`${BASE_URL}profile/file/upload`, body, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data;',
    },
  });

export const submitProfile = token =>
  axios.get(`${BASE_URL}profile/submit`, {
    headers: {
      Authorization: token,
    },
  });

export const getDocuments = token =>
  axios.get(`${BASE_URL}profile/documents`, {
    headers: {
      Authorization: token,
    },
  });
