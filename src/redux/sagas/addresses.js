// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {ADDRESSES_ACTIONS} from '../constants/addresses';
// api call
import {getAddressesDetails} from '../../services/addresses';
// actions
import {failedFetchAddressDetails,fetchedAddressDetails} from '../actions/Addresses';

function* fetchAddressesLayout({
  payload: {data}
}) {
 
  try {
    const {data, error} = yield call(getAddressesDetails);
    if (error) {
      yield put(failedFetchAddressDetails(error));
    } else {
      yield put(fetchedAddressDetails(data));
      console.log('====================================');
      console.log("Datat====>",data);
      console.log('====================================');
    }
  } catch (error) {
    yield put(failedFetchAddressDetails(error));
  }
}

export default fork(function* () {
  yield takeEvery(ADDRESSES_ACTIONS.FETCH_ADDRESSES, fetchAddressesLayout);
});