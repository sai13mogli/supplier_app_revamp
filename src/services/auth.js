import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';

const AUTH = 'http://supplierapiqa.moglilabs.com/';

export const loginWithPass = data => axios.post(`${AUTH}auth/login`, data);

export const sendOtpForLogin = phone =>
  axios.get(`${AUTH}auth/sendOtp?phone=${phone}`);

export const sendOtpForSignUp = data => axios.post(`${AUTH}util/sendOtp`, data);

export const loginWithOtp = data => axios.post(`${AUTH}auth/otpLogin`, data);

export const verifyOtp = data => axios.post(`${AUTH}util/verifyOtp`, data);

export const loginWithGoogle = data =>
  axios.post(`${AUTH}auth/googleLogin`, data);

export const getAllCategories = () => axios.get(`${AUTH}util/categoryList`);

export const signUp = data => axios.post(`${AUTH}auth/newSignup`, data);
