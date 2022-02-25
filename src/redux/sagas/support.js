// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {SUPPORT_ACTIONS} from '../constants/support';
// api call
import {getTickets} from '../../services/support';
// actions
import {fetchedTickets, failedFetchTickets} from '../actions/support';

function* fetchTickets({payload: {page, days, openOnly, search}}) {
  try {
    const {data, error} = yield call(getTickets, page, days, openOnly, search);
    if (error) {
      yield put(failedFetchTickets(error));
    } else {
      yield put(fetchedTickets(page, data.data));
    }
  } catch (error) {
    yield put(failedFetchTickets(error));
  }
}

export default fork(function* () {
  yield takeEvery(SUPPORT_ACTIONS.FETCH_TICKETS, fetchTickets);
});
