import {OrderedMap} from 'immutable';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import CustomButton from '../../../component/common/Button';
import CustomeIcon from '../../../component/common/CustomeIcon';
import Checkbox from '../../../component/common/Checkbox/index';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import {
  sendOtpForLogin,
  sendOtpForSignUp,
  validateEmailPhone,
  verifyOtp,
} from '../../../services/auth';
import Colors from '../../../Theme/Colors';
import styles from './style';
import Dimension from '../../../Theme/Dimension';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const SignUpStartScreen = props => {
  let interval = {};
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [contactName, setcontactName] = useState('');
  const [otp, setotp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [tAndCAccepted, setTAndCAccepted] = useState(false);
  const [sendWhatsapp, setSendWhatsapp] = useState(false);

  const [phoneError, setphoneError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [contactNameError, setcontactNameError] = useState(false);
  const [otpError, setotpError] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resendOtp, setResendOtp] = useState(false);

  const initializeCounter = () => {
    setTimer(60);
    setResendOtp(true);
    interval = setInterval(() => {
      setTimer(timer => {
        if (timer > 0) {
          return timer - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);
  };

  const onSendOtp = async () => {
    if (phone && phone.length && phone.length == 10) {
      initializeCounter();
      const {data} = await sendOtpForSignUp({phone, prefix: '+91'});
    } else {
      setphoneError(true);
    }
  };

  const getExtraView = () => {
    if (phone && phone.length && phone.length == 10 && timer >= 1) {
      return (
        <TouchableOpacity style={styles.setndOtpBtn}>
          <Text style={styles.sendOtptext}>
            00:{String(timer).length > 1 ? String(timer) : `0${timer}`}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={onSendOtp} style={styles.setndOtpBtn}>
          <Text style={styles.sendOtptext}>
            {resendOtp ? 'Resend OTP' : 'Send OTP'}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const getCheckMarkView = () => {
    if (otpVerified) {
      return (
        <CustomeIcon
          name={'right-tick-line'}
          color={Colors.SuccessStateColor}
          size={Dimension.font20}></CustomeIcon>
      );
    } else {
      return null;
    }
  };

  const onPhoneBlur = () => {
    if (phone && phone.length && phone.length == 10) {
      setphoneError(false);
    } else {
      setphoneError(true);
    }
  };

  const onOtpBlur = async () => {
    if (!otpVerified) {
      if (otp && otp.length && otp.length == 6) {
        setotpError(false);
        if (
          phone &&
          phone.length &&
          phone.length == 10 &&
          otp &&
          otp.length &&
          otp.length == 6
        ) {
          const {data} = await verifyOtp({phone, otp});
          if (data.success) {
            setOtpVerified(true);
          } else {
            setotpError(true);
          }
        }
      } else {
        setotpError(true);
      }
    }
  };

  const onEmailBlur = () => {
    if (email && email.length && email.match(emailRegex)) {
      setemailError(false);
    } else {
      setemailError(true);
    }
  };

  const onContactNameBlur = () => {
    if (contactName && contactName.length) {
      setcontactNameError(false);
    } else {
      setcontactNameError(true);
    }
  };

  const FORM_FIELDS = new OrderedMap({
    phone: {
      title: 'Phone Number',
      label: 'Phone Number',
      isImp: true,
      value: phone,
      onChangeText: text => setphone(text),
      component: FloatingLabelInputField,
      errorMessage: 'Invalid phone',
      showError: phoneError,
      keyboardType: 'number-pad',
      maxLength: 10,
      onBlur: () => onPhoneBlur(),
      extraView: () => getExtraView(),
      isfromLogin: true,
    },
    otp: {
      title: 'OTP',
      label: 'OTP',
      isImp: true,
      value: otp,
      onChangeText: text => setotp(text),
      component: FloatingLabelInputField,
      errorMessage: 'Invalid otp',
      showError: otpError,
      secureTextEntry: true,
      maxLength: 6,
      keyboardType: 'number-pad',
      extraView: () => getCheckMarkView(),
      onBlur: () => onOtpBlur(),
      isfromLogin: true,
    },
    email: {
      title: 'Email',
      label: 'Email',
      isImp: true,
      value: email,
      onChangeText: text => setemail(text),
      component: FloatingLabelInputField,
      errorMessage: 'Invalid email',
      showError: emailError,
      onBlur: () => onEmailBlur(),
    },
    contactName: {
      title: 'Full Name',
      label: 'Full Name',
      isImp: true,
      value: contactName,
      onChangeText: text => setcontactName(text),
      component: FloatingLabelInputField,
      errorMessage: 'Invalid contact name',
      showError: contactNameError,
      onBlur: () => onContactNameBlur(),
    },
  });

  const onNext = async () => {
    // props.navigation.navigate('SignUpEnd', {
    //   phone,
    //   email,
    //   contactName,
    //   phonePrefix: '+91',
    //   rememberMe: true,
    //   country: '110',
    // });
    if (
      phone &&
      phone.length &&
      phone.length == 10 &&
      otp &&
      otp.length &&
      otp.length == 6 &&
      otpVerified &&
      tAndCAccepted &&
      email &&
      email.length &&
      email.match(emailRegex) &&
      contactName &&
      contactName.length
    ) {
      let payload = {
        email,
        phone,
      };
      const {data} = await validateEmailPhone(payload);
      if (data.success) {
        props.navigation.navigate('SignUpEnd', {
          phone,
          email,
          contactName,
          phonePrefix: '+91',
          rememberMe: true,
          country: '110',
        });
      } else {
        alert(data.message);
      }
    } else {
      onPhoneBlur();
      onOtpBlur();
      onEmailBlur();
      onContactNameBlur();
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/images/SignUpBg.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <ScrollView style={styles.ContainerCss}>
          <View style={styles.headerPart}>
            <CustomeIcon
              name={'arrow-back'}
              size={Dimension.font20}
              color={Colors.blackColor}
              onPress={() => props.navigation.goBack()}
            />
            <View style={styles.greenBar}></View>
            <View style={styles.garyBar}></View>
          </View>
          <CustomButton
            title={'Already a Moglix Supplier? Sign In'}
            buttonColor={Colors.LightBrandColor}
            onPress={() => props.navigation.navigate('Login')}
            TextColor={Colors.BrandColor}
            borderColor={Colors.LightBrandColor}
            TextFontSize={Dimension.font14}
            icon={() => (
              <CustomeIcon
                name={'arrow-back'}
                size={Dimension.font20}
                color={Colors.BrandColor}
                onPress={() => props.navigation.goBack()}
              />
            )}
          />
          <Text style={styles.headingTxt}>Step 1 : Signup</Text>
          <View style={styles.formWrap}>
            {FORM_FIELDS.map((field, fieldKey) => (
              <field.component key={fieldKey} {...field} />
            )).toList()}
            <Checkbox
              checked={tAndCAccepted}
              onPress={() => setTAndCAccepted(!tAndCAccepted)}
              title={'I Accept The Terms and Conditions'}
            />
            <Checkbox
              checked={sendWhatsapp}
              onPress={() => setSendWhatsapp(!sendWhatsapp)}
              title={'Send WhatsApp Notifications.'}
            />
          </View>
        </ScrollView>
      </ImageBackground>
      <View></View>
      <View style={styles.bottomBtnWrap}>
        <CustomButton
          title={'NEXT'}
          buttonColor={Colors.BrandColor}
          onPress={onNext}
          TextColor={Colors.WhiteColor}
          borderColor={Colors.BrandColor}
          TextFontSize={Dimension.font16}
        />
      </View>
    </View>
  );
};

export default SignUpStartScreen;
