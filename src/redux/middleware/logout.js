import AsyncStorage from '@react-native-async-storage/async-storage';

export const logoutMiddleware = store => next => async action => {
  if (
    action &&
    action.error &&
    action.error.response &&
    action.error.response.status == 401
  ) {
    await AsyncStorage.removeItem('onlineShipmentMode');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('fcmToken');
    store.getState().masterReducer.setIsLoggedIn();
    return next({
      type: 'LOGOUT',
    });
  }

  return next(action);
};
