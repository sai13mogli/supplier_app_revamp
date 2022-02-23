// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {NOTIFICATIONS_ACTIONS} from '../constants/notifications';
// api call
import {getNotifications} from '../../services/notifications';
// actions
import {
  fetchedNotifications,
  failedFetchNotifications,
} from '../actions/notifications';

function* fetchNotifications({payload: {page}}) {
  try {
    const {data, error} = yield call(getNotifications, page);
    if (error) {
      yield put(failedFetchNotifications(error));
    } else {
      yield put(fetchedNotifications(page, data.data));
    }
  } catch (error) {
    yield put(failedFetchNotifications(error));
  }
}

export default fork(function* () {
  yield takeEvery(
    NOTIFICATIONS_ACTIONS.FETCH_NOTIFICATIONS,
    fetchNotifications,
  );
});
