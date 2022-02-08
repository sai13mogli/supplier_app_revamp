// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {PROFILE_ACTIONS} from '../constants/profile';
// api call
import {
  getBusinessDetails,
  setBusinessDetails,
  getProfile,
  getUserInfo,
  getAddressesDetails,
} from '../../services/profile';
// actions
import {
  fetchedBusinessDetails,
  failedFetchBusinessDetails,
  fetchedUpdateBusinessDetails,
  failedFetchUpdateBusinessDetails,
  fetchedProfile,
  failedFetchProfile,
  failedFetchAddressDetails,
  fetchedAddressDetails,
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
    let {data, error} = yield call(getProfile);
    const profileData = yield call(getUserInfo);
    data.data.userInfo = profileData.data.data;
    if (error) {
      yield put(failedFetchProfile(error));
    } else {
      yield put(fetchedProfile(data.data));
    }
  } catch (error) {
    yield put(failedFetchProfile(error));
  }
}

function* fetchAddressDetails() {
  try {
    const {data, error} = yield call(getAddressesDetails);
    if (error) {
      yield put(failedFetchAddressDetails(error));
    } else {
      yield put(fetchedAddressDetails(data.data));
    }
  } catch (error) {
    yield put(failedFetchAddressDetails(error));
  }
}

export default fork(function* () {
  yield takeEvery(PROFILE_ACTIONS.FETCH_PROFILE, fetchProfile);
  yield takeEvery(PROFILE_ACTIONS.FETCH_BUSINESS_DETAILS, fetchBusinessDetails);
  yield takeEvery(PROFILE_ACTIONS.FETCH_ADDRESSES, fetchAddressDetails);
  yield takeEvery(
    PROFILE_ACTIONS.FETCH_UPDATE_BUSINESS_DETAILS,
    fetchUpdateBusinessDetails,
  );
});
