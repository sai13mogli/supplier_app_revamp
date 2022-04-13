import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import Header from '../../component/common/Header';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBusinessDetails,
  fetchProfile,
  fetchBankDetails,
  fetchTdsInfoDetails,
  fetchAddressDetails,
} from '../../redux/actions/profile';
import { fetchCategoriesBrands } from '../../redux/actions/categorybrand';

import Progress from 'react-native-progress/Bar';
import { PROFILE_TABS } from '../../constants';
import styles from './style';
import CustomButton from '../../component/common/Button';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import CustomeIcon from '../../component/common/CustomeIcon';
import { STATE_STATUS } from '../../redux/constants';

const ProfileScreen = props => {
  const { navigate } = useNavigation();
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
      dispatch(fetchProfile());
      dispatch(fetchAddressDetails());
      dispatch(fetchBusinessDetails());
      dispatch(fetchBankDetails());
      dispatch(fetchTdsInfoDetails());
      dispatch(fetchCategoriesBrands());
    }
  }, []);

  const isCompleted = progress => {
    return profileData.verificationStatus >= progress;
  };

  const isActive = (tab, route, tabData) => {
    if (
      NEXT_ACTIVE_TAB[profileData.verificationStatus] == tab ||
      tabData.activity < profileData.verificationStatus
    ) {
      props.navigation.navigate(route, {
        disabled: tabData.activity < profileData.verificationStatus,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header showText={'My Profile'} navigation={props.navigation} showBack />
      {profileStatus == STATE_STATUS.FETCHING ? (
        <ActivityIndicator
          style={{ alignSelf: 'center', margin: Dimension.margin12 }}
          size={'small'}
          color={Colors.BrandColor}
        />
      ) : (
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
                <View style={{ flexDirection: 'row' }}>
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
              <View style={{ flex: 6, marginRight: Dimension.margin10 }}>
                <Text style={styles.UserEmailVerfyBoldTxt}>
                  A verification link has been sent on your email.
                </Text>
                <Text style={styles.UserEmailVerfylightTxt}>
                  Link is active for 24 hours only.
                </Text>
              </View>
              <View style={{ flex: 3 }}>
                <CustomButton
                  title={'OPEN MAIL'}
                  onPress={() => Linking.openURL('mailto:')}
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


            {PROFILE_TABS.map((tab, tabIndex) => (
              <TouchableOpacity
                key={tabIndex}
                onPress={() => isActive(tabIndex, tab.route, tab)}
                style={styles.profileTabWrap}>
                <View style={{ flexDirection: 'row' }}>
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

                    <View style={{ flexDirection: 'row' }}>
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
              </TouchableOpacity>
            )).toList()}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ProfileScreen;
