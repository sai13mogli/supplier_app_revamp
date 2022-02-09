import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';

const AUTH = 'http://supplierapiqa.moglilabs.com/';

export const loginWithPass = data => axios.post(`${AUTH}auth/login`, data);
