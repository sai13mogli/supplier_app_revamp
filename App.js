import React, {useEffect} from 'react';
import {
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  Linking,
} from 'react-native';
import Routes from './src/routes';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import codePush from 'react-native-code-push';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';
import * as RootNavigation from './src/generic/navigator';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

class App extends React.Component {
  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        break;
    }
  }
  codePushDownloadDidProgress(progress) {
    console.log(
      progress.receivedBytes + ' of ' + progress.totalBytes + ' received.',
    );
  }

  componentDidMount() {
    let urlListener = {};
    if (Platform.OS === 'android') {
      urlListener = Linking.addEventListener(
        'url',
        this.getLinkingUrl.bind(this),
      );
    }
    setTimeout(() => {
      Linking.getInitialURL()
        .then(url => {
          if (url) {
            this.handleOpenUrl({url: url});
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 1500);
    return urlListener;
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenUrl);
  }

  getLinkingUrl(eventUrl) {
    if (Platform.OS === 'android') {
      this.handleOpenUrl(eventUrl);
    }
  }

  handleOpenUrl(event) {
    if (event) {
      Linking.canOpenURL(event.url).then(supported => {
        if (supported) {
          console.log('linking hai!!', event.url);
          let input = event.url;
          if (
            input.includes(
              'https://www.suppliercentralqa.moglilabs.com/profile',
            )
          ) {
            RootNavigation.navigate('Profile');
          } else {
            RootNavigation.navigate('Orders');
          }
          return;
        }
      });
    }
  }

  render() {
    return (
      <>
        <Provider store={store}>
          <Routes />
        </Provider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default codePush(App);
