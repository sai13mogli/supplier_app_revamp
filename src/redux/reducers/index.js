import {homepageReducer} from './homepage';
import {profileReducer} from './profile';
import {categorybrandReducer} from './categorybrand';
import {notificationsReducer} from './notifications';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  homepageReducer,
  profileReducer,
  categorybrandReducer,
  notificationsReducer,
});

export default rootReducer;
