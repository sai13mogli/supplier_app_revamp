import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {sendOtpForLogin, loginWithOtp} from '../services/auth';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import CustomButton from './common/Button';
import FloatingInput from './common/FloatingInput';

const LoginOtpModal = props => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    onSendOtp();
  }, []);

  const onSendOtp = async () => {
    const {data} = await sendOtpForLogin(props.email);
    if (!data.success) {
      alert(data.message);
      props.onClose();
    } else {
      setIsVisible(true);
    }
  };

  const onSubmit = async () => {
    setOtpError(false);
    if (otp && otp.length && otp.length == 6) {
      setLoading(true);
      const {data} = await loginWithOtp({
        username: props.email,
        password: '',
        otp,
        'forgot-key': '',
        source: 1,
        rememberMe: true,
      });
      if (data.success) {
        setLoading(false);
        props.onLogin(data);
      } else {
        setLoading(false);
        setOtpError(true);
      }
    } else {
      setOtpError(true);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible && isVisible}
      hasBackdrop={true}
      backdropOpacity={0.4}
      onRequestClose={props.onClose}>
      <View
        style={{
          height: '80%',
          marginTop: 'auto',
          borderRadius: 8,
          padding: Dimension.padding10,
          backgroundColor: '#fff',
        }}>
        <Text style={{color: Colors.eyeIcon}}>
          Please enter the OTP sent to {props.email}{' '}
          <Text onPress={props.onClose} style={{color: 'dodgerblue'}}>
            Change
          </Text>
        </Text>
        <FloatingInput
          value={otp}
          errorMessage={'Invalid OTP'}
          showError={otpError}
          onChangeText={text => setOtp(text)}
          maxLength={6}
          onBlur={() =>
            !otp || (otp && otp.length != 6)
              ? setOtpError(true)
              : setOtpError(false)
          }
          keyboardType={'number-pad'}
          secureTextEntry={true}
          label={'OTP'}
          title={'OTP'}
          isImp={true}
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
        <Text style={{color: Colors.eyeIcon}}>
          Did not received your OTP?
          <Text onPress={onSendOtp} style={{color: 'dodgerblue'}}>
            Request new
          </Text>
        </Text>
      </View>
    </Modal>
  );
};

export default LoginOtpModal;
