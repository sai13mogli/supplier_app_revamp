import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../actions/profile';

export const logoutMiddleware = store => next => async action => {
  if (
    action &&
    action.error &&
    action.error.response &&
    action.error.response.status == 401
  ) {
    console.log(action, 'cwecwecewcwew');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    store.getState().masterReducer.setIsLoggedIn();
    return next({
      type: 'LOGOUT',
    });
  }
  return next(action);
};
