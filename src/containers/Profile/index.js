import React from 'react';
import {Text, View,ProgressBarAndroid} from 'react-native';
import Header from '../../component/common/Header';
import styles from './style';

const ProfileScreen = () => {
  return (
    <View>
      <Header
        showBack
        showText={'My Profile'}
      />
      <View>
            <Text style={styles.userName}>Hello, Anuj</Text>
            <Text style={styles.welcomeText}>anuj.gupta@moglix.com</Text>
            <Text style={styles.welcomeText}>+91-9599822242</Text>
            <View style={styles.statusBar}>
              <Text>60 %</Text>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.6}
              />
            </View>
        </View>
    </View>
  );
};

export default ProfileScreen;
