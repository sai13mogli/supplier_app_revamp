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
  getBankDetails,
  getTdsInfoDetails,
  setBankDetails,
} from '../../services/profile';
// actions
import {
  fetchedBusinessDetails,
  failedFetchBusinessDetails,
  fetchedUpdateBusinessDetails,
  failedFetchUpdateBusinessDetails,
  failedFetchAddressDetails,
  fetchedAddressDetails,
  failedFetchBankDetails,
  fetchedBankDetails,
  fetchedProfile,
  failedFetchProfile,
  failedFetchUpdateBankDetails,
  fetchedUpdateBankDetails,
  fetchedCategoriesBrands,
  failedFetchCategoriesBrands,
  failedFetchTdsInfoDetails,
  fetchedTdsInfoDetails,
  fetchProfile,
} from '../actions/profile';
import * as RootNavigation from '../../routes/RootNavigation';

function* fetchBusinessDetails() {
  try {
    const {data, error} = yield call(getBusinessDetails);
    if (error) {
      yield put(failedFetchBusinessDetails(error));
    } else {
      if (data.status == 400 || data.data.errors) {
        yield put(failedFetchBusinessDetails(data.data.errors));
      } else {
        yield put(fetchedBusinessDetails(data.data));
      }
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
      yield put(fetchProfile());
    }
  } catch (error) {
    yield put(failedFetchUpdateBusinessDetails(error));
  }
}

function* fetchUpdateBankDetails({payload: {formData}}) {
  try {
    const {data, error} = yield call(setBankDetails, formData);
    if (error) {
      yield put(failedFetchUpdateBankDetails(error));
    } else {
      yield put(fetchedUpdateBankDetails(formData, data.data));
    }
  } catch (error) {
    yield put(failedFetchUpdateBankDetails(error));
  }
}

function* fetchUserProfile({}) {
  try {
    let {data, error} = yield call(getProfile);
    const profileData = yield call(getUserInfo);
    data.data.userInfo = profileData.data.data;
    if (error) {
      yield put(failedFetchProfile(error));
    } else {
      yield put(fetchedProfile(data.data));
      if (data.data.verificationStatus < 10) {
        RootNavigation.navigate('Profile');
      }
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

function* fetchBankDetails() {
  try {
    const {data, error} = yield call(getBankDetails);
    if (error) {
      yield put(failedFetchBankDetails(error));
    } else {
      yield put(fetchedBankDetails(data.data));
    }
  } catch (error) {
    yield put(failedFetchBankDetails(error));
  }
}

function* fetchTdsInfoDetails() {
  try {
    const {data, error} = yield call(getTdsInfoDetails);
    if (error) {
      yield put(failedFetchTdsInfoDetails(error));
    } else {
      yield put(fetchedTdsInfoDetails(data.data));
    }
  } catch (error) {
    yield put(failedFetchTdsInfoDetails(error));
  }
}

export default fork(function* () {
  yield takeEvery(PROFILE_ACTIONS.FETCH_PROFILE, fetchUserProfile);
  yield takeEvery(PROFILE_ACTIONS.FETCH_BUSINESS_DETAILS, fetchBusinessDetails);
  yield takeEvery(PROFILE_ACTIONS.FETCH_ADDRESSES, fetchAddressDetails);
  yield takeEvery(PROFILE_ACTIONS.FETCH_BANK_DETAILS, fetchBankDetails);
  yield takeEvery(
    PROFILE_ACTIONS.FETCH_UPDATE_BUSINESS_DETAILS,
    fetchUpdateBusinessDetails,
  );
  yield takeEvery(PROFILE_ACTIONS.FETCH_TDS_INFO_DETAILS, fetchTdsInfoDetails);
  yield takeEvery(
    PROFILE_ACTIONS.FETCH_UPDATE_BANK_DETAILS,
    fetchUpdateBankDetails,
  );
});
