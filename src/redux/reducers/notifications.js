import {STATE_STATUS} from '../constants/index';
import {NOTIFICATIONS_ACTIONS} from '../constants/notifications';
import {PROFILE_ACTIONS} from '../constants/profile';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  data: [],
  maxPage: 1,
  page: 0,
};

export const notificationsReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case NOTIFICATIONS_ACTIONS.FETCH_NOTIFICATIONS:
      if (payload.page == 0) {
        return {
          data: [],
          page: payload.page,
          status: STATE_STATUS.FETCHING,
        };
      } else {
        return {
          ...state,
          page: payload.page,
          status: STATE_STATUS.FETCHING,
        };
      }
    case NOTIFICATIONS_ACTIONS.FETCHED_NOTIFICATIONS:
      if (payload.page == 0) {
        return {
          ...state,
          maxPage: payload.data.totalPages,
          status: STATE_STATUS.FETCHED,
          data: payload.data.dataList,
        };
      } else {
        return {
          ...state,
          maxPage: payload.data.totalPages,
          status: STATE_STATUS.FETCHED,
          data: [...state.data, ...payload.data.dataList],
        };
      }
    case NOTIFICATIONS_ACTIONS.FAILED_FETCH_NOTIFICATIONS:
      return {
        ...state,
        status: STATE_STATUS.FAILED_FETCH,
        error: error,
      };
    case PROFILE_ACTIONS.LOGOUT:
      return {
        status: STATE_STATUS.UNFETCHED,
        data: [],
        maxPage: 1,
        page: 0,
      };
    default:
      return state;
  }
};
