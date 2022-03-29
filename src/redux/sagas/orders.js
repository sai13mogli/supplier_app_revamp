// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {ORDERS_ACTIONS} from '../constants/orders';
// api call
import {getOrders, getTabCount, getTabItemCount} from '../../services/orders';
// actions
import {
  fetchedOrders,
  failedFetchOrders,
  fetchedTabCount,
  failedFetchTabCount,
  failedFetchPO,
  fetchedPOs,
} from '../actions/orders';

function* fetchOrder({
  payload: {page, search, orderStage, onlineShipmentMode, filters},
}) {
  try {
    const {data, error} = yield call(
      getOrders,
      page,
      search,
      orderStage,
      onlineShipmentMode,
      filters,
    );
    if (error) {
      yield put(failedFetchOrders(error));
    } else {
      yield put(fetchedOrders(page, data.data));
    }
  } catch (error) {
    console.log(error, 'catchError');
    yield put(failedFetchOrders(error));
  }
}

function* fetchTabCounts({payload: {filters}}) {
  try {
    const {data, error} = yield call(getTabCount, filters);
    if (error) {
      yield put(failedFetchTabCount(error));
    } else {
      yield put(fetchedTabCount(data.data));
    }
  } catch (error) {
    yield put(failedFetchTabCount(error));
  }
}

function* fetchPOIds({payload: {onlineShipmentMode, supplierId, tabRef}}) {
  try {
    const {data, error} = yield call(
      getTabItemCount,
      onlineShipmentMode,
      supplierId,
      tabRef,
    );
    if (error) {
      yield put(failedFetchPO(error));
    } else {
      console.log('po data hai dost', data);
      yield put(fetchedPOs(data.data));
    }
  } catch (error) {
    yield put(failedFetchPO(error));
  }
}

export default fork(function* () {
  yield takeEvery(ORDERS_ACTIONS.FETCH_ORDERS, fetchOrder);
  yield takeEvery(ORDERS_ACTIONS.FETCH_TAB_COUNT, fetchTabCounts);
  yield takeEvery(ORDERS_ACTIONS.FETCH_PO, fetchPOIds);
});
