import {OrderedMap} from 'immutable';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../../../component/common/Button';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import Colors from '../../../Theme/Colors';
import {loginWithPass} from '../../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const LoginScreen = props => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('partsbigboss@gmail.com');
  const [password, setPassword] = useState('default123');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState('');

  const FORM_FIELDS = new OrderedMap({
    email: {
      label: 'Email',
      title: 'Email',
      value: email,
      isImp: true,
      onChangeText: text => setEmail(text),
      placeholder: '',
      component: FloatingLabelInputField,
      errorMessage: 'Invalid Email',
      showError: emailError,
      onBlur: () => onEmailBlur(),
    },
    password: {
      label: 'Password',
      title: 'Password',
      isImp: true,
      value: password,
      onChangeText: text => setPassword(text),
      placeholder: '',
      secureTextEntry: true,
      component: FloatingLabelInputField,
      errorMessage: 'Invalid Password',
      showError: passwordError,
      onBlur: () => onPasswordBlur(),
    },
  });

  const onEmailBlur = () => {
    if (email && email.length && email.match(emailRegex)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const onPasswordBlur = () => {
    if (password && password.length && password.length > 4) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const onSubmit = async () => {
    if (
      email &&
      email.length &&
      email.match(emailRegex) &&
      password &&
      password.length &&
      password.length > 4
    ) {
      try {
        setLoading(true);
        setError(false);
        const {data} = await loginWithPass({
          username: email,
          password: password,
          otp: '',
          'forgot-key': '',
          source: 1,
          rememberMe: true,
        });
        if (data.success) {
          setLoading(false);
          await AsyncStorage.setItem('token', data.data.token);
          await AsyncStorage.setItem(
            'userId',
            JSON.stringify(data.data.userId),
          );
          props.route.params.setIsLoggedIn(true);
        } else {
          setLoading(false);
          setError(data.message);
        }
      } catch (e) {
        setLoading(false);
      }
    } else {
      onEmailBlur();
      onPasswordBlur();
    }
  };

  const onSendOtp = () => {};

  return (
    <View>
      <Text>Login Screen</Text>
      {FORM_FIELDS.map((field, fieldKey) => (
        <field.component {...field} />
      )).toList()}

      <CustomButton
        title={'LOGIN VIA OTP'}
        buttonColor={'dodgerblue'}
        disabled={loading}
        onPress={onSendOtp}
        TextColor={Colors.WhiteColor}
        borderColor={Colors.WhiteColor}
      />
      <CustomButton
        loading={loading}
        disabled={loading}
        title={'CONTINUE'}
        buttonColor={'dodgerblue'}
        onPress={onSubmit}
        TextColor={Colors.WhiteColor}
        borderColor={Colors.WhiteColor}
      />
    </View>
  );
};

export default LoginScreen;
