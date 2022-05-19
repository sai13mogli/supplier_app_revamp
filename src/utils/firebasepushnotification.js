import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {replaceToken} from '../services/auth';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    await getFcmToken();
  }
};

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'the old token!!');
  if (!fcmToken) {
    try {
      const newFcmToken = await messaging().getToken();
      if (newFcmToken) {
        console.log(newFcmToken, 'the new generated fcm token!!');
        await AsyncStorage.setItem('fcmToken', newFcmToken);
        replaceFcmToken(newFcmToken);
      }
    } catch (error) {
      console.log(error, 'error in fcm');
    }
  } else {
    replaceFcmToken(fcmToken);
  }
};

const replaceFcmToken = async ftoken => {
  try {
    let payload = {
      supplierId: await AsyncStorage.getItem('userId'),
      deviceOldToken: '',
      deviceNewToken: `${ftoken}`,
    };
    const {data} = await replaceToken(payload);
    // if (data && data.success) {
    //   console.log('success hai dost!!');
    // }
  } catch (error) {
    console.log(error);
  }
};

export const notificationListener = async () => {
  //app is running in background
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    return remoteMessage.notification;
    // navigation.navigate(remoteMessage.data.type);
  });

  // app is in foreground
  messaging().onMessage(async remoteMessage => {
    console.log('received in foreground!!', remoteMessage);
    return remoteMessage;
  });

  //app is in quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        return remoteMessage.notification;
      }
    });
};
