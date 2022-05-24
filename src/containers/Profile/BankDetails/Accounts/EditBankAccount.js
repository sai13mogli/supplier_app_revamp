import React, {useEffect, useState} from 'react';
import {OrderedMap} from 'immutable';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import FloatingLabelInputField from '../../../../component/common/FloatingInput';
import Header from '../../../../component/common/Header';
import DropDown from '../../../../component/common/DropDown';
import CustomButton from '../../../../component/common/Button';
import {useDispatch, useSelector} from 'react-redux';
import Dimension from '../../../../Theme/Dimension';
import colors from '../../../../Theme/Colors';
import {getIfscCodeDetails} from '../../../../services/profile';
import {STATE_STATUS} from '../../../../redux/constants';
import {fetchUpdateBankDetails} from '../../../../redux/actions/profile';
import analytics from '@react-native-firebase/analytics';

const ifscCodeRegex = '^[A-Za-z]{4}[a-zA-Z0-9]{7}$';

const EditBankAccount = props => {
  const bankDetails = useSelector(
    state => state.profileReducer.bankDetails.data || {},
  );
  const profileData = useSelector(
    state => (state.profileReducer || {}).data || {},
  );
  const bankDetailsStatus = useSelector(
    state => state.profileReducer.bankDetails.status || STATE_STATUS.FETCHING,
  );
  const bankDetailsError = useSelector(
    state => state.profileReducer.bankDetails.error || '',
  );
  const [loading, setLoading] = useState(false);
  const [editID, setEditID] = useState(bankDetails.id);
  const [accountHolderName, setAccountHolderName] = useState(
    bankDetails.accountHolderName,
  );
  const [accountNumber, setAccountNumber] = useState(bankDetails.accountNumber);
  const [ifscCode, setIfscCode] = useState(bankDetails.ifscCode);
  const [branch, setBranch] = useState((bankDetails || {})?.branch);
  const [accountType, setAccountType] = useState(bankDetails.accountType);
  const [bankName, setBankName] = useState('');
  const [accountHolderNameError, setaccountHolderNameError] = useState(false);
  const [accountNumberError, setaccountNumberError] = useState(false);
  const [ifscCodeError, setifscCodeError] = useState(false);
  const [branchError, setbranchError] = useState(false);
  const [accountTypeError, setAccountTypeError] = useState(false);
  const [bankNameError, setbankNameError] = useState(false);
  const [init, setInit] = useState(true);

  const dispatch = useDispatch();
  const FORM_FIELDS = new OrderedMap({
    accountHolderName: {
      title: 'Account Holder Name',
      isImp: true,
      label: 'Account Holder Name',
      placeholder: '',
      errorMessage: 'Enter valid account holder name',
      showError: accountHolderNameError,
      value: accountHolderName,
      onBlur: () => onHolderNameBlur(),
      onChangeText: text => setAccountHolderName(text),
      component: FloatingLabelInputField,
    },
    accountNumber: {
      title: 'Account Number',
      isImp: true,
      label: 'Account Number',
      placeholder: '',
      errorMessage: 'Enter valid account number',
      maxLength: 18,
      keyboardType: 'number-pad',
      showError: accountNumberError,
      value: accountNumber,
      onBlur: () => onAccountNumberBlur(),
      onChangeText: text => setAccountNumber(text),
      component: FloatingLabelInputField,
    },
    ifscCode: {
      title: 'IFSC',
      isImp: true,
      label: 'IFSC',
      placeholder: '',
      errorMessage: 'Enter valid ifsc code',
      showError: ifscCodeError,
      value: ifscCode,
      maxLength: 11,
      onBlur: () => onIfscCodeBlur(),
      onChangeText: text => setIfscCode(text),
      component: FloatingLabelInputField,
    },
    branch: {
      title: 'Branch',
      isImp: true,
      label: 'Branch',
      placeholder: '',
      errorMessage: 'Enter valid branch name',
      showError: branchError,
      value: branch,
      onChangeText: text => setBranch(text),
      component: FloatingLabelInputField,
      onBlur: () => onBranchBlur(),
    },
    accountType: {
      title: 'Account Type',
      isImp: true,
      label: 'Account Type',
      placeholder: 'Account Type',
      errorMessage: 'Select Account Type',
      showError: accountTypeError,
      selectedValue: accountType,
      onValueChange: text => setAccountType(text),
      component: DropDown,
      items: [
        {
          label: 'Current',
          value: 1,
        },
        {
          label: 'Saving',
          value: 2,
        },
        {
          label: 'Joint',
          value: 3,
        },
      ],
      enabled: true,
    },
    bankName: {
      title: 'Bank Name',
      isImp: true,
      label: 'Bank Name',
      placeholder: 'Bank Name',
      errorMessage: 'Select Account Type',
      showError: bankNameError,
      value: bankName,
      onChangeText: text => setBankName(text),
      component: FloatingLabelInputField,
      onBlur: () => onBankNameBlur(),
    },
  });

  useEffect(() => {
    setInit(false);
  }, []);

  useEffect(() => {
    if (loading && bankDetailsStatus == STATE_STATUS.UPDATED) {
      setLoading(false);
      props.navigation.goBack();
    } else if (loading && bankDetailsStatus == STATE_STATUS.FAILED_UPDATE) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text2: bankDetailsError && bankDetailsError.state,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  }, [bankDetailsStatus]);

  const onHolderNameBlur = () => {
    if (accountHolderName && accountHolderName.length) {
      setaccountHolderNameError(false);
    } else {
      setaccountHolderNameError(true);
    }
  };

  const onAccountNumberBlur = () => {
    if (accountNumber && accountNumber.length) {
      setaccountNumberError(false);
    } else {
      setaccountNumberError(true);
    }
  };

  const onIfscCodeBlur = async () => {
    if (ifscCode && ifscCode.length >= 11 && ifscCode.match(ifscCodeRegex)) {
      const {data} = await getIfscCodeDetails(ifscCode);
      if (data.data.result) {
        setifscCodeError(false);
        setBranch(data?.data?.result?.branch);
        setBankName(data?.data?.result?.bank);
      } else if (data.success == false) {
        setifscCodeError(data?.message);
      } else {
        setifscCodeError(false);
      }
    }
  };

  useEffect(() => {
    if (ifscCode && ifscCode.length && ifscCode.length == 11) {
      onIfscCodeBlur();
    }
  }, [ifscCode]);

  const onBranchBlur = () => {
    if (branch && branch.length) {
      setbranchError(false);
    } else {
      setbranchError(true);
    }
  };
  const onBankNameBlur = () => {
    if (bankName && bankName.length) {
      setbranchError(false);
    } else {
      setbranchError(true);
    }
  };

  const onAccountTypeBlur = () => {
    if (accountType) {
      setAccountTypeError(false);
    } else {
      setAccountTypeError(true);
    }
  };

  useEffect(() => {
    if (!init) {
      if (accountType) {
        setAccountTypeError(false);
      } else {
        setAccountTypeError(true);
      }
    }
  }, [accountType]);

  const onSubmit = async () => {
    if (
      accountHolderName &&
      accountHolderName.length &&
      accountNumber &&
      accountNumber.length &&
      ifscCode &&
      ifscCode.length &&
      branch &&
      branch.length &&
      branch &&
      accountType &&
      bankName &&
      bankName.length
    ) {
      await analytics().logEvent('BankDetails', {
        action: `submit`,
        label: '',
        datetimestamp: `${new Date().getTime()}`,
        supplierId: profileData.userId,
      });
      setLoading(true);
      if (editID) {
        const data = {
          id: editID,
          accountHolderName: accountHolderName,
          accountNumber: accountNumber,
          accountType: accountType,
          ifscCode: ifscCode,
          branch: branch,
          bankName: bankName,
          city: 'delhi',
          currencyType: '2',
          countryCode: '217',
          businessType: 'businessType',
        };
        dispatch(fetchUpdateBankDetails(data));
      } else {
        const data = {
          id: '',
          accountHolderName: accountHolderName,
          accountNumber: accountNumber,
          accountType: accountType,
          ifscCode: ifscCode,
          branch: branch,
          bankName: bankName,
          city: 'delhi',
          currencyType: '2',
          countryCode: '217',
          businessType: 'businessType',
        };
        dispatch(fetchUpdateBankDetails(data));
      }
    } else {
      onHolderNameBlur();
      onAccountNumberBlur();
      onIfscCodeBlur();
      onBranchBlur();
      onBankNameBlur();
      onAccountTypeBlur();
    }
  };

  return (
    <>
      <Header
        showBack
        showBell
        navigation={props.navigation}
        showText={editID ? 'Edit Bank Account' : 'Add Bank Account'}
        rightIconName={'bank-details'}></Header>

      <View style={{flex: 1}}>
        <ScrollView bounces style={styles.ContainerCss}>
          {FORM_FIELDS.map((field, fieldKey) => (
            <field.component {...field} key={fieldKey} />
          )).toList()}
        </ScrollView>
      </View>

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
    marginTop: 10,
  },
  Pageheading: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  TopWrap: {
    marginLeft: Dimension.margin20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: colors.grayShade2,
    borderTopWidth: 1,
    backgroundColor: colors.WhiteColor,
  },
});

// Exampe for CustomButton Component

export default EditBankAccount;
