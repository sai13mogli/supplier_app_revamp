import {NOTIFICATIONS_ACTIONS} from '../constants/notifications';

export const fetchNotifications = page => {
  return {
    type: NOTIFICATIONS_ACTIONS.FETCH_NOTIFICATIONS,
    payload: {
      page,
    },
  };
};

export const fetchedNotifications = (page, data) => {
  return {
    type: NOTIFICATIONS_ACTIONS.FETCHED_NOTIFICATIONS,
    payload: {
      page,
      data,
    },
  };
};

export const failedFetchNotifications = error => {
  return {
    type: NOTIFICATIONS_ACTIONS.FAILED_FETCH_NOTIFICATIONS,
    error,
  };
};
