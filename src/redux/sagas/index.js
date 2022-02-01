import {all} from 'redux-saga/effects';
import homepageSaga from './homepage';

export default function* () {
  yield all([homepageSaga]);
}
