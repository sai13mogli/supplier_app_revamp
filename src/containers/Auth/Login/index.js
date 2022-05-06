import {OrderedMap} from 'immutable';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../../component/common/Button';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import {
  loginWithPass,
  loginWithGoogle,
  sendOtpForLogin,
  rmLogin,
} from '../../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginOtpModal from '../../../component/LoginOtpModal';
import CustomeIcon from '../../../component/common/CustomeIcon';
import styles from './style';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {setShipmentType} from '../../../redux/actions/orders';
import {setMasterAction} from '../../../redux/actions/master';
import ForgotPasswordModal from '../../../component/ForgotPasswordModal';
import {
  fetchedProfile,
  setRmData,
  setToken,
} from '../../../redux/actions/profile';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = '^[1-9][0-9]{9}$';
//partsbigboss@gmail.com
//default123

const LoginScreen = props => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState('');
  const [otpModal, setOtpModal] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const [showForgotPass, setShowForgotPass] = useState(false);

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
      secureTextEntry: isSecure,
      component: FloatingLabelInputField,
      errorMessage: 'Invalid Password',
      showError: passwordError,
      onBlur: () => onPasswordBlur(),
      extraView: () => (
        <CustomeIcon
          onPress={() => setIsSecure(!isSecure)}
          name={'eye-open'}
          color={Colors.eyeIcon}
          size={Dimension.font20}></CustomeIcon>
      ),
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

  const onLogin = async logindata => {
    setOtpModal(false);
    dispatch(setToken(logindata.data.token));
    await AsyncStorage.setItem('token', logindata.data.token);
    await AsyncStorage.setItem('userId', JSON.stringify(logindata.data.userId));
    await AsyncStorage.setItem(
      'onlineShipmentMode',
      logindata.data.onlineShipmentMode,
    );
    await AsyncStorage.setItem('rmToken', logindata.data.rmToken);
    const {data} = await rmLogin({
      token: logindata.data.rmToken,
    });
    if (data.success) {
      dispatch(setRmData(data.data));
    }
    dispatch(setShipmentType(logindata.data.onlineShipmentMode));
    dispatch(setMasterAction(props.route.params.setIsLoggedIn));
    props.route.params.setIsLoggedIn(true);
  };

  const onContinue = async => {
    setShowForgotPass(false);
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

  const onSendOtp = async () => {
    if (
      email &&
      email.length &&
      (email.match(phoneRegex) || email.length == 10)
    ) {
      const {data} = await sendOtpForLogin(email);
      if (!data.success) {
        Toast.show({
          type: 'error',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        setOtpModal(true);
      }
    } else {
      if (email && email.length && email.match(emailRegex)) {
        Toast.show({
          type: 'error',
          text2: 'Please enter register mobile number',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    }
  };

  const loginViaOtp = () => {
    if (email && email.length && email.match(phoneRegex)) {
      return false;
    } else if (email && email.length && email.match(emailRegex)) {
      return false;
    } else {
      return true;
    }
  };

  const logInWithGoogleToServer = async (token, googleemail) => {
    // this.setState({loading:true})
    const request = {
      token: `${token}`,
      source: Platform.OS === 'ios' ? 2 : 1,
      deviceToken: '',
    };
    const {data} = await loginWithGoogle(request);
    if (data.success) {
      onLogin(data);
    } else {
      props.navigation.navigate('Error', {
        email: googleemail,
      });
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      logInWithGoogleToServer(userInfo.idToken, userInfo.user.email);
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
    // <View style={{backgroundColor:"#fff",flex:1}}>
    //   <View style={{height:"30%",justifyContent:"center",}}>
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <ImageBackground
        source={require('../../../assets/images/loginBg.png')}
        resizeMode="cover" //style={{flex:1}}
      >
        <Image
          source={require('../../../assets/images/logo.png')}
          style={{height: 44, width: 180, marginTop: 80, alignSelf: 'center'}}
        />
      </ImageBackground>

      {/* // </View> */}
      <View style={styles.ContainerCss}>
        <Text style={styles.headingTxt}>Sign In</Text>
        {/* <Text>Login Screen</Text> */}
        {FORM_FIELDS.map((field, fieldKey) => (
          <field.component {...field} />
        )).toList()}
        {error ? <Text style={styles.errorTxt}>{error}</Text> : null}
        <TouchableOpacity
          onPress={() => setShowForgotPass(true)}
          style={{justifyContent: 'flex-end'}}>
          <Text style={styles.fotgotTxt}>Forgot Password</Text>
        </TouchableOpacity>
        <View style={styles.buttonWrap}>
          <View style={{flex: 1, marginRight: Dimension.margin15}}>
            <CustomButton
              title={'LOGIN VIA OTP'}
              buttonColor={Colors.FontColor}
              disabled={loginViaOtp() || loading}
              onPress={onSendOtp}
              TextColor={Colors.WhiteColor}
              borderColor={Colors.FontColor}
              TextFontSize={Dimension.font16}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomButton
              loading={loading}
              disabled={loading}
              title={'CONTINUE'}
              buttonColor={Colors.BrandColor}
              onPress={onSubmit}
              TextColor={Colors.WhiteColor}
              borderColor={Colors.BrandColor}
              TextFontSize={Dimension.font16}
            />
          </View>
        </View>
        <View style={styles.orwrap}>
          <View style={styles.leftHorizontal}></View>
          <Text style={styles.orTxt}>OR</Text>
          <View style={styles.leftHorizontal}></View>
        </View>

        {otpModal && (
          <LoginOtpModal
            visible={otpModal}
            onLogin={onLogin}
            onClose={() => setOtpModal(false)}
            email={email}
          />
        )}
        {showForgotPass && (
          <ForgotPasswordModal
            visible={showForgotPass}
            transparent={true}
            email={email}
            onContinue={onContinue}
            onClose={() => setShowForgotPass(false)}
            onPress={() => {
              setShowForgotPass(!showForgotPass);
            }}
          />
        )}
        <GoogleSigninButton
          style={{width: '100%', height: Dimension.height45, elevation: 0}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignIn}
          disabled={loading}
        />
        <View style={{marginTop: 30}}>
          <CustomButton
            title={'Not a Moglix Supplier? SignUp now'}
            buttonColor={Colors.LightBrandColor}
            onPress={() => props.navigation.navigate('SignUpStart')}
            TextColor={Colors.BrandColor}
            borderColor={Colors.LightBrandColor}
            TextFontSize={Dimension.font14}
            icon={() => (
              <CustomeIcon
                name={'arrow-forward'}
                size={Dimension.font20}
                color={Colors.BrandColor}
              />
            )}
            showIcon={true}
          />
        </View>
        <Text style={styles.allrighttxt}>
          All rights reserved. Mogli labs Pvt Ltd.
        </Text>
      </View>
      {/* // </View>  */}
    </View>
  );
};

export default LoginScreen;
