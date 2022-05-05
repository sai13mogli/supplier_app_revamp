import {SUPPORT_ACTIONS} from '../constants/support';

export const fetchTickets = obj => {
  return {
    type: SUPPORT_ACTIONS.FETCH_TICKETS,
    payload: {
      obj,
    },
  };
};

export const fetchedTickets = (page, data, success) => {
  return {
    type: SUPPORT_ACTIONS.FETCHED_TICKETS,
    payload: {
      page,
      data,
      success,
    },
  };
};

export const failedFetchTickets = error => {
  return {
    type: SUPPORT_ACTIONS.FAILED_FETCH_TICKETS,
    error,
  };
};
