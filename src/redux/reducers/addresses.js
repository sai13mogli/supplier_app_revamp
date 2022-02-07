import {STATE_STATUS} from '../constants/index';
import {ADDRESSES_ACTIONS} from '../constants/addresses';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  addresses: [],
};

export const addressesReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case ADDRESSES_ACTIONS.FETCH_ADDRESSES:
      return {
        ...state,
        status: STATE_STATUS.FETCHING,
      };
    case ADDRESSES_ACTIONS.FETCHED_FETCH_ADDRESSES:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        addresses: payload.data,
      };
     
    case ADDRESSES_ACTIONS.FAILED_FETCH_PRODUCTS:
      return {
        ...state,
        status: STATE_STATUS.FAILED_FETCH,
        error: error,
      };
    default:
      return state;
  }
};