import {OrderedMap} from 'immutable';
import React, {useEffect, useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DropDown from '../../../component/common/DropDown';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import {getPincodeDetails, getGstDetails} from '../../../services/profile';
import {fetchUpdateBusinessDetails} from '../../../redux/actions/profile';
import CustomButton from '../../../component/common/Button';
import {STATE_STATUS} from '../../../redux/constants';

const gstinRegex =
  '^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5})([0-9]{4})([A-Z]{1}[1-9A-Z]{1})([Z]{1})([0-9A-Z]{1})+$';

const BusinessDetailsScreen = props => {
  const businessDetails = useSelector(
    state => state.profileReducer.businessDetails.data,
  );
  const businessDetailsStatus = useSelector(
    state => state.profileReducer.businessDetails.status,
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [legalEntityName, setlegalEntityName] = useState(
    businessDetails.profile.entityName,
  );
  const [tradeName, settradeName] = useState(businessDetails.tradeName);
  const [contactName, setcontactName] = useState(
    businessDetails.profile.contactName,
  );
  const [gstin, setgstin] = useState(businessDetails.gstNo);
  const [country, setcountry] = useState(businessDetails.address.country);
  const [pincode, setpincode] = useState(businessDetails.address.pincode);
  const [state, setstate] = useState(businessDetails.address.state);
  const [city, setcity] = useState(businessDetails.address.city);
  const [phone, setphone] = useState(businessDetails.profile.phone);
  const [email, setemail] = useState(businessDetails.profile.email);
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
      placeholder: '',
      value: legalEntityName,
      onChangeText: text => setlegalEntityName(text),
      component: FloatingLabelInputField,
    },
    tradeName: {
      title: 'Trade Name',
      placeholder: '',
      value: tradeName,
      onChangeText: text => settradeName(text),
      component: FloatingLabelInputField,
    },
    contactName: {
      title: 'Contact Name',
      placeholder: '',
      value: contactName,
      onChangeText: text => setcontactName(text),
      component: FloatingLabelInputField,
    },
    gstin: {
      title: 'GSTIN',
      placeholder: '',
      value: gstin,
      onChangeText: text => setgstin(text),
      component: FloatingLabelInputField,
      onBlur: () => onGstinBlur(),
    },
    country: {
      title: 'Country',
      placeholder: 'Country',
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
      placeholder: '',
      value: pincode,
      maxLength: 6,
      keyboardType: 'number-pad',
      onChangeText: text => setpincode(text),
      component: FloatingLabelInputField,
      onBlur: () => onPincodeBlur(),
    },
    state: {
      title: 'State',
      placeholder: 'State',
      selectedValue: state,
      onValueChange: text => setstate(text),
      component: DropDown,
      items: states,
      enabled: true,
    },
    city: {
      title: 'City',
      placeholder: 'City',
      selectedValue: city,
      onValueChange: text => setcity(text),
      component: DropDown,
      items: cities,
      enabled: true,
    },
    phone: {
      title: 'Phone',
      placeholder: '',
      value: phone,
      maxLength: 10,
      keyboardType: 'number-pad',
      onChangeText: text => setphone(text),
      component: FloatingLabelInputField,
    },
    email: {
      title: 'Email',
      placeholder: '',
      value: email,
      onChangeText: text => setemail(text),
      component: FloatingLabelInputField,
    },
    tan: {
      title: 'TAN',
      placeholder: '',
      value: tan,
      onChangeText: text => settan(text),
      component: FloatingLabelInputField,
    },
  });

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
  };

  return (
    <ScrollView>
      <Text>BusinessDetails Screen</Text>
      {FORM_FIELDS.map((field, fieldKey) => (
        <field.component {...field} key={fieldKey} />
      )).toList()}
      <CustomButton
        title={'Submit'}
        buttonColor={'dodgerblue'}
        loading={loading}
        // iconName={'user'}
        // icon={() => (
        //   <CustomeIcon
        //     name={'add-box'}
        //     size={Dimension.font22}
        //     color={colors.BrandColor}
        //   />
        // )}
        // showIcon
        iconColor={'#fff'}
        iconType={'font-awesome'}
        onPress={onSubmit}
        // TextColor={colors.WhiteColor}
        // borderColor={colors.WhiteColor}
      />
    </ScrollView>
  );
};

export default BusinessDetailsScreen;
