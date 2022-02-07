import {homepageReducer} from './homepage';
import {addressesReducer} from './addresses';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  homepageReducer,
  addressesReducer,
});

export default rootReducer;
