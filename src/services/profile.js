import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getBusinessDetails = async () =>
  axios.get(`${BASE_URL}profile/businessInfo`, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const setBusinessDetails = async data =>
  axios.post(`${BASE_URL}profile/updateBusinessInfo`, data, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const setUpdateTDSDetails = async data =>
  axios.post(`${BASE_URL}profile/updateTdsInfo`, data, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const getProfile = async () =>
  axios.get(`${BASE_URL}profile/profileInfo`, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const getUserInfo = async () =>
  axios.get(`${BASE_URL}profile/info`, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const getAddressesDetails = async () =>
  axios.get(`${BASE_URL}profile/addressList`, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const getBankDetails = async () =>
  axios.get(`${BASE_URL}profile/bankAccount`, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const getTdsInfoDetails = async () =>
  axios.get(`${BASE_URL}profile/tdsInfoList`, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const setBankDetails = async data =>
  axios.post(`${BASE_URL}profile/updateBankAccount`, data, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const setDeleteAddress = async data =>
  axios.post(`${BASE_URL}profile/deleteAddress?id=${data.id}`, data, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const setUpdateBillingAddress = async data =>
  axios.post(`${BASE_URL}profile/updateAddress`, data, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const setSaveAddress = async () =>
  axios.get(`${BASE_URL}profile/submitAddress`, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const setSaveBankDetail = async data =>
  axios.post(`${BASE_URL}profile/updateBankAccount`, data, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const getPincodeDetails = async pin =>
  axios.get(`https://supplierapiqa.moglilabs.com/util/getStateCity?pin=${pin}`);

export const getIfscCodeDetails = async ifscCode =>
  axios.get(
    `https://supplierapiqa.moglilabs.com/util/bankDetails?ifsc=${ifscCode}`,
  );

export const getGstDetails = async gstin =>
  axios.get(
    `https://supplierapiqa.moglilabs.com/util/validateGstin?gstin=${gstin}`,
  );

export const getCategoriesBrands = async () =>
  axios.get(`${BASE_URL}profile/fetchCataegoriesAndBrands`, {
    headers: {
      userId: await AsyncStorage.getItem('userId'),
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const sendOtpForVerification = async type =>
  axios.get(`${BASE_URL}profile/sendOtp`, {
    params: {type: type},
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const updatePhone = async data =>
  axios.post(`${BASE_URL}profile/updatePhone`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const updateEmail = async data =>
  axios.post(`${BASE_URL}profile/updateEmail`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });

export const sendVerificationEmail = async () =>
  axios.get(`${BASE_URL}profile/sendVerificationMail`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
