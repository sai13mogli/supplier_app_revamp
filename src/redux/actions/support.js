import {SUPPORT_ACTIONS} from '../constants/support';

export const fetchTickets = obj => {
  return {
    type: SUPPORT_ACTIONS.FETCH_TICKETS,
    payload: {
      obj,
    },
  };
};

export const fetchedTickets = (page, data) => {
  return {
    type: SUPPORT_ACTIONS.FETCHED_TICKETS,
    payload: {
      page,
      data,
    },
  };
};

export const failedFetchTickets = error => {
  return {
    type: SUPPORT_ACTIONS.FAILED_FETCH_TICKETS,
    error,
  };
};
