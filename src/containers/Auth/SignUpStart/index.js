import {OrderedMap} from 'immutable';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomButton from '../../../component/common/Button';
import Checkbox from '../../../component/common/Checkbox/index';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import {sendOtpForLogin, verifyOtp} from '../../../services/auth';
import Colors from '../../../Theme/Colors';

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

  const initializeCounter = () => {
    setTimer(30);
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
      const {data} = await sendOtpForLogin(phone);
    } else {
      setphoneError(true);
    }
  };

  const getExtraView = () => {
    if (phone && phone.length && phone.length == 10 && timer >= 1) {
      return (
        <TouchableOpacity>
          <Text style={{color: '#000'}}>
            00:{String(timer).length > 1 ? String(timer) : `0${timer}`}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={onSendOtp}>
          <Text style={{color: '#000'}}>Send OTP</Text>
        </TouchableOpacity>
      );
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
      onBlur: () => onOtpBlur(),
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

  const onNext = () => {
    props.navigation.navigate('SignUpEnd', {
      phone,
      email,
      contactName,
      phonePrefix: '+91',
      rememberMe: true,
      country: '217',
    });
    // if (
    //   phone &&
    //   phone.length &&
    //   phone.length == 10 &&
    //   otp &&
    //   otp.length &&
    //   otp.length == 6 &&
    //   otpVerified &&
    //   tAndCAccepted &&
    //   email &&
    //   email.length &&
    //   email.match(emailRegex)
    // ) {
    //   props.navigation.navigate('SignUpEnd', {
    //   phone,
    //   email,
    //   contactName,
    //   phonePrefix: "+91",
    //   rememberMe: true,
    //   country: "217"
    // });
    // } else {
    //   onPhoneBlur();
    //   onOtpBlur();
    //   onEmailBlur();
    //   onContactNameBlur();
    // }
  };

  return (
    <View>
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
      <CustomButton
        title={'NEXT'}
        buttonColor={'dodgerblue'}
        onPress={onNext}
        TextColor={Colors.WhiteColor}
        borderColor={Colors.WhiteColor}
      />
    </View>
  );
};

export default SignUpStartScreen;
