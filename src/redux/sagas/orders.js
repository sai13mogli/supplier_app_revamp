// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {ORDERS_ACTIONS} from '../constants/orders';
// api call
import {getOrders, getTabCount} from '../../services/orders';
// actions
import {
  fetchedOrders,
  failedFetchOrders,
  fetchedTabCount,
  failedFetchTabCount,
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
      console.log(error, 'ifError');
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

export default fork(function* () {
  yield takeEvery(ORDERS_ACTIONS.FETCH_ORDERS, fetchOrder);
  yield takeEvery(ORDERS_ACTIONS.FETCH_TAB_COUNT, fetchTabCounts);
});
