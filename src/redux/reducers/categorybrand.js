import {STATE_STATUS} from '../constants/index';
import {CATEGORY_BRAND_ACTIONS} from '../constants/categorybrand';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  data: {},
};

export const categorybrandReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case CATEGORY_BRAND_ACTIONS.FETCH_BRANDS_BY_CATEGORY:
      return {
        ...state,
        status: STATE_STATUS.FETCHING,
      };
    case CATEGORY_BRAND_ACTIONS.FETCHED_BRANDS_BY_CATEGORY:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        data: payload.data,
      };
    case CATEGORY_BRAND_ACTIONS.FAILED_FETCH_BRANDS_BY_CATEGORY:
      return {
        ...state,
        status: STATE_STATUS.FAILED_FETCH,
        error: error,
      };
    default:
      return state;
  }
};
