// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {CATEGORY_BRAND_ACTIONS} from '../constants/categorybrand';
// api call
import {getBrandsByCategoryCodes} from '../../services/categorybrand';
// actions
import {
  failedFetchBrandsByCategory,
  fetchedBrandsByCategory,
} from '../actions/categorybrand';
//

function* fetchBrandsByCategoryCodes({payload: {payloadObj}}) {
  try {
    const {data, error} = yield call(getBrandsByCategoryCodes, payloadObj);
    if (error) {
      yield put(failedFetchBrandsByCategory(error));
    } else {
      yield put(fetchedBrandsByCategory(data.data));
    }
  } catch (error) {
    yield put(failedFetchBrandsByCategory(error));
  }
}

export default fork(function* () {
  yield takeEvery(
    CATEGORY_BRAND_ACTIONS.FETCH_BRANDS_BY_CATEGORY,
    fetchBrandsByCategoryCodes,
  );
});
