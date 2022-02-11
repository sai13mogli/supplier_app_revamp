import {OrderedMap} from 'immutable';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../../../component/common/Button';
import Checkbox from '../../../component/common/Checkbox/index';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import Colors from '../../../Theme/Colors';

const SignUpStartScreen = props => {
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [contactName, setcontactName] = useState('');
  const [otp, setotp] = useState('');
  const [otpVerified, setOtpVerified] = useState('');
  const [tAndCAccepted, setTAndCAccepted] = useState(false);
  const [sendWhatsapp, setSendWhatsapp] = useState(false);

  const [phoneError, setphoneError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [contactNameError, setcontactNameError] = useState(false);
  const [otpError, setotpError] = useState(false);

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
      keyboardType: 'number-pad',
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
    },
  });

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
        onPress={() => props.navigation.navigate('SignUpEnd')}
        TextColor={Colors.WhiteColor}
        borderColor={Colors.WhiteColor}
      />
    </View>
  );
};

export default SignUpStartScreen;
