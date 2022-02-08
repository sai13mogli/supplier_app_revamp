import React, {useEffect} from 'react';
import {TouchableOpacity, View, Text, ProgressBarAndroid,ScrollView} from 'react-native';
import Header from '../../component/common/Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBusinessDetails, fetchProfile} from '../../redux/actions/profile';
// import Progress from 'react-native-progress/Bar';
import {OrderedMap} from 'immutable';
import {PROFILE_TABS} from '../../constants';

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

  useEffect(() => {
    dispatch(fetchBusinessDetails());
    dispatch(fetchProfile());
  }, []);

  const isCompleted = progress => {
    return profileData.verificationStatus >= progress;
  };

  const navigateToBankDetails=()=>{
    navigate('BankDetails');
  }

  return (
    <View>
      <Header showBack showText={'My Profile'} />
     <ScrollView>
      <View>
        <Text style={{color: '#000'}}>
          {(profileData.userInfo || {}).contactName}
        </Text>
        <Text style={{color: '#000'}}>
          {(profileData.userInfo || {}).email}
        </Text>
        <Text style={{color: '#000'}}>
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

      {PROFILE_TABS.map((tab, tabIndex) => (
        <TouchableOpacity
          key={tabIndex}
          onPress={() => props.navigation.navigate(tab.route)}>
          <Text style={{color: isCompleted(tab.progress) ? 'green' : 'red'}}>
            {tab.icon}
          </Text>
          <View>
            <Text style={{color: '#000'}}>{tab.title}</Text>
            <Text style={{color: isCompleted(tab.progress) ? 'green' : 'red'}}>
              {isCompleted(tab.progress) ? 'Completed' : 'Not Completed'}
            </Text>
          </View>
          <Text style={{color: isCompleted(tab.progress) ? 'green' : 'red'}}>
            {' '}
            {'>'}{' '}
          </Text>
        </TouchableOpacity>
      )).toList()}
    
    </ScrollView>
    </View>
  );
};

export default ProfileScreen;
