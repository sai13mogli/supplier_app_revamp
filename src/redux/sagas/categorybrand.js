// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {CATEGORY_BRAND_ACTIONS} from '../constants/categorybrand';
// api call
import {
  getBrandsByCategoryCodes,
  getBrands,
} from '../../services/categorybrand';
// actions
import {
  failedFetchBrandsByCategory,
  fetchedBrandsByCategory,
  failedFetchBrandSearchResult,
  fetchBrandSearchResult,
  fetchedBrandSearchResult,
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

function* fetchBrands({payload: {obj}}) {
  try {
    const {data, error} = yield call(getBrands, obj);
    console.log('fetechBrandsData', data);
    if (error) {
      yield put(failedFetchBrandSearchResult(error));
    } else {
      console.log('obj hai dost', obj, data.data[obj.categoryCodes]);

      yield put(
        fetchedBrandSearchResult(
          {
            ...obj,
            categoryCodes: obj.searchString ? [] : obj.categoryCodes,
          },
          [
            ...(data.data[obj.categoryCodes] ||
              Object.values(data.data).flat()),
          ],
        ),
      );
    }
  } catch (error) {
    console.log('catchError', error);
    yield put(failedFetchBrandSearchResult(error));
  }
}

export default fork(function* () {
  yield takeEvery(
    CATEGORY_BRAND_ACTIONS.FETCH_BRANDS_BY_CATEGORY,
    fetchBrandsByCategoryCodes,
  );
  yield takeEvery(CATEGORY_BRAND_ACTIONS.FETCH_BRANDS, fetchBrands);
});
