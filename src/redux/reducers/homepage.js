import {STATE_STATUS} from '../constants/index';
import {HOMEPAGE_ACTIONS} from '../constants/homepage';
import {PROFILE_ACTIONS} from '../constants/profile';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  data: [],
  version: '',
};

export const homepageReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case HOMEPAGE_ACTIONS.SET_VERSION:
      return {
        ...state,
        version: payload.version,
      };
    case HOMEPAGE_ACTIONS.FETCH_PRODUCTS:
      return {
        ...state,
        status: STATE_STATUS.FETCHING,
      };
    case HOMEPAGE_ACTIONS.FETCHED_PRODUCTS:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        data: payload.data,
      };
    case HOMEPAGE_ACTIONS.FAILED_FETCH_ADDRESSES:
      return {
        ...state,
        status: STATE_STATUS.FAILED_FETCH,
        error: error,
      };
    case PROFILE_ACTIONS.LOGOUT:
      return {
        status: STATE_STATUS.UNFETCHED,
        data: [],
      };
    default:
      return state;
  }
};
