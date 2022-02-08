import {all} from 'redux-saga/effects';
import homepageSaga from './homepage';
import addressesSaga from './addresses';

export default function* () {
  yield all([homepageSaga, addressesSaga, profileSaga]);
}
