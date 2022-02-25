import {STATE_STATUS} from '../constants/index';
import {SUPPORT_ACTIONS} from '../constants/support';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  data: [],
  page: 0,
};

export const supportReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case SUPPORT_ACTIONS.FETCH_TICKETS:
      if (payload.page == 1) {
        return {
          data: [],
          page: payload.page,
          days: payload.days,
          openOnly: payload.openOnly,
          search: payload.search,
          status: STATE_STATUS.FETCHING,
        };
      } else {
        return {
          ...state,
          // page: payload.page,
          days: payload.days,
          openOnly: payload.openOnly,
          search: payload.search,
          status: STATE_STATUS.FETCHING,
        };
      }
    case SUPPORT_ACTIONS.FETCHED_TICKETS:
      if (payload.page == 1) {
        return {
          ...state,
          status: STATE_STATUS.FETCHED,
          page: payload.page,
          data: payload.data.dataList,
        };
      } else {
        return {
          ...state,
          status: STATE_STATUS.FETCHED,
          page: payload.page,
          data: [...state.data, ...payload.data.dataList],
        };
      }
    case SUPPORT_ACTIONS.FAILED_FETCH_TICKETS:
      return {
        ...state,
        status: STATE_STATUS.FAILED_FETCH,
        error: error,
      };
    default:
      return state;
  }
};
