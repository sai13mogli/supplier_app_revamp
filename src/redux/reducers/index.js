import {homepageReducer} from './homepage';
import {profileReducer} from './profile';
import {addressesReducer} from './addresses';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  homepageReducer,
  profileReducer,
  addressesReducer,
});

export default rootReducer;
