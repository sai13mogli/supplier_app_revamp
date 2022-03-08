import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {sendOtpForLogin, loginWithOtp} from '../services/auth';
import {updateEmail, updatePhone} from '../services/profile';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import CustomButton from './common/Button';
import CustomeIcon from './common/CustomeIcon';
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
    if (!props.frombusinessDetails) {
      const {data} = await sendOtpForLogin(props.email);
      if (!data.success) {
        setIsVisible(true);

        // alert(data.message);
        // props.onClose();
      } else {
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }
  };

  const onSubmit = async () => {
    setOtpError(false);
    if (otp && otp.length && otp.length == 6) {
      setLoading(true);

      if (props.frombusinessDetails && props.type == 6) {
        let payload = {
          phone: props.email,
          otp: otp,
        };
        const {data} = await updatePhone(payload);
        console.log('updatePhone', data);
        let suc = true;
        if (data.success) {
          setLoading(false);
          setIsVisible(false);
          props.setPhoneVerified(true);
          props.setresendOtp(false);
        } else {
          setLoading(false);
          setOtpError(true);
          alert('Error!!');
        }
      } else if (props.frombusinessDetails && props.type == 5) {
        let payload = {
          phone: props.email,
          otp: otp,
        };
        const {data} = await updateEmail(payload);
        let suc = true;
        if (data.success) {
          setLoading(false);
          setIsVisible(false);
          props.setEmailVerified(true);
          props.setresendOtpEmail(false);
        } else {
          setLoading(false);
          setOtpError(true);
          alert('Error!!');
        }
      } else {
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
      }
    } else {
      setOtpError(true);
    }
  };

  return (
    <Modal
      //animationType="slide"
      //transparent={false}
      isVisible={props.visible && isVisible}
      //hasBackdrop={true}
      coverScreen={true}
      backdropOpacity={0.9}
      onRequestClose={props.onClose}
      style={{padding: 0, margin: 0}}
      overlayPointerEvents={'auto'}
      onTouchOutside={props.onClose}
      onDismiss={props.onClose}
      //deviceWidth={deviceWidth}
      onBackButtonPress={props.onClose}
      onBackdropPress={props.onClose}
      //deviceHeight={Dimensions.get('window').height * 0.9}
      // style={{
      //   padding: 0,
      //   margin: 0,
      // }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>
        <View style={styles.ModalheadingWrapper}>
          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={props.onClose}></CustomeIcon>
        </View>
        <View style={styles.ModalFormWrap}>
          <Text style={styles.ModalHeading}>
            Please enter the OTP sent to {props.email}{' '}
            <Text onPress={props.onClose} style={styles.ChangeTxtCss}>
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
            extraView={() => (
              <CustomeIcon
                name={'eye-open'}
                color={Colors.eyeIcon}
                size={Dimension.font20}></CustomeIcon>
            )}
          />
          <View style={styles.buttonWrap}>
            <CustomButton
              loading={loading}
              disabled={loading}
              title={'VERIFY'}
              buttonColor={Colors.BrandColor}
              onPress={onSubmit}
              TextColor={Colors.WhiteColor}
              borderColor={Colors.WhiteColor}
              TextFontSize={Dimension.font16}
            />
          </View>

          <Text style={styles.bottomTxt}>
            Did not received your OTP ?{' '}
            <Text onPress={onSendOtp} style={styles.requesttxt}>
              Request new
            </Text>
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.WhiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: Dimension.padding10,
  },
  TopWrap: {
    paddingHorizontal: Dimension.padding15,
  },
  topbdr: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: Colors.modalBorder,
    borderRadius: 2,
    width: Dimension.width70,
  },
  ChangeTxtCss: {
    fontSize: Dimension.font16,
    color: Colors.ApproveStateColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  ModalheadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: Dimension.padding15,
    paddingHorizontal: Dimension.padding15,
  },
  ModalHeading: {
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    marginBottom: Dimension.margin40,
    alignSelf: 'center',
  },
  ModalFormWrap: {
    marginBottom: Dimension.margin20,
    paddingHorizontal: Dimension.margin15,
  },
  ModalBottomBtnWrap: {
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade2,
    padding: Dimension.padding15,
    backgroundColor: Colors.WhiteColor,
  },
  buttonWrap: {
    marginVertical: Dimension.margin20,
  },
  bottomTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,

    alignSelf: 'center',
  },
  requesttxt: {
    fontSize: Dimension.font14,
    color: Colors.ApproveStateColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin5,
  },
});

export default LoginOtpModal;
