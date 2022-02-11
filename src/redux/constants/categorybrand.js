import {OrderedMap} from 'immutable';

export const CATEGORY_BRAND_ACTIONS = {
  FETCH_BRANDS_BY_CATEGORY: 'FETCH_BRANDS_BY_CATEGORY',
  FETCHED_BRANDS_BY_CATEGORY: 'FETCHED_BRANDS_BY_CATEGORY',
  FAILED_FETCH_BRANDS_BY_CATEGORY: 'FAILED_FETCH_BRANDS_BY_CATEGORY',
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
