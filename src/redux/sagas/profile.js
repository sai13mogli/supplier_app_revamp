// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {PROFILE_ACTIONS} from '../constants/profile';
// api call
import {
  getBusinessDetails,
  setBusinessDetails,
  getProfile,
} from '../../services/profile';
// actions
import {
  fetchedBusinessDetails,
  failedFetchBusinessDetails,
  fetchedUpdateBusinessDetails,
  failedFetchUpdateBusinessDetails,
  fetchedProfile,
  failedFetchProfile,
} from '../actions/profile';

function* fetchBusinessDetails() {
  try {
    const {data, error} = yield call(getBusinessDetails);
    if (error) {
      yield put(failedFetchBusinessDetails(error));
    } else {
      yield put(fetchedBusinessDetails(data.data));
    }
  } catch (error) {
    yield put(failedFetchBusinessDetails(error));
  }
}

function* fetchUpdateBusinessDetails({payload: {formData}}) {
  try {
    console.log(formData);
    const {data, error} = yield call(setBusinessDetails, formData);
    if (error) {
      yield put(failedFetchUpdateBusinessDetails(error));
    } else {
      yield put(fetchedUpdateBusinessDetails(formData, data.data));
    }
  } catch (error) {
    yield put(failedFetchUpdateBusinessDetails(error));
  }
}

function* fetchProfile({}) {
  try {
    const {data, error} = yield call(getProfile);
    if (error) {
      yield put(failedFetchProfile(error));
    } else {
      yield put(fetchedProfile(data.data));
    }
  } catch (error) {
    yield put(failedFetchProfile(error));
  }
}

export default fork(function* () {
  yield takeEvery(PROFILE_ACTIONS.FETCH_BUSINESS_DETAILS, fetchBusinessDetails);
  yield takeEvery(
    PROFILE_ACTIONS.FETCH_UPDATE_BUSINESS_DETAILS,
    fetchUpdateBusinessDetails,
  );
  yield takeEvery(PROFILE_ACTIONS.FETCH_PROFILE, fetchProfile);
});
