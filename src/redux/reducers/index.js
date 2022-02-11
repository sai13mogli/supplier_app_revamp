import {homepageReducer} from './homepage';
import {profileReducer} from './profile';
import {categorybrandReducer} from './categorybrand';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  homepageReducer,
  profileReducer,
  categorybrandReducer,
});

export default rootReducer;
