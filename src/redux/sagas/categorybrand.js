// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {CATEGORY_BRAND_ACTIONS} from '../constants/categorybrand';
// api call
import {
  getBrandsByCategoryCodes,
  getBrands,
} from '../../services/categorybrand';
import {getCategoriesBrands} from '../../services/profile';
// actions
import {
  failedFetchBrandsByCategory,
  fetchedBrandsByCategory,
  failedFetchBrandSearchResult,
  fetchBrandSearchResult,
  fetchedBrandSearchResult,
  failedFetchBrandSearchResultByAlphabet,
  fetchedBrandSearchResultByAlphabet,
  fetchedCategoriesBrands,
  failedFetchCategoriesBrands,
  addMultipleBrands,
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
    if (error) {
      yield put(failedFetchBrandSearchResult(error));
    } else {
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

function* fetchBrandsAlphabets({payload: {obj}}) {
  try {
    const {data, error} = yield call(getBrands, obj);
    if (error) {
      yield put(failedFetchBrandSearchResultByAlphabet(error));
    } else {
      yield put(
        fetchedBrandSearchResultByAlphabet(
          {
            ...obj,
          },
          [...data.data[obj.categoryCodes]],
        ),
      );
    }
  } catch (error) {
    console.log('catchError', error);
    yield put(failedFetchBrandSearchResultByAlphabet(error));
  }
}

function* fetchCategoriesBrands() {
  try {
    const {data, error} = yield call(getCategoriesBrands);
    if (error) {
      yield put(failedFetchCategoriesBrands(error));
    } else {
      yield put(fetchedCategoriesBrands(data.data));
      yield put(addMultipleBrands(data && data.data && data.data.brands));
    }
  } catch (error) {
    yield put(failedFetchCategoriesBrands(error));
  }
}

export default fork(function* () {
  yield takeEvery(
    CATEGORY_BRAND_ACTIONS.FETCH_BRANDS_BY_CATEGORY,
    fetchBrandsByCategoryCodes,
  );
  yield takeEvery(CATEGORY_BRAND_ACTIONS.FETCH_BRANDS, fetchBrands);
  yield takeEvery(
    CATEGORY_BRAND_ACTIONS.FETCH_BRANDS_ALPHABETS,
    fetchBrandsAlphabets,
  );
  yield takeEvery(
    CATEGORY_BRAND_ACTIONS.FETCH_CATEGORIES_BRANDS,
    fetchCategoriesBrands,
  );
});
