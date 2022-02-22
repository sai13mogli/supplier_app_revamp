import {all} from 'redux-saga/effects';
import homepageSaga from './homepage';
import profileSaga from './profile';
import categoryBrandSaga from './categorybrand';
import notificationsSaga from './notifications';

export default function* () {
  yield all([homepageSaga, profileSaga, categoryBrandSaga, notificationsSaga]);
}
