import {all} from 'redux-saga/effects';
import homepageSaga from './homepage';
import profileSaga from './profile';
import categoryBrandSaga from './categorybrand';
import notificationsSaga from './notifications';
import supportSaga from './support';

export default function* () {
  yield all([
    homepageSaga,
    profileSaga,
    categoryBrandSaga,
    notificationsSaga,
    supportSaga,
  ]);
}
