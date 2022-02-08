import {homepageReducer} from './homepage';
import {profileReducer} from './profile';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  homepageReducer,
  profileReducer,
});

export default rootReducer;
