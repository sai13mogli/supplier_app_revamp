import {NOTIFICATIONS_ACTIONS} from '../constants/notifications';

export const fetchNotifications = () => {
  return {
    type: NOTIFICATIONS_ACTIONS.FETCH_NOTIFICATIONS,
  };
};

export const fetchedNotifications = data => {
  return {
    type: NOTIFICATIONS_ACTIONS.FETCHED_NOTIFICATIONS,
    payload: {
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
