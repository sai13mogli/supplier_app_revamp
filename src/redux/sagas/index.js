import {all} from 'redux-saga/effects';
import homepageSaga from './homepage';
import profileSaga from './profile';
import categoryBrandSaga from './categorybrand';

export default function* () {
  yield all([homepageSaga, profileSaga, categoryBrandSaga]);
}
