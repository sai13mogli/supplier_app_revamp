import React, { useEffect, useState } from 'react';
import { OrderedMap } from 'immutable';
import { ScrollView, StyleSheet, View } from 'react-native';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import Header from '../../../component/common/Header';
import DropDown from '../../../component/common/DropDown';
import CustomButton from '../../../component/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '../../../component/common/Checkbox/index';
import Dimension from '../../../Theme/Dimension';
import colors from '../../../Theme/Colors';
import { STATE_STATUS } from '../../../redux/constants';
import {
  fetchUpdateBillingAddress,
  fetchAddressDetails,
} from '../../../redux/actions/profile';
import { getPincodeDetails } from '../../../services/profile';
import Toast from 'react-native-toast-message';
import analytics from '@react-native-firebase/analytics';

const EditAddress = props => {
  const businessDetails = useSelector(
    state => state.profileReducer.businessDetails.data || {},
  );
  const addressesDetailsStatus = useSelector(
    state =>
      state.profileReducer.addressesDetails.status || STATE_STATUS.FETCHING,
  );
  const profileData = useSelector(state => state.profileReducer.data || {});
  const addressesDetailsError = useSelector(
    state => state.profileReducer.addressesDetails.error || '',
  );
  const [loading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(
    (props?.route?.params?.addressesDetails || {})?.default,
  );
  const [sameAsbilling, setSameAsbilling] = useState('');
  const [editID, setEditID] = useState(props?.route?.params?.editID || '');
  const [phone, setPhone] = useState(
    (props?.route?.params?.addressesDetails || {})?.phone,
  );
  const [address1, setaddress1] = useState(
    (props?.route?.params?.addressesDetails || {})?.address1,
  );
  const [address2, setaddress2] = useState(
    (props?.route?.params?.addressesDetails || {})?.address2,
  );
  const [country, setcountry] = useState(
    (businessDetails.address || {}).country,
  );
  const [pincode, setpincode] = useState(
    (props?.route?.params?.addressesDetails || {})?.pincode,
  );
  const [state, setstate] = useState('');
  const [city, setcity] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [phoneError, setphoneError] = useState(false);
  const [addressLine1Error, setaddressLine1Error] = useState(false);
  const [addressLine2Error, setaddressLine2Error] = useState(false);
  const [countryNameError, setcountryNameError] = useState(false);
  const [pincodeError, setpincodeError] = useState(false);
  const [stateError, setstateError] = useState(false);
  const [cityError, setcityError] = useState(false);
  const [tabState, setTabState] = useState(props);
  const addressesResponse = useSelector(
    state => state.profileReducer.addressesDetails || [],
  );
  const dispatch = useDispatch();

  const addressesData = addressesResponse?.data;

  const filterById = obj => {
    if (obj.type == 3) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    logEvent();
  }, []);

  const logEvent = async () => {
    await analytics().logEvent('AddressDetails', {
      action: `click`,
      label:
        !editID && tabState?.route?.params?.tabState == 'Billing'
          ? 'AddNewBillingAddress'
          : !editID && tabState?.route?.params?.tabState == 'PickedUp'
            ? 'AddNewPickupAddress'
            : editID && tabState?.route?.params?.tabState == 'Billing'
              ? 'EditBillingAddress'
              : 'EditPickupAddress',
      datetimestamp: `${new Date().getTime()}`,
      supplierId: profileData.userId,
    });
  };

  let BillingAddressData = addressesData.filter(filterById);

  const FORM_FIELDS = new OrderedMap({
    phone: {
      title: 'Phone',
      isImp: true,
      label: 'Phone',
      placeholder: '',
      errorMessage: 'Enter valid phone number',
      showError: phoneError,
      value: phone,
      maxLength: 10,
      keyboardType: 'number-pad',
      onBlur: () => onPhoneBlur(),
      onChangeText: text => setPhone(text),
      component: FloatingLabelInputField,
    },
    address1: {
      title: 'Address line 1',
      isImp: true,
      label: 'Address line 1',
      placeholder: '',
      errorMessage: 'Enter valid address line 1',
      showError: addressLine1Error,
      value: address1,
      onBlur: () => onAddressLine1Blur(),
      onChangeText: text => setaddress1(text),
      component: FloatingLabelInputField,
    },
    address2: {
      title: 'Address line 2',
      isImp: true,
      label: 'Address line 2',
      placeholder: '',
      errorMessage: 'Enter valid address line 2',
      showError: addressLine2Error,
      value: address2,
      onBlur: () => onAddressLine2Blur(),
      onChangeText: text => setaddress2(text),
      component: FloatingLabelInputField,
    },
    country: {
      title: 'Country',
      isImp: true,
      label: 'Country',
      placeholder: 'Country',
      errorMessage: 'Select a country',
      showError: countryNameError,
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
      enabled: true,
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
      enabled: true,
      disabled: props.route.params && props.route.params.disabled,
    },
  });

  const onPincodeBlur = async () => {
    if (pincode && pincode.length == 6) {
      const { data } = await getPincodeDetails(pincode);
      if (data.data && data.data.length) {
        console.log('Data===>', data);
        setpincodeError(false);
        setStates([{ value: data.data[0].state, label: data.data[0].state }]);
        setCities(data.data.map(_ => ({ label: _.city, value: _.city })));
        setstate(data.data[0].state);
        if (data.data.length) {
          setcity(data.data[0].city);
        }
      }
    } else {
      setpincodeError(true);
    }
  };

  useEffect(() => {
    if (loading && addressesDetailsStatus == STATE_STATUS.UPDATED) {
      setLoading(false);
      props.navigation.goBack();
    } else if (
      loading &&
      addressesDetailsStatus == STATE_STATUS.FAILED_UPDATE
    ) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text2: addressesDetailsError && addressesDetailsError.state,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  }, [addressesDetailsStatus]);

  const callbillingAddress = BillingAddressData => {
    setSameAsbilling(!sameAsbilling);
    setPhone((BillingAddressData?.[0] || {})?.phone);
    setaddress1((BillingAddressData?.[0] || {})?.address1);
    setaddress2((BillingAddressData?.[0] || {})?.address2);
    setpincode((BillingAddressData?.[0] || {})?.pincode);
    // setSelection((BillingAddressData?.[0] || {})?.default);
  };

  const onPhoneBlur = () => {
    if (phone && phone.length == 10) {
      setphoneError(false);
    } else {
      setphoneError(true);
    }
  };
  const onAddressLine1Blur = () => {
    if (address1 && address1.length) {
      setaddressLine1Error(false);
    } else {
      setaddressLine1Error(true);
    }
  };
  const onAddressLine2Blur = () => {
    if (address2 && address2.length) {
      setaddressLine2Error(false);
    } else {
      setaddressLine2Error(true);
    }
  };
  useEffect(() => {
    if (pincode && pincode.length && pincode.length == 6) {
      onPincodeBlur();
    }
  }, [pincode]);

  const onSubmit = async () => {
    if (
      phone &&
      phone.length &&
      phone.length == 10 &&
      address1 &&
      address1.length &&
      address2 &&
      address2.length &&
      pincode &&
      pincode.length &&
      state &&
      city &&
      city.length
    ) {
      setLoading(true);
      await analytics().logEvent('AddressDetails', {
        action: `submit`,
        label:
          tabState?.route?.params?.tabState == 'Billing'
            ? 'NewBillingAddress'
            : 'NewPickupAddress',
        datetimestamp: `${new Date().getTime()}`,
        supplierId: profileData.userId,
      });
      if (editID) {
        const data = {
          id: editID,
          type: tabState?.route?.params?.tabState == 'Billing' ? 3 : 4,
          phonePrefix: +971,
          phone: phone,
          address1: address1,
          address2: address2,
          country: country,
          pincode: pincode,
          state: state,
          city: city,
          default: isSelected,
          businessType: '',
        };
        dispatch(fetchUpdateBillingAddress(data));
      } else {
        const data = {
          id: '',
          type: tabState?.route?.params?.tabState == 'Billing' ? 3 : 4,
          phonePrefix: +971,
          phone: phone,
          address1: address1,
          address2: address2,
          country: country,
          pincode: pincode,
          state: state,
          city: city,
          default: isSelected,
          businessType: '',
        };
        dispatch(fetchUpdateBillingAddress(data));
      }
    } else {
      onPhoneBlur();
      onAddressLine1Blur();
      onAddressLine2Blur();
    }
  };

  return (
    <>
      <Header
        showBack
        showBell
        navigation={props.navigation}
        showText={editID ? 'Edit Address' : 'Add Address'}
        rightIconName={'business-details'}></Header>
      <View style={{ flex: 1 }}>
        <ScrollView bounces style={styles.ContainerCss}>
          {FORM_FIELDS.map((field, fieldKey) => (
            <field.component {...field} key={fieldKey} />
          )).toList()}
        </ScrollView>
      </View>
      {tabState?.route?.params?.tabState == 'PickedUp' ? (
        <Checkbox
          checked={sameAsbilling}
          onPress={() => callbillingAddress(BillingAddressData)}
          title={'Same as billing address'}
        />
      ) : null}

      <Checkbox
        checked={isSelected}
        onPress={() => setSelection(!isSelected)}
        title={'Set as Default'}
      />
      <View style={styles.bottombtnWrap}>
        <CustomButton
          buttonColor={colors.BrandColor}
          borderColor={colors.BrandColor}
          TextColor={colors.WhiteColor}
          TextFontSize={Dimension.font16}
          title={'Next'}
          loading={loading}
          onPress={onSubmit}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ContainerCss: {
    backgroundColor: colors.WhiteColor,
    paddingHorizontal: Dimension.padding15,
  },
  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: colors.grayShade2,
    borderTopWidth: 1,
    backgroundColor: colors.WhiteColor,
  },
});

export default EditAddress;
