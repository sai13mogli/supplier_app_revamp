import {ADDRESSES_ACTIONS} from '../constants/addresses';

export const fetchAddressDetails = (data) => {
  return {
    type: ADDRESSES_ACTIONS.FETCH_ADDRESSES,
    payload: {data},
  };
 
};

export const fetchedAddressDetails = (data, params) => {
  return {
    type: ADDRESSES_ACTIONS.FETCHED_FETCH_ADDRESSES,
    payload: {
      data,
      params
    },
  };
};

export const failedFetchAddressDetails = error => {
  return {
    type: ADDRESSES_ACTIONS.FAILED_FETCH_ADDRESSES,
    error,
  };
};