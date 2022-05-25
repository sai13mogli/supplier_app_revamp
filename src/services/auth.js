import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';

const AUTH = 'https://supplierapi.moglix.com/';
const APP_INFO = 'https://supplier.moglix.com/';

export const getAppInfo = () =>
  axios.get(`${APP_INFO}registration/loadconfig?key=3dbd9ad8253e`);

export const loginWithPass = data => axios.post(`${AUTH}auth/login`, data);

export const sendOtpForLogin = phone =>
  axios.get(`${AUTH}auth/sendOtp?phone=${phone}`);

export const sendOtpForSignUp = data => axios.post(`${AUTH}util/sendOtp`, data);

export const loginWithOtp = data => axios.post(`${AUTH}auth/otpLogin`, data);

export const verifyOtp = data => axios.post(`${AUTH}util/verifyOtp`, data);

export const forgotPassword = data =>
  axios.get(`${AUTH}auth/forgotPassword?key=${data.email}`);

export const loginWithGoogle = data =>
  axios.post(`${AUTH}auth/googleLogin`, data);

export const getAllCategories = () => axios.get(`${AUTH}util/categoryList`);

export const signUp = data => axios.post(`${AUTH}auth/newSignup`, data);

export const validateEmailPhone = data =>
  axios.post(
    `${AUTH}auth/validateEmailPhone?email=${data.email}&phone=${data.phone}`,
  );

export const setUserPassword = async password =>
  axios.post(
    `${BASE_URL}profile/createPassword?password=${password}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );

export const rmLogin = data => axios.post(`${AUTH}auth/rmLogin`, data);

export const replaceToken = async payloadObj =>
  axios.post(`${BASE_URL}api/device/replaceToken`, payloadObj, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
