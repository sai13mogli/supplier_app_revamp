// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {SUPPORT_ACTIONS} from '../constants/support';
// api call
import {getTickets} from '../../services/support';
// actions
import {fetchedTickets, failedFetchTickets} from '../actions/support';

function* fetchTickets({payload: {obj}}) {
  try {
    const {data, error} = yield call(getTickets, obj);
    if (error) {
      yield put(failedFetchTickets(error));
    } else {
      yield put(fetchedTickets(obj.page, data.data));
    }
  } catch (error) {
    yield put(failedFetchTickets(error));
  }
}

export default fork(function* () {
  yield takeEvery(SUPPORT_ACTIONS.FETCH_TICKETS, fetchTickets);
});
