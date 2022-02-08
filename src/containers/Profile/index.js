import React, {useEffect} from 'react';
import {View} from 'react-native';
import Header from '../../component/common/Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {fetchBusinessDetails, fetchProfile} from '../../redux/actions/profile';

const ProfileScreen = props => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBusinessDetails());
    dispatch(fetchProfile());
  }, []);

  return (
    <View>
      <Header showBack showText={'My Profile'} />
    </View>
  );
};

export default ProfileScreen;
