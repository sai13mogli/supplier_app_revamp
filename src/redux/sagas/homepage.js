// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {HOMEPAGE_ACTIONS} from '../constants/homepage';
// api call
import {getProducts} from '../../services/homepage';
// actions
import {fetchedHomepage, failedFetchHomepage} from '../actions/homepage';

function* fetchHomeLayout() {
  try {
    const {data, error} = yield call(getProducts);
    if (error) {
      yield put(failedFetchHomepage(error));
    } else {
      yield put(fetchedHomepage(data));
    }
  } catch (error) {
    yield put(failedFetchHomepage(error));
  }
}

export default fork(function* () {
  yield takeEvery(HOMEPAGE_ACTIONS.FETCH_PRODUCTS, fetchHomeLayout);
});
