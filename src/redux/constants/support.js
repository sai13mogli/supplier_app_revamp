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
    {key: 0, title: 'Open and close'},
    {key: 7, title: 'Open'},
    // { key: 2, title: 'Close' },
  ],
  time: [
    {key: '0', title: '7 days'},
    {key: '15', title: '15 days'},
    {key: '30', title: '1 month'},
    {key: '90', title: '3 months'},
    {key: '180', title: '6 months'},
  ],
};

export const EditTdsData = {
  type: [
    {key: 1, title: 'Yes'},
    {key: 0, title: 'No'},
    {key: 2, title: 'NA'},
  ],
};
