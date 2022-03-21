import {List, OrderedMap} from 'immutable';
import {STATE_STATUS} from '../constants/index';
import {PROFILE_ACTIONS} from '../constants/profile';
import {ORDERS_ACTIONS} from '../constants/orders';

const initialState = new OrderedMap({
  orders: new OrderedMap({
    error: null,
    status: STATE_STATUS.UNFETCHED,
    totalRecords: 1,
    searchString: '',
    orderStage: '',
    onlineShipmentMode: '',
    filters: {},
    data: new List([]),
    page: 1,
    maxPage: 5,
  }),
  tabCounts: new OrderedMap({
    status: STATE_STATUS.UNFETCHED,
    error: null,
    filters: {
      supplierId: '',
      tabRef: '',
      onlineShipmentMode: '',
    },
    data: new OrderedMap({}),
  }),
});

export const ordersReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case ORDERS_ACTIONS.FETCH_ORDERS:
      if (payload.page == 0) {
        return state
          .setIn(['orders', 'status'], STATE_STATUS.FETCHING)
          .setIn(['orders', 'data'], new List([]))
          .setIn(['orders', 'searchString'], payload.search)
          .setIn(['orders', 'page'], payload.page)
          .setIn(['orders', 'orderStage'], payload.orderStage)
          .setIn(['orders', 'onlineShipmentMode'], payload.onlineShipmentMode)
          .setIn(['orders', 'filters'], payload.filters);
      }
      return state
        .setIn(['orders', 'status'], STATE_STATUS.FETCHING)
        .setIn(['orders', 'page'], payload.page);
    case ORDERS_ACTIONS.FETCHED_ORDERS:
      if (payload.page == 0) {
        return state
          .setIn(['orders', 'status'], STATE_STATUS.FETCHED)
          .setIn(['orders', 'data'], new List(payload.data.orderList))
          .setIn(['orders', 'totalRecords'], payload.data.totalRecords)
          .setIn(
            ['orders', 'maxPage'],
            payload.data.totalRecords / payload.data.size,
          );
      }
      return state
        .setIn(['orders', 'status'], STATE_STATUS.FETCHED)
        .mergeIn(['orders', 'data'], new List(payload.data.orderList))
        .setIn(['orders', 'totalRecords', payload.data.totalRecords])
        .setIn(
          ['orders', 'maxPage'],
          payload.data.totalRecords / payload.data.size,
        );
    case ORDERS_ACTIONS.FAILED_FETCH_ORDERS:
      return state
        .setIn(['orders', 'error'], error)
        .setIn(['orders', 'status'], STATE_STATUS.FAILED_FETCH);

    case ORDERS_ACTIONS.FETCH_TAB_COUNT:
      return state
        .setIn(['tabCounts', 'status'], STATE_STATUS.FETCHING)
        .setIn(['tabCounts', 'data'], new OrderedMap({}))
        .setIn(['tabCounts', 'filters'], payload.filters);
    case ORDERS_ACTIONS.FETCHED_TAB_COUNT:
      return state
        .setIn(['tabCounts', 'status'], STATE_STATUS.FETCHED)
        .setIn(['tabCounts', 'data'], new OrderedMap(payload.data));
    case ORDERS_ACTIONS.FAILED_FETCH_TAB_COUNT:
      return state
        .setIn(['tabCounts', 'error'], error)
        .setIn(['tabCounts', 'status'], STATE_STATUS.FAILED_FETCH);

    case PROFILE_ACTIONS.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
