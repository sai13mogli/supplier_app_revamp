import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {sendOtpForVerification} from '../services/profile';
import {updateEmail, updatePhone} from '../services/profile';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import CustomButton from './common/Button';
import CustomeIcon from './common/CustomeIcon';
import FloatingInput from './common/FloatingInput';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {fetchBusinessDetails} from '../redux/actions/profile';
const phoneRegex = '^[1-9][0-9]{9}$';
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const UpdateNumberAndEmailModal = props => {
  const {updatePhoneOtpModal, setUpdatePhoneOtpModal, type} = props;

  let interval = {};
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timerEmail, setTimerEmail] = useState(0);
  const [email, setEmail] = useState('');
  const [resendOtp, setResendOtp] = useState(false);
  const [resendOtpEmail, setResendOtpEmail] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [otpErrorMsg, setOtpErrorMsg] = useState('');
  const dispatch = useDispatch();

  const initializeCounter = type => {
    if (type == 6) {
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
    } else {
      setTimerEmail(60);
      setResendOtpEmail(true);
      interval = setInterval(() => {
        setTimerEmail(timer => {
          if (timer > 0) {
            return timer - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    }
  };

  useEffect(() => {
    if (phone && phone.length != 10) {
      setPhoneError(false);
    }
  }, [phone]);

  useEffect(() => {
    if (email && !email.match(emailRegex)) {
      setEmailError(false);
    }
  }, [email]);

  useEffect(() => {
    if (type == 6) {
      if (phoneOtp && phone.length != 6) {
        otpError(false);
      }
    } else {
      if (emailOtp && emailOtp.length != 6) {
        otpError(false);
      }
    }
  }, [phoneOtp, emailOtp]);

  useEffect(() => {
    if (email && !email.match(emailRegex)) {
      setEmailError(false);
    }
  }, [email]);

  const getValidation = () => {
    if (type == 6) {
      setTimer(0);
      return (
        phone && phone.length && phone.length == 10 && phone.match(phoneRegex)
      );
    } else {
      setTimerEmail(0);
      return email && email.length && email.match(emailRegex);
    }
  };

  const getExtraView = () => {
    if (phone && phone.length && phone.length == 10 && timer >= 1) {
      return (
        <TouchableOpacity style={styles.sendOtpBtn}>
          <Text style={styles.sendOtptext}>
            00:{String(timer).length > 1 ? String(timer) : `0${timer}`}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => onSendOtp(6)}
          disabled={!getValidation()}
          style={
            getValidation() ? styles.sendOtpBtn : styles.sendOtpBtnDisable
          }>
          <Text style={styles.sendOtptext}>
            {resendOtp ? 'Resend OTP' : 'Send OTP'}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const getExtraViewEmail = () => {
    if (email && email.length && email.match(emailRegex) && timerEmail >= 1) {
      return (
        <TouchableOpacity style={styles.sendOtpBtn}>
          <Text style={styles.sendOtptext}>
            00:
            {String(timerEmail).length > 1
              ? String(timerEmail)
              : `0${timerEmail}`}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => onSendOtp(6)}
          disabled={!getValidation()}
          style={
            getValidation() ? styles.sendOtpBtn : styles.sendOtpBtnDisable
          }>
          <Text style={styles.sendOtptext}>
            {resendOtpEmail ? 'Resend OTP' : 'Send OTP'}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const onSendOtp = async () => {
    initializeCounter(type);
    const {data} = await sendOtpForVerification(type);
    if (data && !data.success) {
      if (type == 6) {
        setPhoneError(true);
        setPhoneErrorMsg(data.message);
      } else {
        setEmailError(true);
        setEmailErrorMsg(data.message);
      }
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (type == 6) {
        let payloadObj = {
          phone,
          otp: phoneOtp,
        };
        const {data} = await updatePhone(payloadObj);
        if (data && data.success) {
          setLoading(false);
          setUpdatePhoneOtpModal(false);
          Toast.show({
            type: 'success',
            text2: data.message,
            visibilityTime: 2000,
            autoHide: true,
          });
          dispatch(fetchBusinessDetails());
        } else {
          setLoading(false);
          if (data.message == 'Invalid OTP!') {
            setOtpError(true);
            setOtpErrorMsg(data.message);
          } else {
            setPhoneError(true);
            setPhoneErrorMsg(data.message);
          }
        }
      } else {
        let payloadObj = {
          email,
          otp: emailOtp,
        };
        const {data} = await updateEmail(payloadObj);
        if (data && data.success) {
          setLoading(false);
          setUpdatePhoneOtpModal(false);
          Toast.show({
            type: 'success',
            text2: data.message,
            visibilityTime: 2000,
            autoHide: true,
          });
          dispatch(fetchBusinessDetails());
        } else {
          setLoading(false);
          if (data.message == 'Invalid OTP!') {
            setOtpError(true);
            setOtpErrorMsg(data.message);
          } else {
            setEmailError(true);
            setEmailErrorMsg(data.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkCommonValidation = () => {
    if (type == 6) {
      return (
        phone &&
        phone.length &&
        phone.match(phoneRegex) &&
        phone.length == 10 &&
        phoneOtp &&
        phoneOtp.length &&
        phoneOtp.length == 6
      );
    } else {
      return (
        email &&
        email.length &&
        email.match(emailRegex) &&
        emailOtp &&
        emailOtp.length &&
        emailOtp.length == 6
      );
    }
  };

  return (
    <Modal
      isVisible={updatePhoneOtpModal}
      coverScreen={true}
      backdropOpacity={0.9}
      onRequestClose={() => setUpdatePhoneOtpModal(false)}
      style={{padding: 0, margin: 0}}
      overlayPointerEvents={'auto'}
      onTouchOutside={() => setUpdatePhoneOtpModal(false)}
      onDismiss={() => setUpdatePhoneOtpModal(false)}
      onBackButtonPress={() => setUpdatePhoneOtpModal(false)}
      onBackdropPress={() => setUpdatePhoneOtpModal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>
        <View style={styles.ModalheadingWrapper}>
          <Text style={styles.ModalHeading}>
            {type == 6 ? 'Update Phone Number' : 'Update Email ID'}
          </Text>

          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={() => setUpdatePhoneOtpModal(false)}></CustomeIcon>
        </View>
        <View style={styles.ModalFormWrap}>
          <FloatingInput
            value={type == 6 ? phone : email}
            errorMessage={type == 6 ? phoneErrorMsg : emailErrorMsg}
            showError={type == 6 ? phoneError : emailError}
            onChangeText={text => (type == 6 ? setPhone(text) : setEmail(text))}
            maxLength={type == 6 ? 10 : 100}
            // onBlur={() =>
            //   !phone || (phone && phone.length != 10)
            //     ? setNumberError(true)
            //     : setNumberError(false)
            // }
            keyboardType={type == 6 ? 'number-pad' : 'default'}
            label={type == 6 ? 'Phone Number' : 'Email ID'}
            title={type == 6 ? 'Phone Number' : 'Email ID'}
            isImp={true}
            extraView={() => (type == 6 ? getExtraView() : getExtraViewEmail())}
          />

          <FloatingInput
            value={type == 6 ? phoneOtp : emailOtp}
            errorMessage={otpErrorMsg}
            showError={otpError}
            onChangeText={text =>
              type == 6 ? setPhoneOtp(text) : setEmailOtp(text)
            }
            maxLength={6}
            // onBlur={() =>
            //   !otp || (otp && otp.length != 6)
            //     ? setOtpError(true)
            //     : setOtpError(false)
            // }
            keyboardType={'number-pad'}
            secureTextEntry={inputType}
            label={'OTP'}
            title={'OTP'}
            isImp={true}
            extraView={() => (
              <CustomeIcon
                onPress={() => setInputType(!inputType)}
                name={'eye-open'}
                color={inputType ? '#979797' : '#000'}
                size={Dimension.font20}></CustomeIcon>
            )}
          />

          <View style={styles.buttonWrap}>
            <CustomButton
              title={'CANCEL'}
              buttonColor={Colors.DisableStateColor}
              onPress={() => setUpdatePhoneOtpModal(false)}
              TextColor={Colors.blackColor}
              borderColor={Colors.WhiteColor}
              TextFontSize={Dimension.font16}
            />
            <CustomButton
              loading={loading}
              disabled={!checkCommonValidation()}
              title={'UPDATE'}
              buttonColor={
                checkCommonValidation()
                  ? Colors.BrandColor
                  : Colors.DisableStateColor
              }
              onPress={onSubmit}
              TextColor={
                checkCommonValidation() ? Colors.WhiteColor : Colors.blackColor
              }
              borderColor={Colors.WhiteColor}
              TextFontSize={Dimension.font16}
            />
          </View>
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
    justifyContent: 'space-between',
    paddingVertical: Dimension.padding15,
    paddingHorizontal: Dimension.padding15,
  },
  ModalHeading: {
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRobotoBold,
    marginBottom: Dimension.margin40,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Dimension.padding20,
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
  sendOtpBtn: {
    backgroundColor: Colors.LightBrandColor,
    paddingVertical: Dimension.padding8,
    paddingHorizontal: Dimension.padding10,
    borderRadius: 2,

    alignItems: 'center',
  },
  sendOtpBtnDisable: {
    backgroundColor: Colors.DisableStateColor,
    paddingVertical: Dimension.padding8,
    paddingHorizontal: Dimension.padding10,
    borderRadius: 2,

    alignItems: 'center',
  },
  sendOtptext: {
    fontSize: Dimension.font14,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginLeft: Dimension.margin5,
  },
});

export default UpdateNumberAndEmailModal;
