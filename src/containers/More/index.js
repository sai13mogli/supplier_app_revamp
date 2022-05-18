import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {MORE_TABS, PRIVACY_TABS} from '../../constants';

import styles from './style';
import CustomeIcon from '../../component/common/CustomeIcon';
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchBusinessDetails,
  fetchProfile,
  fetchBankDetails,
  fetchTdsInfoDetails,
  fetchAddressDetails,
  logout,
} from '../../redux/actions/profile';
import {fetchCategoriesBrands} from '../../redux/actions/categorybrand';
import {STATE_STATUS} from '../../redux/constants';
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView bounces>
        {/* <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"light-content"}
      /> */}
        <ImageBackground
          source={require('../../assets/images/MenuBG.png')}
          resizeMode="cover" //style={{flex:1}}
        >
          <View style={styles.topWrap}>
            <Text style={styles.userNameCss}>{userInfo.contactName} </Text>
            <Text style={styles.UserEmail}>
              {' '}
              {userInfo.phone} | {userInfo.email}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.companyName}> Moglix Supplier </Text>
              <Text style={styles.dateTxt}>
                {getTime(profileData.createdAt)}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.profileTabWrapper}>
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
                <View style={{flexDirection: 'row'}}>
                  <CustomeIcon
                    name={tab.icon}
                    color={Colors.headerTxtColor}
                    size={Dimension.font18}></CustomeIcon>

                  <Text style={styles.tabTitle}>{tab.title}</Text>
                </View>

                <CustomeIcon
                  name={'arrow-right-line'}
                  color={Colors.blackColor}
                  size={Dimension.font18}></CustomeIcon>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.profileTabWrapper}>
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
                <View style={{flexDirection: 'row'}}>
                  <CustomeIcon
                    name={tab.icon}
                    color={Colors.headerTxtColor}
                    size={Dimension.font18}></CustomeIcon>

                  <Text style={styles.tabTitle}>{tab.title}</Text>
                </View>

                <CustomeIcon
                  name={'arrow-right-line'}
                  color={Colors.blackColor}
                  size={Dimension.font18}></CustomeIcon>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.varsionWrap}>
          <View style={{flexDirection: 'row'}}>
            <CustomeIcon
              name={'smartphone-line'}
              color={Colors.headerTxtColor}
              size={Dimension.font30}></CustomeIcon>

            <View style={{flexDirection: 'column',marginLeft:Dimension.margin10}}>
              <Text style={[styles.versionText]}>
                App Version{' '}
                <Text style={[styles.AppversionNumber]}>
                  {' '}
                  {VersionCheck.getCurrentVersion()}{' '}
                </Text>
              </Text>
              <Text
              style={[styles.updatedateTxt]}>
              Last updated on 12-02-19
            </Text>
            </View>
          </View>
          <Text
            numberOfLines={2}
            style={[styles.updatedateTxt,{maxWidth:50}]}>
            No Update Available
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MoreScreen;
