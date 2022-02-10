import {OrderedMap} from 'immutable';
import React, {useEffect, useState} from 'react';
import {View, Text, Platform} from 'react-native';
import CustomButton from '../../../component/common/Button';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import Colors from '../../../Theme/Colors';
import {loginWithPass, loginWithGoogle} from '../../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginOtpModal from '../../../component/LoginOtpModal';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const LoginScreen = props => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('partsbigboss@gmail.com');
  const [password, setPassword] = useState('default123');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState('');
  const [otpModal, setOtpModal] = useState(false);

  const FORM_FIELDS = new OrderedMap({
    email: {
      label: 'Email/Phone',
      title: 'Email/Phone',
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

  useEffect(() => {
    GoogleSignin.configure({
      androidClientId:
        '741494485171-kajgg1v4u6dom6nvgpphnblfn262v3fl.apps.googleusercontent.com',
      webClientId:
        '741494485171-rpjbl1igfkbarlunlm8sqrssq6nq77rc.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      prompt: 'select_account',
      //forceConsentPrompt: false,
    });
  }, []);

  const onLogin = async data => {
    setOtpModal(false);
    await AsyncStorage.setItem('token', data.data.token);
    await AsyncStorage.setItem('userId', JSON.stringify(data.data.userId));
    props.route.params.setIsLoggedIn(true);
  };

  const onEmailBlur = () => {
    if (
      email &&
      email.length &&
      (email.match(emailRegex) || email.length == 10)
    ) {
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
      (email.match(emailRegex) || email.length == 10) &&
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
          onLogin(data);
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

  const onSendOtp = () => {
    if (
      email &&
      email.length &&
      (email.match(emailRegex) || email.length == 10)
    ) {
      setOtpModal(true);
    } else {
      onEmailBlur();
    }
  };

  const logInWithGoogleToServer = async token => {
    // this.setState({loading:true})
    const request = {
      token: token,
      source: Platform.OS === 'ios' ? 2 : 1,
      deviceToken: '',
    };
    const {data} = await loginWithGoogle(request);
    if (data.success) {
      onLogin(data);
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      logInWithGoogleToServer(userInfo.idToken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        alert(error);
      }
    }
  };

  return (
    <View>
      <Text>Login Screen</Text>
      {FORM_FIELDS.map((field, fieldKey) => (
        <field.component {...field} />
      )).toList()}
      {error ? <Text>{error}</Text> : null}
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
      {otpModal && (
        <LoginOtpModal
          visible={otpModal}
          onLogin={onLogin}
          onClose={() => setOtpModal(false)}
          email={email}
        />
      )}
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
        disabled={loading}
      />
    </View>
  );
};

export default LoginScreen;
