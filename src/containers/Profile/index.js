import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Header from '../../component/common/Header';
import styles from './style';
import CustomeIcon from '../../component/common/CustomeIcon';
import {OrderedMap} from 'immutable';
import {PROFILE_TABS} from '../../constants';
import FloatingLabelInputField from '../../component/common/FloatingInput';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Icon} from 'react-native-elements';
import Dimension from "../../Theme/Dimension";
import colors from "../../Theme/Colors"

const ProfileScreen = props => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const inputDetails = [
    {
      title: 'Mobile Number*',
      state: phone,
      disabled: false,
      onChange: text => setPhone(text),
      errorText: 'Kindly enter your phone number',
      placeholder: 'Tap to Upload',
      keyboardType: 'number-pad',
      //   onBlur: onBlurPhone,
    },
    {
      title: 'Address*',
      state: address,
      disabled: false,
      onChange: text => setAddress(text),
      errorText: 'Kindly enter your phone number',
      placeholder: 'Tap to Upload',

      //   onBlur: onBlurAddress,
    },
  ];

  const renderInputText = ({
    title,
    state,
    disabled,
    onChange,
    placeholder,
    errorText,
    keyboardType,
  }) => {
    return (
      <View key={title}>
        <FloatingLabelInputField
          label={title}
          onChangeText={text => onChange(text)}
          value={state}
          placeholder={placeholder}
          disabled={disabled}
          keyboardType={keyboardType}
          extraView={() => (
            <TouchableOpacity style={{}}>
              <CustomeIcon name={'arrow-drop-down-line'} size={30}></CustomeIcon>
            </TouchableOpacity>
          )}
          //   blur={onBlur}
        />
      </View>
    );
  };

  return (
    <View>
      <Header showBack showText={'My Profile'} />
      {/* {PROFILE_TABS.map((tab, tabIndex) => (
        <TouchableOpacity
          key={tabIndex}
          onPress={() => props.navigation.navigate('Documents')}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
            {tab.title}
            {'\n'}
            {tab.completed ? 'Completed' : 'Not Completed'}
          </Text>
        </TouchableOpacity>
      )).toList()} */}
      {inputDetails.map((_, k) => renderInputText(_))}
      {/* <Input placeholder="MobileNumber" onChangeText={text => setPhone(text)} /> */}
    </View>
  );
};

export default ProfileScreen;
