import {all} from 'redux-saga/effects';
import homepageSaga from './homepage';
import profileSaga from './profile';

export default function* () {
  yield all([homepageSaga, profileSaga]);
}
