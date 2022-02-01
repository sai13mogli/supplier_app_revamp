import {HOMEPAGE_ACTIONS} from '../constants/homepage';

export const fetchHomepage = () => {
  return {
    type: HOMEPAGE_ACTIONS.FETCH_PRODUCTS,
  };
};

export const fetchedHomepage = data => {
  return {
    type: HOMEPAGE_ACTIONS.FETCHED_PRODUCTS,
    payload: {
      data,
    },
  };
};

export const failedFetchHomepage = error => {
  return {
    type: HOMEPAGE_ACTIONS.FAILED_FETCH_PRODUCTS,
    error,
  };
};
