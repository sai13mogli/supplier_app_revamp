import {ORDERS_ACTIONS} from '../constants/orders';

export const fetchOrders = (
  page,
  search,
  orderStage,
  onlineShipmentMode,
  filters,
) => {
  return {
    type: ORDERS_ACTIONS.FETCH_ORDERS,
    payload: {
      page,
      search,
      orderStage,
      onlineShipmentMode,
      filters,
    },
  };
};

export const fetchedOrders = (page, data) => {
  return {
    type: ORDERS_ACTIONS.FETCHED_ORDERS,
    payload: {
      page,
      data,
    },
  };
};

export const failedFetchOrders = error => {
  return {
    type: ORDERS_ACTIONS.FAILED_FETCH_ORDERS,
    error,
  };
};

export const fetchTabCount = filters => {
  return {
    type: ORDERS_ACTIONS.FETCH_TAB_COUNT,
    payload: {
      filters,
    },
  };
};

export const fetchedTabCount = data => {
  return {
    type: ORDERS_ACTIONS.FETCHED_TAB_COUNT,
    payload: {
      data,
    },
  };
};

export const failedFetchTabCount = error => {
  return {
    type: ORDERS_ACTIONS.FAILED_FETCH_TAB_COUNT,
    error,
  };
};

export const fetchPOs = ({supplierId, tabRef}) => {
  return {
    type: ORDERS_ACTIONS.FETCH_PO,
    payload: {
      onlineShipmentMode: '',
      supplierId,
      tabRef,
    },
  };
};

export const fetchedPOs = data => {
  return {
    type: ORDERS_ACTIONS.FETCHED_PO,
    payload: {
      data,
    },
  };
};

export const failedFetchPO = error => {
  return {
    type: ORDERS_ACTIONS.FAILED_FETCH_PO,
    error,
  };
};
