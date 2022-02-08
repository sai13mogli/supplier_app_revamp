import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';

export const getBusinessDetails = () =>
  axios.get(`${BASE_URL}profile/businessInfo`, {
    headers: {
      userId: '123662',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NjY2MTAiLCJyb2xlIjoiU1VQUExJRVIiLCJpYXQiOjE2NDQzMDM1OTgsImV4cCI6MTY0NDM4OTk5OH0.YeOc23V_V5wSRrQuTqETCygVS1RSG9j2eNSRDGrbHdeMUyn0tkRey4f8zXy-srqhkuc_67BQiTGXECnJvSC6JA',
    },
  });

export const setBusinessDetails = data =>
  axios.post(`${BASE_URL}profile/updateBusinessInfo`, data, {
    headers: {
      userId: '123662',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NjY2MTAiLCJyb2xlIjoiU1VQUExJRVIiLCJpYXQiOjE2NDQzMDM1OTgsImV4cCI6MTY0NDM4OTk5OH0.YeOc23V_V5wSRrQuTqETCygVS1RSG9j2eNSRDGrbHdeMUyn0tkRey4f8zXy-srqhkuc_67BQiTGXECnJvSC6JA',
    },
  });

export const getProfile = () =>
  axios.get(`${BASE_URL}profile/profileInfo`, {
    headers: {
      userId: '123662',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NjY2MTAiLCJyb2xlIjoiU1VQUExJRVIiLCJpYXQiOjE2NDQzMDM1OTgsImV4cCI6MTY0NDM4OTk5OH0.YeOc23V_V5wSRrQuTqETCygVS1RSG9j2eNSRDGrbHdeMUyn0tkRey4f8zXy-srqhkuc_67BQiTGXECnJvSC6JA',
    },
  });

export const getUserInfo = () =>
  axios.get(`${BASE_URL}profile/info`, {
    headers: {
      userId: '123662',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NjY2MTAiLCJyb2xlIjoiU1VQUExJRVIiLCJpYXQiOjE2NDQzMDM1OTgsImV4cCI6MTY0NDM4OTk5OH0.YeOc23V_V5wSRrQuTqETCygVS1RSG9j2eNSRDGrbHdeMUyn0tkRey4f8zXy-srqhkuc_67BQiTGXECnJvSC6JA',
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
