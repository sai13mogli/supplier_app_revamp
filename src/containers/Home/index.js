import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {fetchedHomepage, fetchHomepage} from '../../redux/actions/homepage';
import CustomButton from '../../component/common/Button';

const HomeScreen = props => {
  const usersData = useSelector(
    state => (state.homepageReducer || {}).data || [],
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomepage());
  }, []);

  useEffect(() => {
    console.log('usersData', usersData);
  }, [usersData]);
  return (
    <View style={styles.home}>
      {/* Exampe for CustomButton Component */}
      <CustomButton
        title={'Hello'}
        buttonColor={'dodgerblue'}
        iconName={'user'}
        showIcon
        iconColor={'#fff'}
        iconType={'font-awesome'}
        onPress={() => alert('running')}
      />
      {/* End */}

      <Text style={styles.text}>HomeScreen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('Profile')}>
        <Text style={{color: '#000'}}>Go To Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
