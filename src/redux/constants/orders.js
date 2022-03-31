export const ORDERS_ACTIONS = {
  FETCH_ORDERS: 'FETCH_ORDERS',
  FETCHED_ORDERS: 'FETCHED_ORDERS',
  FAILED_FETCH_ORDERS: 'FAILED_FETCH_ORDERS',

  FETCH_TAB_COUNT: 'FETCH_TAB_COUNT',
  FETCHED_TAB_COUNT: 'FETCHED_TAB_COUNT',
  FAILED_FETCH_TAB_COUNT: 'FAILED_FETCH_TAB_COUNT',

  FETCH_PO: 'FETCH_PO',
  FETCHED_PO: 'FETCHED_PO',
  FAILED_FETCH_PO: 'FAILED_FETCH_PO',
};

export const orderFiltersTypeData = [
  {title: 'PO ID', key: 'orderRefs'},
  {title: 'Pickup Date', key: 'pickupDate'},
  {title: 'PO Date', key: 'poDate'},
  {title: 'Order Type', key: 'orderType'},
  {title: 'Delivery Type', key: 'deliveryType'},
];

export const orderfiltersData = {
  orderType: [
    {key: 'GST', title: 'GST'},
    {key: 'RETAIL', title: 'Retail'},
  ],
  deliveryType: [
    {key: 'ONE_SHIP', title: 'OneShip'},
    {key: 'DROP_SHIP', title: 'DropShip'},
    {key: 'DOOR_DELIVERY', title: 'Door Delivery'},
  ],
};
