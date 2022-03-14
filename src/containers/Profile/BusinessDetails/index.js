import { OrderedMap } from 'immutable';
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../../../component/common/DropDown';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import {
  getPincodeDetails,
  getGstDetails,
  sendOtpForVerification,
} from '../../../services/profile';
import { fetchUpdateBusinessDetails } from '../../../redux/actions/profile';
import CustomButton from '../../../component/common/Button';
import { STATE_STATUS } from '../../../redux/constants';
import styles from './style';
import Header from '../../../component/common/Header';
import colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import LoginOtpModal from '../../../component/LoginOtpModal';

const gstinRegex =
  '^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5})([0-9]{4})([A-Z]{1}[1-9A-Z]{1})([Z]{1})([0-9A-Z]{1})+$';
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const BusinessDetailsScreen = props => {
  let interval = {};
  const businessDetails = useSelector(
    state => state.profileReducer.businessDetails.data || {},
  );
  const businessDetailsStatus = useSelector(
    state =>
      state.profileReducer.businessDetails.status || STATE_STATUS.FETCHING,
  );
  console.log('====================================');
  console.log("businessDetails====>", businessDetails);
  console.log('====================================');

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [legalEntityName, setlegalEntityName] = useState(
    (businessDetails.profile || {}).entityName,
  );
  const [tradeName, settradeName] = useState(businessDetails.tradeName);
  const [contactName, setcontactName] = useState(
    (businessDetails.profile || {}).contactName,
  );
  const [gstin, setgstin] = useState(businessDetails.gstNo);
  const [country, setcountry] = useState(
    (businessDetails.address || {}).country,
  );
  const [pincode, setpincode] = useState(
    (businessDetails.address || {}).pincode,
  );

  const [state, setstate] = useState((businessDetails.address || {}).state);
  const [city, setcity] = useState((businessDetails.address || {}).city);
  const [phone, setphone] = useState((businessDetails.profile || {}).phone);
  const [email, setemail] = useState((businessDetails.profile || {}).email);
  const [tan, settan] = useState(businessDetails.tanNo);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [legalEntityNameError, setlegalEntityNameError] = useState(false);
  const [tradeNameError, settradeNameError] = useState(false);
  const [contactNameError, setcontactNameError] = useState(false);
  const [gstinError, setgstinError] = useState(false);
  const [countryError, setcountryError] = useState(false);
  const [pincodeError, setpincodeError] = useState(false);
  const [stateError, setstateError] = useState(false);
  const [cityError, setcityError] = useState(false);
  const [phoneError, setphoneError] = useState(false);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
  const [emailError, setemailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [tanError, settanError] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerEmail, setTimerEmail] = useState(0);
  const [sendOtp, setSendOtp] = useState(false);
  const [sendOtpEmail, setSendOtpEmail] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const [resendOtpEmail, setResendOtpEmail] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [type, setType] = useState(6);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const FORM_FIELDS = new OrderedMap({
    legalEntityName: {
      title: 'Legal Entity Name',
      isImp: true,
      label: 'Legal Entity Name',
      placeholder: '',
      errorMessage: 'Enter valid legal entity name',
      showError: legalEntityNameError,
      value: legalEntityName,
      onBlur: () => onLegalNameBllur(),
      onChangeText: text => setlegalEntityName(text),
      component: FloatingLabelInputField,
      disabled: props.route.params && props.route.params.disabled,
    },
    tradeName: {
      title: 'Trade Name',
      isImp: true,
      label: 'Trade Name',
      placeholder: '',
      errorMessage: 'Enter valid trade name',
      showError: tradeNameError,
      value: tradeName,
      onBlur: () => onTradeNameBlur(),
      onChangeText: text => settradeName(text),
      component: FloatingLabelInputField,
      disabled: props.route.params && props.route.params.disabled,
    },
    contactName: {
      title: 'Contact Name',
      isImp: true,
      label: 'Contact Name',
      placeholder: '',
      errorMessage: 'Enter valid contact name',
      showError: contactNameError,
      value: contactName,
      onBlur: () => onContactNameBlur(),
      onChangeText: text => setcontactName(text),
      component: FloatingLabelInputField,
      disabled: props.route.params && props.route.params.disabled,
    },
    gstin: {
      title: 'GSTIN',
      isImp: true,
      label: 'GSTIN',
      placeholder: '',
      errorMessage: 'Enter valid Gstin',
      showError: gstinError,
      value: gstin,
      onChangeText: text => setgstin(text),
      component: FloatingLabelInputField,
      onBlur: () => onGstinBlur(),
      disabled: props.route.params && props.route.params.disabled,
    },
    country: {
      title: 'Country',
      isImp: true,
      label: 'Country',
      placeholder: 'Country',
      errorMessage: 'Select a country',
      showError: countryError,
      selectedValue: country,
      onValueChange: text => setcountry(text),
      component: DropDown,
      disabled: props.route.params && props.route.params.disabled,
      items: [
        {
          label: 'India',
          value: 110,
        },
      ],
      enabled: false,
    },
    pincode: {
      title: 'Pincode',
      isImp: true,
      label: 'Pincode',
      placeholder: '',
      errorMessage: 'Enter valid pincode',
      showError: pincodeError,
      value: pincode,
      maxLength: 6,
      keyboardType: 'number-pad',
      onChangeText: text => setpincode(text),
      component: FloatingLabelInputField,
      onBlur: () => onPincodeBlur(),
      disabled: props.route.params && props.route.params.disabled,
    },
    state: {
      title: 'State',
      isImp: true,
      label: 'State',
      placeholder: 'State',
      errorMessage: 'Select a state',
      showError: stateError,
      selectedValue: state,
      onValueChange: text => setstate(text),
      component: DropDown,
      items: states,
      // enabled: true,
      disabled: props.route.params && props.route.params.disabled,
    },
    city: {
      title: 'City',
      isImp: true,
      label: 'City',
      placeholder: 'City',
      errorMessage: 'Select a city',
      showError: cityError,
      selectedValue: city,
      onValueChange: text => setcity(text),
      component: DropDown,
      items: cities,
      // enabled: true,
      disabled: props.route.params && props.route.params.disabled,
    },
    phone: {
      title: 'Phone',
      isImp: true,
      label: 'Phone',
      placeholder: '',
      errorMessage: phoneErrorMsg || 'Enter a valid phone number',
      showError: phoneError,
      value: phone,
      maxLength: 10,
      onBlur: () => onPhoneBlur(),
      keyboardType: 'number-pad',
      onChangeText: text => setphone(text),
      component: FloatingLabelInputField,
      disabled: false,
      extraView: () => getExtraView(),
      isfromLogin: true,
    },
    email: {
      title: 'Email',
      isImp: true,
      label: 'Email',
      placeholder: '',
      errorMessage: emailErrorMsg || 'Enter valid email',
      showError: emailError,
      value: email,
      onBlur: () => onEmailBlur(),
      onChangeText: text => setemail(text),
      component: FloatingLabelInputField,
      disabled: false,
      extraView: () => getExtraViewEmail(),
      
    },
    tan: {
      title: 'TAN',
      isImp: false,
      label: 'TAN',
      placeholder: '',
      errorMessage: 'Enter valid tan',
      showError: tanError,
      value: tan,
      onBlur: () => onTanBlur(),
      onChangeText: text => settan(text),
      component: FloatingLabelInputField,
      disabled: props.route.params && props.route.params.disabled,
    },
  });

  const onTanBlur = () => {
    if (tan && tan.length) {
      settanError(false);
    } else {
      settanError(true);
    }
  };

  const onEmailBlur = () => {
    if (email && email.length && email.match(emailRegex)) {
      setemailError(false);
    } else {
      setemailError(true);
    }
  };

  const onPhoneBlur = () => {
    if (phone && phone.length && phone.length == 10) {
      setphoneError(false);
    } else {
      setphoneError(true);
    }
  };

  const onContactNameBlur = () => {
    if (contactName && contactName.length) {
      setcontactNameError(false);
    } else {
      setcontactNameError(true);
    }
  };

  const onTradeNameBlur = () => {
    if (tradeName && tradeName.length) {
      settradeNameError(false);
    } else {
      settradeNameError(true);
    }
  };

  const onLegalNameBllur = () => {
    if (legalEntityName && legalEntityName.length) {
      setlegalEntityNameError(false);
    } else {
      setlegalEntityNameError(true);
    }
  };

  useEffect(() => {
    if (loading && businessDetailsStatus == STATE_STATUS.UPDATED) {
      setLoading(false);
      props.navigation.goBack();
    }
  }, [businessDetailsStatus]);

  useEffect(() => {
    if (pincode && pincode.length && pincode.length == 6) {
      onPincodeBlur();
    }
  }, [pincode]);

  useEffect(() => {
    if (
      phone &&
      phone.length &&
      phone.length == 10 &&
      props.route.params.disabled &&
      phone !== (businessDetails.profile || {}).phone
    ) {
      setPhoneVerified(false);
      setSendOtp(true);
    }
  }, [phone]);

  useEffect(() => {
    if (
      email &&
      email &&
      email.length &&
      email.match(emailRegex) &&
      props.route.params.disabled &&
      email !== (businessDetails.profile || {}).email
    ) {
      setEmailVerified(false);
      setSendOtpEmail(true);
    }
  }, [email]);

  const onPincodeBlur = async () => {
    if (pincode && pincode.length == 6) {
      const { data } = await getPincodeDetails(pincode);
      if (data.data && data.data.length) {
        setpincodeError(false);
        setStates([{ value: data.data[0].state, label: data.data[0].state }]);
        setCities(data.data.map(_ => ({ label: _.city, value: _.city })));
        setstate(data.data[0].state);
        if (data.data.length == 1) {
          setcity(data.data[0].city);
        }
      }
    } else {
      setpincodeError(true);
    }
  };

  const onGstinBlur = async () => {
    if (gstin && gstin.length >= 15 && gstin.match(gstinRegex)) {
      const { data } = await getGstDetails(gstin);
      if (!data.success) {
        setgstinError(true);
      } else {
        setgstinError(false);
      }
    } else {
      setgstinError(true);
    }
  };

  const onSubmit = () => {
    console.log(
      legalEntityName,
      tradeName,
      contactName,
      gstin,
      country,
      pincode,
      state,
      city,
      phone,
      email,
      tan,
    );
    if (
      legalEntityName &&
      legalEntityName.length &&
      tradeName &&
      tradeName.length &&
      contactName &&
      contactName.length &&
      gstin &&
      gstin.length &&
      country &&
      pincode &&
      pincode.length &&
      state &&
      city &&
      city.length &&
      phone &&
      phone.length &&
      email &&
      email.length &&
      tan &&
      tan.length
    ) {
      setLoading(true);
      const data = {
        tradeName: tradeName,
        gstNo: gstin,
        city: city,
        commercialLicenseNo: '121129012912',
        alternateEmail: '',
        tanNo: tan,
        isMsme: '0',
        msmeType: '',
        msmeStartDate: '',
        msmeEndDate: '',
        msmeDocNo: '',
        emailUpdate: '',
        emailOtp: '',
        isCategory: '',
        isBrand: '',
        source: 1,
        businessType: [],
        profile: {
          entityName: legalEntityName,
          contactName: contactName,
          phone: phone,
          email: email,
        },
        address: {
          country: country,
          pincode: pincode,
          state: state,
          city: city,
        },
      };
      dispatch(fetchUpdateBusinessDetails(data));
    } else {
      onTanBlur();
      onEmailBlur();
      onPhoneBlur();
      onContactNameBlur();
      onTradeNameBlur();
      onLegalNameBllur();
      onPincodeBlur();
      onGstinBlur();
    }
  };

  // const initializeCounter = () => {
  //   setTimer(60);
  //   setResendOtp(true);
  //   interval = setInterval(() => {
  //     setTimer(timer => {
  //       if (timer > 0) {
  //         return timer - 1;
  //       } else {
  //         clearInterval(interval);
  //         return 0;
  //       }
  //     });
  //   }, 1000);
  // };

  const initializeCounter = type => {
    if (type == 6) {
      setTimer(10);
      setResendOtp(true);
      setType(6);
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
      setTimerEmail(10);
      setResendOtpEmail(true);
      setType(5);
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

  const onSendOtp = async type => {
    if (type == 6) {
      if (phone === (businessDetails.profile || {}).phone) {
        setphoneError(true);
        setPhoneErrorMsg('This phone number already registered with us.');
      } else {
        if (phone && phone.length && phone.length == 10) {
          initializeCounter(type);
          const { data } = await sendOtpForVerification(type);
          console.log('data', data);
          setOtpModal(true);
        } else {
          setphoneError(true);
        }
      }
    } else {
      if (email === (businessDetails.profile || {}).email) {
        setemailError(true);
        setEmailErrorMsg('This email ID already registered with us.');
      } else {
        if (email && email.length && email.match(emailRegex)) {
          initializeCounter(type);
          const { data } = await sendOtpForVerification(type);
          console.log('data', data);
          setOtpModal(true);
        } else {
          setemailError(true);
        }
      }
    }
  };

  const getExtraView = () => {
    if (phoneVerified) {
      return (
        <CustomeIcon name={'right-tick-line'} color={Colors.SuccessStateColor} size={Dimension.font20}></CustomeIcon>
      );
    } else {
      if (sendOtp) {
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
            <TouchableOpacity
              onPress={() => onSendOtp(6)}
              style={styles.setndOtpBtn}>
              <Text style={styles.sendOtptext}>
                {resendOtp ? 'Resend OTP' : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          );
        }
      }
    }
  };

  const getExtraViewEmail = () => {
    if (emailVerified) {
      return (
        <CustomeIcon name={'right-tick-line'} color={Colors.SuccessStateColor} size={Dimension.font20}></CustomeIcon>
      );
    } else {
      if (sendOtpEmail) {
        if (
          email &&
          email.length &&
          email.match(emailRegex) &&
          timerEmail >= 1
        ) {
          return (
            <TouchableOpacity style={styles.setndOtpBtn}>
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
              onPress={() => onSendOtp(5)}
              style={styles.setndOtpBtn}>
              <Text style={styles.sendOtptext}>
                {resendOtpEmail ? 'Resend OTP' : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          );
        }
      }
    }
  };

  const onLogin = () => {
    console.log('login!!');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        showBack
        navigation={props.navigation}
        showText={'Business Details'}
        rightIconName={'business-details'}></Header>
      <ScrollView style={styles.ContainerCss}>
        {FORM_FIELDS.map((field, fieldKey) => (
          <field.component
            {...field}
            key={fieldKey}
            disabled={field.disabled}
          // enabled={field.enabled}
          // enabled={
          //   props.route.params.disabled ? false : true || field.enabled
          // }
          />
        )).toList()}
        {/* {otpModal && ( */}
          <LoginOtpModal
            visible={otpModal}
            //visible={true}
            onLogin={onLogin}
            onClose={() => setOtpModal(false)}
            email={type == 6 ? phone : email}
            frombusinessDetails={true}
            type={type}
            phoneVerified={phoneVerified}
            setPhoneVerified={setPhoneVerified}
            emailVerified={emailVerified}
            setEmailVerified={setEmailVerified}
            setresendOtp={setResendOtp}
            setresendOtpEmail={setResendOtpEmail}
          />
        {/* )} */}
      </ScrollView>
      <View style={styles.bottombtnWrap}>
        <CustomButton
          buttonColor={colors.BrandColor}
          borderColor={colors.BrandColor}
          TextColor={colors.WhiteColor}
          TextFontSize={Dimension.font16}
          title={'Submit'}
          loading={loading}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default BusinessDetailsScreen;
