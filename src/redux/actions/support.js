import {SUPPORT_ACTIONS} from '../constants/support';

export const fetchTickets = (page, days, openOnly, search) => {
  return {
    type: SUPPORT_ACTIONS.FETCH_TICKETS,
    payload: {
      page,
      days,
      openOnly,
      search,
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
