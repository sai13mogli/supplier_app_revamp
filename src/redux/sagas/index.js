import {all} from 'redux-saga/effects';
import homepageSaga from './homepage';
import addressesSaga from './addresses';
import profileSaga from './profile';

export default function* () {
  yield all([homepageSaga, addressesSaga, profileSaga]);
}
