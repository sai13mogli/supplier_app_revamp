import {OrderedMap} from 'immutable';

export const CATEGORY_BRAND_ACTIONS = {
  FETCH_BRANDS_BY_CATEGORY: 'FETCH_BRANDS_BY_CATEGORY',
  FETCHED_BRANDS_BY_CATEGORY: 'FETCHED_BRANDS_BY_CATEGORY',
  FAILED_FETCH_BRANDS_BY_CATEGORY: 'FAILED_FETCH_BRANDS_BY_CATEGORY',
  FETCH_BRANDS: 'FETCH_BRANDS',
  FETCHED_BRANDS: 'FETCHED_BRANDS',
  FAILED_FETCH_BRANDS: 'FAILED_FETCH_BRANDS',
  FETCH_BRANDS_ALPHABETS: 'FETCH_BRANDS_ALPHABETS',
  FETCHED_BRANDS_ALPHABETS: 'FETCHED_BRANDS_ALPHABETS',
  FAILED_FETCH_BRANDS_ALPHABETS: 'FAILED_FETCH_BRANDS_ALPHABETS',
  ADD_BRAND: 'ADD_BRAND',
  REMOVE_BRAND: 'REMOVE_BRAND',
  ADD_CATEGORY: 'ADD_CATEGORY',
  REMOVE_CATEGORY: 'REMOVE_CATEGORY',
  ADD_BRAND_DATA: 'ADD_BRAND_DATA',
  SET_POPULAR_CATEGORIES: 'SET_POPULAR_CATEGORIES',
  SET_SELECT_CATEGORIES: 'SET_SELECT_CATEGORIES',
  FETCH_CATEGORIES_BRANDS: 'FETCH_CATEGORIES_BRANDS',
  FETCHED_CATEGORIES_BRANDS: 'FETCHED_CATEGORIES_BRANDS',
  FAILED_FETCH_CATEGORIES_BRANDS: 'FAILED_FETCH_CATEGORIES_BRANDS',
  EMPTY_CATEGORIES: 'EMPTY_CATEGORIES',
  SET_CATEGORIES: 'SET_CATEGORIES',
  UPDATE_BRAND_DATA: 'UPDATE_BRAND_DATA',
  CONFRIM_BRANDS: 'CONFIRM_BRANDS',
  ADD_MULTIPLE_BRANDS: 'ADD_MULTIPLE_BRANDS',
  REMOVE_RAISED_BRANDS: 'REMOVE_RAISED_BRANDS',
  // SET_CATEGORIES: 'SET_CATEGORIES',
};

export const CATEGORIES = new OrderedMap({
  122000000: {
    categoryId: '122000000',
    category: 'Safety',
  },
  260000000: {
    categoryId: '260000000',
    category: 'Electricals',
  },
});

export const ALPHABETS = [
  '0-9',
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
  90,
];
