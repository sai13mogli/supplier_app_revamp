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

export const getAddressesDetails = () =>
  axios.get(`${BASE_URL}profile/addressList`,{
    headers: {
      userId: '123662',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NjY2MTAiLCJyb2xlIjoiU1VQUExJRVIiLCJpYXQiOjE2NDQzMDM1OTgsImV4cCI6MTY0NDM4OTk5OH0.YeOc23V_V5wSRrQuTqETCygVS1RSG9j2eNSRDGrbHdeMUyn0tkRey4f8zXy-srqhkuc_67BQiTGXECnJvSC6JA',
    },
  });   

export const getPincodeDetails = pin =>
  axios.get(`https://supplierapiqa.moglilabs.com/util/getStateCity?pin=${pin}`);

export const getGstDetails = gstin =>
  axios.get(
    `https://supplierapiqa.moglilabs.com/util/validateGstin?gstin=${gstin}`,
  );
