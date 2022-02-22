import {STATE_STATUS} from '../constants/index';
import {NOTIFICATIONS_ACTIONS} from '../constants/notifications';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  data: [],
};

export const notificationsReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case NOTIFICATIONS_ACTIONS.FETCH_NOTIFICATIONS:
      return {
        ...state,
        status: STATE_STATUS.FETCHING,
      };
    case NOTIFICATIONS_ACTIONS.FETCHED_NOTIFICATIONS:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        data: payload.data,
      };
    case NOTIFICATIONS_ACTIONS.FAILED_FETCH_NOTIFICATIONS:
      return {
        ...state,
        status: STATE_STATUS.FAILED_FETCH,
        error: error,
      };
    default:
      return state;
  }
};
