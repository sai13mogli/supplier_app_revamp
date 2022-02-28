// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {NOTIFICATIONS_ACTIONS} from '../constants/notifications';
// api call
import {
  getNotifications,
  markNotificatioReadById,
  deleteNotificationById,
  markBulkNotificationRead,
  deleteBulkNotification,
} from '../../services/notifications';
// actions
import {
  fetchNotifications,
  fetchedNotifications,
  failedFetchNotifications,
} from '../actions/notifications';

function* fetchNotification({payload: {page}}) {
  try {
    const {data, error} = yield call(getNotifications, page);
    if (error) {
      yield put(failedFetchNotifications(error));
    } else {
      yield put(
        fetchedNotifications(page, {
          totalPages: 1,
          dataList: [
            {
              id: 1,
              title: 'test Notif',
              content: 'test conraedw ewdkfdhewd edwewdun dewdw',
              readStatus: false,
            },
            {
              id: 1,
              title: 'test titlke',
              content: 'd dwe fewf efw we weufewufew f wef ew f ew ff',
              readStatus: true,
            },
          ],
        }),
      );
      // ));
    }
  } catch (error) {
    yield put(failedFetchNotifications(error));
  }
}

function* markRead({payload: {id}}) {
  try {
    const {data, error} = yield call(markNotificatioReadById, id);
    if (error) {
    } else {
      yield put(fetchNotifications(0));
    }
  } catch (error) {}
}

function* deleteNotification({payload: {id}}) {
  try {
    const {data, error} = yield call(deleteNotificationById, id);
    if (error) {
    } else {
      yield put(fetchNotifications(0));
    }
  } catch (error) {}
}

function* markBulkRead() {
  try {
    const {data, error} = yield call(markBulkNotificationRead);
    if (error) {
    } else {
      yield put(fetchNotifications(0));
    }
  } catch (error) {}
}

function* deleteBulk() {
  try {
    const {data, error} = yield call(deleteBulkNotification);
    if (error) {
    } else {
      yield put(fetchNotifications(0));
    }
  } catch (error) {}
}

export default fork(function* () {
  yield takeEvery(NOTIFICATIONS_ACTIONS.FETCH_NOTIFICATIONS, fetchNotification);
  yield takeEvery(NOTIFICATIONS_ACTIONS.MARK_READ, markRead);
  yield takeEvery(
    NOTIFICATIONS_ACTIONS.DELETE_NOTIFICATION,
    deleteNotification,
  );
  yield takeEvery(NOTIFICATIONS_ACTIONS.MARK_BULK_READ, markBulkRead);
  yield takeEvery(NOTIFICATIONS_ACTIONS.DELETE_BULK, deleteBulk);
});
