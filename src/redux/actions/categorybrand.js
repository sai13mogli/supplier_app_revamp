import {CATEGORY_BRAND_ACTIONS} from '../constants/categorybrand';

export const fetchBrandsByCategory = payloadObj => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FETCH_BRANDS_BY_CATEGORY,
    payload: {
      payloadObj,
    },
  };
};

export const fetchedBrandsByCategory = data => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FETCHED_BRANDS_BY_CATEGORY,
    payload: {
      data,
    },
  };
};

export const failedFetchBrandsByCategory = error => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FAILED_FETCH_BRANDS_BY_CATEGORY,
    error,
  };
};
