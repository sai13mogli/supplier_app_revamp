import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';

export const uploadDocumentService = (body, token) =>
  axios.post(`${BASE_URL}profile/file/upload`, body, {
    headers: {
      "Authorization": token,
      'Content-Type': 'multipart/form-data;',
    },
  });
