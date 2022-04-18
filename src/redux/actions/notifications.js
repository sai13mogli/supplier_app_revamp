import { NOTIFICATIONS_ACTIONS } from '../constants/notifications';

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

export const markRead = id => {
  return {
    type: NOTIFICATIONS_ACTIONS.MARK_READ,
    payload: {
      id,
    },
  };
};

export const deleteNotification = id => {
  return {
    type: NOTIFICATIONS_ACTIONS.DELETE_NOTIFICATION,
    payload: {
      id,
    },
  };
};

export const markBulkRead = () => {
  return {
    type: NOTIFICATIONS_ACTIONS.MARK_BULK_READ,
  };
};

export const deleteBulk = () => {
  return {
    type: NOTIFICATIONS_ACTIONS.DELETE_BULK,
  };
};

