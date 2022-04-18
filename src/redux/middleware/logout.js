import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../actions/profile';
import {Alert, Clipboard} from 'react-native';

export const logoutMiddleware = store => next => async action => {
  if (
    action &&
    action.error &&
    action.error.response &&
    action.error.response.status == 401
  ) {
    console.log('set_token', store.getState().profileReducer.token);
    Alert.alert(
      `Title`,
      `Token has expired and user is unauthorized.${
        store.getState().profileReducer.token
      }`,
      [
        {
          text: 'Copy',
          onPress: () =>
            Clipboard.setString(store.getState().profileReducer.token),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    store.getState().masterReducer.setIsLoggedIn();
    return next({
      type: 'LOGOUT',
    });
  }

  return next(action);
};
