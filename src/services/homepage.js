import axios from 'axios';
import {BASE_URL} from '../redux/constants/index';

export const getProducts = () =>
  axios.get(`${BASE_URL}search/getAllCategories`);
