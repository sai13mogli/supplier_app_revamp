import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';

export const getBusinessDetails = () =>
  axios.get(`${BASE_URL}profile/businessInfo`, {
    headers: {
      userId: '123662',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NjY2MDEiLCJyb2xlIjoiU1VQUExJRVIiLCJpYXQiOjE2NDQyMTAwMzIsImV4cCI6MTY0NDI5NjQzMn0.5M1hc6CIbFD9XE2Uta4Fm3eWeBJGXiFGEDBgooR7fFDzclIFUNpBdTFj4j6_Uk7BiK7eegvQa3Lou8K7W9O1Mg',
    },
  });

export const setBusinessDetails = data =>
  axios.post(`${BASE_URL}profile/updateBusinessInfo`, data, {
    headers: {
      userId: '123662',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NjY2MDEiLCJyb2xlIjoiU1VQUExJRVIiLCJpYXQiOjE2NDQyMTAwMzIsImV4cCI6MTY0NDI5NjQzMn0.5M1hc6CIbFD9XE2Uta4Fm3eWeBJGXiFGEDBgooR7fFDzclIFUNpBdTFj4j6_Uk7BiK7eegvQa3Lou8K7W9O1Mg',
    },
  });

export const getPincodeDetails = pin =>
  axios.get(`https://supplierapiqa.moglilabs.com/util/getStateCity?pin=${pin}`);

export const getGstDetails = gstin =>
  axios.get(
    `https://supplierapiqa.moglilabs.com/util/validateGstin?gstin=${gstin}`,
  );
