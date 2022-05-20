import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Header from '../../component/common/Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchBusinessDetails,
  fetchProfile,
  fetchBankDetails,
  fetchTdsInfoDetails,
  fetchAddressDetails,
  setNavigation,
} from '../../redux/actions/profile';
import {fetchCategoriesBrands} from '../../redux/actions/categorybrand';
import analytics from '@react-native-firebase/analytics';
import Progress from 'react-native-progress/Bar';
import {PROFILE_TABS} from '../../constants';
import styles from './style';
import CustomButton from '../../component/common/Button';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import CustomeIcon from '../../component/common/CustomeIcon';
import {STATE_STATUS} from '../../redux/constants';
import {fetchNotifications} from '../../redux/actions/notifications';
import {sendVerificationEmail} from '../../services/profile';
import Toast from 'react-native-toast-message';
import {openInbox} from 'react-native-email-link';
import AppUpdateBanner from '../../component/common/AppUpdateBanner';

const ProfileScreen = props => {
  const [initLoader, setInitLoader] = useState(true);
  const [openemailLoader, setOpenEmailLoader] = useState(false);

  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const profileStatus = useSelector(
    state => (state.profileReducer || {}).status || STATE_STATUS.UNFETCHED,
  );

  const businessStatus = useSelector(
    state =>
      ((state.profileReducer || {}).businessDetails || {}).status ||
      STATE_STATUS.UNFETCHED,
  );

  const businessData = useSelector(
    state => ((state.profileReducer || {}).businessDetails || {}).data,
  );

  const addressesStatus = useSelector(
    state =>
      ((state.profileReducer || {}).addressesDetails || {}).status ||
      STATE_STATUS.UNFETCHED,
  );

  const bankStatus = useSelector(
    state =>
      ((state.profileReducer || {}).bankDetails || {}).status ||
      STATE_STATUS.UNFETCHED,
  );

  const categoryBrandStatus = useSelector(
    state =>
      ((state.profileReducer || {}).categoryBrandDetails || {}).status ||
      STATE_STATUS.UNFETCHED,
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
      dispatch(fetchCategoriesBrands());
      dispatch(fetchNotifications(0));
      dispatch(fetchProfile());
    }
  }, []);

  useEffect(() => {
    if (
      profileStatus == STATE_STATUS.FETCHED &&
      props.route &&
      props.route.params &&
      props.route.params.parentTab == 'Documents' &&
      initLoader
    ) {
      setInitLoader(false);
      props.navigation.navigate(props.route.params.parentTab);
    }
  }, [profileStatus, profileStatus]);

  useEffect(() => {
    if (
      profileStatus == STATE_STATUS.FETCHED &&
      businessStatus == STATE_STATUS.FETCHED &&
      props.route &&
      props.route.params &&
      props.route.params.parentTab == 'BusinessDetails' &&
      initLoader
    ) {
      setInitLoader(false);
      props.navigation.navigate(props.route.params.parentTab);
    }
  }, [businessStatus, profileStatus]);

  useEffect(() => {
    if (
      profileStatus == STATE_STATUS.FETCHED &&
      addressesStatus == STATE_STATUS.FETCHED &&
      props.route &&
      props.route.params &&
      props.route.params.parentTab == 'Addresses' &&
      initLoader
    ) {
      setInitLoader(false);
      props.navigation.navigate(props.route.params.parentTab);
    }
  }, [addressesStatus, profileStatus]);

  useEffect(() => {
    if (
      profileStatus == STATE_STATUS.FETCHED &&
      bankStatus == STATE_STATUS.FETCHED &&
      props.route &&
      props.route.params &&
      props.route.params.parentTab == 'BankDetails' &&
      initLoader
    ) {
      setInitLoader(false);
      props.navigation.navigate(props.route.params.parentTab);
    }
  }, [bankStatus, profileStatus]);

  useEffect(() => {
    if (
      profileStatus == STATE_STATUS.FETCHED &&
      categoryBrandStatus == STATE_STATUS.FETCHED &&
      props.route &&
      props.route.params &&
      props.route.params.parentTab == 'CategoryBrand' &&
      initLoader
    ) {
      setInitLoader(false);
      props.navigation.navigate(props.route.params.parentTab);
    }
  }, [categoryBrandStatus, profileStatus]);

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

  const sendVerificationMail = async () => {
    try {
      await analytics().logEvent('VerifyEmail', {
        action: `click`,
        label: ``,
        datetimestamp: `${new Date().getTime()}`,
        supplierId: profileData.userId,
      });
      setOpenEmailLoader(true);
      const {data} = await sendVerificationEmail();
      if (data && data.success) {
        setOpenEmailLoader(false);
        openInbox();
      } else {
        Toast.show({
          type: 'error',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        showText={'My Profile'}
        navigation={props.navigation}
        showBack
        showBell
      />
      <AppUpdateBanner />
      {profileStatus == STATE_STATUS.FETCHING ? (
        <View
          style={{
            flex: 1,
            height: Dimensions.get('window').height,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          <ActivityIndicator
            style={{alignSelf: 'center', margin: Dimension.margin12}}
            size={'large'}
            color={Colors.BrandColor}
          />
        </View>
      ) : profileData.verificationStatus == 16 ? (
        <View style={styles.emptyWrap}>
          <Image
            source={require('../../assets/images/rejected.png')}
            style={{width: 350, height: 300}}
          />
          <Text
            style={{
              fontSize: Dimension.font12,
              fontFamily: Dimension.CustomMediumFont,
              color: Colors.FontColor,
              alignSelf: 'center',
              paddingVertical: Dimension.padding30,
            }}>
            Your profile is rejected, as it does not{'\n'}match to our
            requirements
          </Text>
        </View>
      ) : (
        <ScrollView bounces style={styles.ContainerCss}>
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
            {profileData && profileData.isEmailVerified ? null : (
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
                    title={'VERIFY EMAIL'}
                    loading={openemailLoader}
                    loadingColor={Colors.WhiteColor}
                    onPress={sendVerificationMail}
                    TextColor={Colors.WhiteColor}
                    buttonColor={Colors.FontColor}
                    borderColor={Colors.FontColor}
                    TextFontSize={Dimension.font10}></CustomButton>
                </View>
              </View>
            )}
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
              </TouchableOpacity>
            )).toList()}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ProfileScreen;
