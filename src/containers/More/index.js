import React, { useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MORE_TABS, PRIVACY_TABS } from '../../constants';
import styles from './style';
import CustomeIcon from '../../component/common/CustomeIcon';
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBusinessDetails,
  fetchProfile,
  fetchBankDetails,
  fetchTdsInfoDetails,
  fetchAddressDetails,
  logout,
} from '../../redux/actions/profile';
import { fetchCategoriesBrands } from '../../redux/actions/categorybrand';
import { STATE_STATUS } from '../../redux/constants';
import VersionCheck from 'react-native-version-check';

const MoreScreen = props => {
  const dispatch = useDispatch();

  const profileStatus = useSelector(
    state => (state.profileReducer || {}).status || STATE_STATUS.UNFETCHED,
  );
  const userInfo = useSelector(
    state => ((state.profileReducer || {}).data || {}).userInfo || {},
  );

  const profileData = useSelector(
    state => (state.profileReducer || {}).data || {},
  );

  useEffect(() => {
    if (profileStatus !== STATE_STATUS.FETCHED) {
      dispatch(fetchAddressDetails());
      dispatch(fetchBusinessDetails());
      dispatch(fetchBankDetails());
      dispatch(fetchTdsInfoDetails());
      dispatch(fetchProfile());
      dispatch(fetchCategoriesBrands());
    }
  }, []);

  const getTime = time => {
    let months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };

    let date = (time || '').split(' ')[0];
    let month = (date || '').split('-')[1];
    let year = (date || '').split('-')[0];

    return `Since ${months[month]} ${year}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <Text
          style={{
            marginTop: 40,
            color: '#000',
            fontSize: 12,
            fontWeight: 'bold',
          }}>
          {userInfo.contactName}
          {userInfo.phone} | {userInfo.email}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 12,
            fontWeight: 'bold',
            color: '#000',
          }}>
          Moglix Supplier Since
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 12,
            fontWeight: 'bold',
            color: '#000',
          }}>
          {getTime(profileData.createdAt)}
        </Text>
        <View style={{ marginTop: 20 }}>
          {MORE_TABS.map((tab, tabIndex) => (
            <View>
              <TouchableOpacity
                key={tabIndex}
                style={styles.profileTabWrap}
                onPress={() =>
                  tab.route
                    ? props.navigation.navigate(`${tab.route}`, {
                      setIsLoggedIn: props.setIsLoggedIn,
                    })
                    : tab.onPress()
                }>
                <View style={[styles.IconWrap]}>
                  <CustomeIcon
                    name={tab.icon}
                    color={Colors.headerTxtColor}
                    size={Dimension.font14}></CustomeIcon>
                </View>
                <View>
                  <Text style={styles.tabTitle}>{tab.title}</Text>
                </View>

                <CustomeIcon
                  name={'arrow-forward'}
                  color={Colors.headerTxtColor}
                  size={Dimension.font18}></CustomeIcon>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          {PRIVACY_TABS.map((tab, tabIndex) => (
            <View>
              <TouchableOpacity
                key={tabIndex}
                style={styles.profileTabWrap}
                onPress={() =>
                  tab.route
                    ? props.navigation.navigate(`${tab.route}`, {
                      setIsLoggedIn: props.setIsLoggedIn,
                    })
                    : tab.onPress()
                }>
                <View style={{ flexDirection: 'row' }}>
                  <View style={[styles.IconWrap]}>
                    <CustomeIcon
                      name={tab.icon}
                      color={Colors.headerTxtColor}
                      size={Dimension.font14}></CustomeIcon>
                  </View>
                  <View>
                    <Text style={styles.tabTitle}>{tab.title}</Text>
                  </View>
                </View>

                <CustomeIcon
                  name={'arrow-forward'}
                  color={Colors.headerTxtColor}
                  size={Dimension.font18}></CustomeIcon>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.varsionWrap}>
          <View style={{ flexDirection: 'row' }}>
            <CustomeIcon
              name={'device-mobile'}
              color={Colors.headerTxtColor}
              size={Dimension.font18}></CustomeIcon>

            <View
              style={{ flexDirection: 'column', marginTop: -Dimension.margin10 }}>
              <Text
                style={[styles.versionText, { marginLeft: Dimension.margin10 }]}>
                App Version {VersionCheck.getCurrentVersion()}
              </Text>
              {/* <Text
              style={[styles.versionText, {marginLeft: Dimension.margin10}]}>
              Last updated on 12-02-19
            </Text> */}
            </View>
          </View>
          {/* <Text
            numberOfLines={2}
            style={[
              styles.versionText,
              { marginLeft: Dimension.margin70, width: 80, bottom: 5 },
            ]}>
            No Update Available
          </Text> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default MoreScreen;
