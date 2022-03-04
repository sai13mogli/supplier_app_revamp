import {homepageReducer} from './homepage';
import {profileReducer} from './profile';
import {categorybrandReducer} from './categorybrand';
import {notificationsReducer} from './notifications';
import {supportReducer} from './support';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  homepageReducer,
  profileReducer,
  categorybrandReducer,
  notificationsReducer,
  supportReducer,
});

export default rootReducer;
