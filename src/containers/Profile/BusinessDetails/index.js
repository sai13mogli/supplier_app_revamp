import {OrderedMap} from 'immutable';
import React, {useEffect, useState} from 'react';
import {Text, ScrollView,View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DropDown from '../../../component/common/DropDown';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import {getPincodeDetails, getGstDetails} from '../../../services/profile';
import {fetchUpdateBusinessDetails} from '../../../redux/actions/profile';
import CustomButton from '../../../component/common/Button';
import {STATE_STATUS} from '../../../redux/constants';
import styles from './style'
import Header from '../../../component/common/Header'
import colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';

const gstinRegex =
  '^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5})([0-9]{4})([A-Z]{1}[1-9A-Z]{1})([Z]{1})([0-9A-Z]{1})+$';
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const BusinessDetailsScreen = props => {
  const businessDetails = useSelector(
    state => state.profileReducer.businessDetails.data || {},
  );
  const businessDetailsStatus = useSelector(
    state =>
      state.profileReducer.businessDetails.status || STATE_STATUS.FETCHING,
  );

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
  const [emailError, setemailError] = useState(false);
  const [tanError, settanError] = useState(false);

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
      items: [
        {
          label: 'India',
          value: 217,
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
      enabled: true,
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
      enabled: true,
    },
    phone: {
      title: 'Phone',
      isImp: true,
      label: 'Phone',
      placeholder: '',
      errorMessage: 'Enter valid pincode',
      showError: phoneError,
      value: phone,
      maxLength: 10,
      onBlur: () => onPhoneBlur(),
      keyboardType: 'number-pad',
      onChangeText: text => setphone(text),
      component: FloatingLabelInputField,
    },
    email: {
      title: 'Email',
      isImp: true,
      label: 'Email',
      placeholder: '',
      errorMessage: 'Enter valid email',
      showError: emailError,
      value: email,
      onBlur: () => onEmailBlur(),
      onChangeText: text => setemail(text),
      component: FloatingLabelInputField,
    },
    tan: {
      title: 'TAN',
      isImp: true,
      label: 'TAN',
      placeholder: '',
      errorMessage: 'Enter valid tan',
      showError: tanError,
      value: tan,
      onBlur: () => onTanBlur(),
      onChangeText: text => settan(text),
      component: FloatingLabelInputField,
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
    if (pincode.length && pincode.length == 6) {
      onPincodeBlur();
    }
  }, [pincode]);

  const onPincodeBlur = async () => {
    if (pincode && pincode.length == 6) {
      const {data} = await getPincodeDetails(pincode);
      if (data.data && data.data.length) {
        setpincodeError(false);
        setStates([{value: data.data[0].stateId, label: data.data[0].state}]);
        setCities(data.data.map(_ => ({label: _.city, value: _.city})));
        setstate(data.data[0].stateId);
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
      const {data} = await getGstDetails(gstin);
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

  return (
    <View style={{flex:1}}>

    <Header howBack showText={'Business Details'} rightIconName={'business-details'}></Header>
    <ScrollView style={styles.ContainerCss}>
     
      {FORM_FIELDS.map((field, fieldKey) => (
        <field.component {...field} key={fieldKey} />
      )).toList()}
      
    </ScrollView>
    <View style={styles.bottombtnWrap}>
    <CustomButton
    
    buttonColor={colors.BrandColor}
   
    borderColor={colors.BrandColor }
    TextColor={colors.WhiteColor }
    TextFontSize={Dimension.font16}
        title={'Submit'}
       
        loading={loading}
  
        onPress={onSubmit}
        // TextColor={colors.WhiteColor}
        // borderColor={colors.WhiteColor}
      />
      </View>
    </View>
  );
};

export default BusinessDetailsScreen;
