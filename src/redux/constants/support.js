export const SUPPORT_ACTIONS = {
  FETCH_TICKETS: 'FETCH_TICKETS',
  FETCHED_TICKETS: 'FETCHED_TICKETS',
  FAILED_FETCH_TICKETS: 'FAILED_FETCH_TICKETS',
};

export const filtersTypeData = [
  {title: 'Type', key: 'type'},
  {title: 'Time', key: 'time'},
];

export const filtersData = {
  type: [
    {key: 'Openclose', title: 'Open and close'},
    {key: 'Open', title: 'Open'},
    {key: 'Close', title: 'Close'},
  ],
  time: [
    {key: '7days', title: '7 days'},
    {key: '15days', title: '15 days'},
    {key: '1month', title: '1 month'},
    {key: '3months', title: '3 months'},
    {key: '6months', title: '6 months'},
  ],
};
