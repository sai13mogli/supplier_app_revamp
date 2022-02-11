import React, {useEffect} from 'react';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import Header from '../../component/common/Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBusinessDetails, fetchProfile} from '../../redux/actions/profile';
// import Progress from 'react-native-progress/Bar';
import {OrderedMap} from 'immutable';
import {PROFILE_TABS} from '../../constants';
import styles from './style';
import CustomButton from '../../component/common/Button';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomeIcon from '../../component/common/CustomeIcon';


const ProfileScreen = props => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

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
    dispatch(fetchBusinessDetails());
    dispatch(fetchProfile());
  }, []);

  const isCompleted = progress => {
    return profileData.verificationStatus >= progress;
  };

  const isActive = (tab, route) => {
    if (NEXT_ACTIVE_TAB[profileData.verificationStatus] == tab) {
      props.navigation.navigate(route);
    }
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    props.setIsLoggedIn(false);
  };

  return (
    <View>
      <Header showBack showText={'My Profile'} />
      <ScrollView style={styles.ContainerCss}>
        <View style={styles.UserDetailWrap}>
          <Text style={styles.UserName}>
            {(profileData.userInfo || {}).contactName}
          </Text>
          <Text style={styles.UserEmail}>
            {(profileData.userInfo || {}).email}
          </Text>
          <Text style={styles.UserContact}>
            {(profileData.userInfo || {}).phone}
          </Text>
        </View>
        <Text>{PROGRESS[profileData.verificationStatus] * 100}%</Text>
        {/* <Progress
        width={200}
        animated={false}
        progress={PROGRESS[profileData.verificationStatus]}
        color={'red'}
      /> */}

        {/* navigate to activeTab isActive(tabIndex, tab.route) */}

        {PROFILE_TABS.map((tab, tabIndex) => (
          <TouchableOpacity
            key={tabIndex}
            onPress={() => props.navigation.navigate(tab.route)}
            style={styles.profileTabWrap}
            >
            <View style={{flexDirection:"row"}}> 
              <View style={[styles.IconWrap,{backgroundColor:isCompleted(tab.progress) ? Colors.grayShade3 : Colors.BrandColor}]}>
                <CustomeIcon name={tab.icon} color={isCompleted(tab.progress) ? Colors.FontColor : Colors.WhiteColor} size={Dimension.font14}></CustomeIcon>
              </View>
              <View>
                <Text style={styles.tabTitle}>{tab.title}</Text>
                <Text style={styles.tabStatusNC}>Not Completed</Text>
                <View style={{flexDirection:"row"}}>
                  <CustomeIcon name={'right-tick-line'} color={Colors.SuccessStateColor} size={Dimension.font12}></CustomeIcon>
                  <Text style={styles.tabStatusC}>Completed</Text>
                </View>
              </View>
              
            </View>
           
              <CustomeIcon name={'arrow-forward'} color={isCompleted(tab.progress) ? Colors.FontColor : Colors.BrandColor} size={Dimension.font18}></CustomeIcon>
              
            
            
           
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
        <CustomButton
          title={'LOGOUT'}
          buttonColor={Colors.grayShade1}
          onPress={onLogout}
          TextColor={Colors.FontColor}
          borderColor={Colors.eyeIcon}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
