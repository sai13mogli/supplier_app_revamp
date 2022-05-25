import React, {useEffect} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import VersionCheck from 'react-native-version-check';
import {useSelector} from 'react-redux';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';

const AppUpdateBanner = props => {
  const version = useSelector(
    state => state.homepageReducer.version || VersionCheck.getCurrentVersion(),
  );

  const openPlayStore = () => {
    Linking.openURL(
      'http://play.google.com/store/apps/details?id=com.moglix.supplier&hl=en',
    );
  };

  if (Number(version) <= Number(VersionCheck.getCurrentVersion())) {
    return null;
  } else {
    return (
      <View style={styles.updateContainer}>
        <Text style={styles.updateText}>A new version of App is available</Text>
        <TouchableOpacity onPress={openPlayStore} style={styles.btn}>
          <Text style={styles.btnText}>Update</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  updateContainer: {
    flexDirection: 'row',
    marginVertical: Dimension.margin5,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Dimension.padding12,
    backgroundColor: Colors.WhiteColor,
  },
  btn: {
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: Colors.BrandColor,
  },
  btnText: {
    color: Colors.WhiteColor,
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomMediumFont,
  },
  updateText: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomMediumFont,
  },
});

export default AppUpdateBanner;
