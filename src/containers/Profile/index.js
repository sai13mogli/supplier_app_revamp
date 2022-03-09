import React, {useEffect} from 'react';
import {TouchableOpacity, View, Text, ScrollView, Image} from 'react-native';
import Header from '../../component/common/Header';
import {useNavigation} from '@react-navigation/native';
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

import Progress from 'react-native-progress/Bar';
import {OrderedMap} from 'immutable';
import {PROFILE_TABS} from '../../constants';
import styles from './style';
import CustomButton from '../../component/common/Button';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomeIcon from '../../component/common/CustomeIcon';
import {STATE_STATUS} from '../../redux/constants';

const ProfileScreen = props => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const profileStatus = useSelector(
    state => (state.profileReducer || {}).status || STATE_STATUS.UNFETCHED,
  );

  const profileData = useSelector(state => state.profileReducer.data || {});

  const PROGRESS = {
    1: 0.1,
    2: 0.3,
    3: 0.5,
    4: 0.7,
    5: 0.8,
    7: 0.9,
    10: 1,
    15: 1,
  };
  const NEXT_ACTIVE_TAB = {
    1: 'business_details',
    2: 'category_brands',
    3: 'addresses',
    4: 'bank_details',
    5: 'documents',
  };

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

  const isCompleted = progress => {
    return profileData.verificationStatus >= progress;
  };

  const isActive = (tab, route, tabData) => {
    console.log(tab, profileData, tabData);
    if (
      NEXT_ACTIVE_TAB[profileData.verificationStatus] == tab ||
      tabData.activity < profileData.verificationStatus
    ) {
      props.navigation.navigate(route, {
        disabled: tabData.activity < profileData.verificationStatus,
      });
    }
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    props.setIsLoggedIn(false);
    dispatch(logout());
  };

  return (
    <View style={{flex: 1}}>
      <Header showBack navigation={props.navigation} showText={'My Profile'} />
      <ScrollView style={styles.ContainerCss}>
        <View style={styles.profileTopWrap}>
          <View style={styles.UserDetailWrap}>
            <View style={styles.userDetailLeft}>
              <View style={styles.userIconWrap}>
                <Image
                  source={require('../../assets/images/UserIcon.png')}
                  style={{
                    height: Dimension.height45,
                    width: Dimension.height45,
                    alignSelf: 'center',
                  }}
                />
              </View>
            </View>
            <View>
              <Text style={styles.UserName}>
                {(profileData.userInfo || {}).contactName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: Dimension.margin6,
                }}>
                <CustomeIcon
                  name={
                    profileData?.isEmailVerified
                      ? 'right-tick-line'
                      : 'information-line'
                  }
                  color={Colors.WhiteColor}
                  size={Dimension.font12}></CustomeIcon>
                <Text style={styles.UserEmail}>
                  {(profileData.userInfo || {}).email}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <CustomeIcon
                  name={
                    profileData?.phoneVerified
                      ? 'right-tick-line'
                      : 'information-line'
                  }
                  color={Colors.WhiteColor}
                  size={Dimension.font12}></CustomeIcon>
                <Text style={styles.UserContact}>
                  {(profileData.userInfo || {}).phone}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.UserEmailVerfyWrap}>
            <View style={{flex: 6, marginRight: Dimension.margin10}}>
              <Text style={styles.UserEmailVerfyBoldTxt}>
                A verification link has been sent on your email.
              </Text>
              <Text style={styles.UserEmailVerfylightTxt}>
                Link is active for 24 hours only.
              </Text>
            </View>
            <View style={{flex: 3}}>
              <CustomButton
                title={'OPEN MAIL'}
                TextColor={Colors.WhiteColor}
                buttonColor={Colors.FontColor}
                borderColor={Colors.FontColor}
                TextFontSize={Dimension.font12}></CustomButton>
            </View>
          </View>
        </View>

        <View style={styles.profileBottomWrap}>
          <View style={styles.progressbarWrap}>
            <Text style={styles.progressTxt}>
              {PROGRESS[profileData.verificationStatus] * 100}%
            </Text>
            <Progress
              width={null}
              animated={false}
              progress={
                PROGRESS[profileData.verificationStatus]
                //0.5
              }
              color={Colors.SuccessStateColor}
              unfilledColor={Colors.grayShade11}
              borderColor={Colors.grayShade11}
              height={Dimension.height11}
            />
            <Text style={styles.progressBottomtxt}>
              Complete your profile by sharing below details
            </Text>
          </View>

          {/* navigate to activeTab isActive(tabIndex, tab.route) */}

          {PROFILE_TABS.map((tab, tabIndex) => (
            <TouchableOpacity
              key={tabIndex}
              onPress={() => isActive(tabIndex, tab.route, tab)}
              style={styles.profileTabWrap}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={[
                    styles.IconWrap,
                    {
                      backgroundColor: isCompleted(tab.progress)
                        ? Colors.grayShade3
                        : Colors.BrandColor,
                    },
                  ]}>
                  <CustomeIcon
                    name={tab.icon}
                    color={
                      isCompleted(tab.progress)
                        ? Colors.FontColor
                        : Colors.WhiteColor
                    }
                    size={Dimension.font14}></CustomeIcon>
                </View>
                <View>
                  <Text style={styles.tabTitle}>{tab.title}</Text>

                  <View style={{flexDirection: 'row'}}>
                    {isCompleted(tab.progress) ? (
                      <>
                        <CustomeIcon
                          name={'right-tick-line'}
                          color={Colors.SuccessStateColor}
                          size={Dimension.font12}></CustomeIcon>
                        <Text style={styles.tabStatusC}>Completed</Text>
                      </>
                    ) : (
                      <Text style={styles.tabStatusNC}>Not Completed</Text>
                    )}
                  </View>
                </View>
              </View>

              <CustomeIcon
                name={'arrow-forward'}
                color={
                  isCompleted(tab.progress)
                    ? Colors.FontColor
                    : Colors.BrandColor
                }
                size={Dimension.font18}></CustomeIcon>

              {/* <View>
              
            onPress={() => props.navigation.navigate('CategoryBrand')}>
            <Text style={{color: isCompleted(tab.progress) ? 'green' : 'red'}}>
              {tab.icon}
            </Text>
            <View>
              <Text style={{color: '#000'}}>{tab.title}</Text>
              <Text
                style={{color: isCompleted(tab.progress) ? 'green' : 'red'}}>
                {tab.icon}
              </Text>
            </View>
            <Text style={{color: isCompleted(tab.progress) ? 'green' : 'red'}}>
              {' '}
              {'>'}{' '}
            </Text> */}
            </TouchableOpacity>
          )).toList()}
        </View>
        <View style={styles.logoutBtnWrap}>
          <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutBtnTxt}>LOGOUT</Text>
            <CustomeIcon
              name={'shut-down'}
              color={Colors.FontColor}
              size={Dimension.font16}></CustomeIcon>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <CustomButton
          title={'LOGOUT'}
          buttonColor={Colors.grayShade1}
          onPress={onLogout}
          TextColor={Colors.FontColor}
          borderColor={Colors.eyeIcon}
        /> */}
    </View>
  );
};

export default ProfileScreen;
