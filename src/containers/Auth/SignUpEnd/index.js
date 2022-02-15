import {OrderedMap} from 'immutable';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import DropDown from '../../../component/common/DropDown';
import MultiSelectInput from '../../../component/common/MultiSelectInput';
import {getGstDetails} from '../../../services/profile';
import CustomButton from '../../../component/common/Button';
import Colors from '../../../Theme/Colors';

const gstinRegex =
  '^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5})([0-9]{4})([A-Z]{1}[1-9A-Z]{1})([Z]{1})([0-9A-Z]{1})+$';

const SignUpEndScreen = props => {
  const [natureOfBusiness, setnatureOfBusiness] = useState('');
  const [categoryCode, setcategoryCode] = useState([]);
  const [gstin, setgstin] = useState('');
  const [natureOfBusinessError, setnatureOfBusinessError] = useState(false);
  const [categoryCodeError, setcategoryCodeError] = useState(false);
  const [gstinError, setgstinError] = useState(false);

  const FORM_FIELDS = new OrderedMap({
    natureOfBusiness: {
      label: 'What Is Your Business Model?',
      title: 'What Is Your Business Model?',
      selectedValue: natureOfBusiness,
      component: DropDown,
      isImp: true,
      errorMessage: 'Invalid ',
      showError: natureOfBusinessError,
      placeholder: 'Please Select',
      onValueChange: text => setnatureOfBusiness(text),
      items: [
        {label: 'B2B', value: 1},
        {label: 'B2C', value: 2},
        {label: 'Both', value: 3},
      ],
      enabled: true,
    },
    categoryCode: {
      label: 'Products you want to sell',
      title: 'Products you want to sell',
      value: categoryCode,
      placeHolder: 'Select Categories',
      rightComponentText: 'ADD',
      onPress: () =>
        props.navigation.navigate('SelectCategory', {
          fetchCategoryfromApi: true,
          setcategoryCode: setcategoryCode,
          categoryCode: categoryCode,
        }),
      component: MultiSelectInput,
      isImp: true,
      errorMessage: 'Invalid ',
      showError: categoryCodeError,
    },
    gstin: {
      label: 'GSTIN',
      title: 'GSTIN',
      value: gstin,
      component: FloatingLabelInputField,
      isImp: true,
      errorMessage: 'Invalid ',
      onBlur: () => onGstinBlur(),
      onChangeText: text => setgstin(text),
      showError: gstinError,
      maxLength: 15,
    },
  });

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

  const onSignUp = async () => {
    if (
      natureOfBusiness &&
      categoryCode &&
      categoryCode.length &&
      gstin &&
      gstin.length >= 15 &&
      gstin.match(gstinRegex)
    ) {
    } else {
    }
  };

  return (
    <View>
      <Text>SignUpEnd</Text>
      {FORM_FIELDS.map((field, fieldKey) => (
        <field.component {...field} key={fieldKey} />
      )).toList()}
      <CustomButton
        title={'SUBMIT'}
        buttonColor={'dodgerblue'}
        onPress={onSignUp}
        TextColor={Colors.WhiteColor}
        borderColor={Colors.WhiteColor}
      />
    </View>
  );
};

export default SignUpEndScreen;
