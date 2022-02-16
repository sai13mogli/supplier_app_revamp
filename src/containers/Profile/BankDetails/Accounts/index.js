import {OrderedMap} from 'immutable';
import React, { useEffect,useState,} from 'react';
import {Text,View,FlatList,ScrollView, TouchableOpacity} from 'react-native';
import FloatingLabelInputField from '../../../../component/common/FloatingInput';
import DropDown from '../../../../component/common/DropDown';
import colors from "../../../../Theme/Colors"
import {useSelector, useDispatch} from 'react-redux';
import {fetchBankDetails} from '../../../../redux/actions/profile';
import Dimension from "../../../../Theme/Dimension";
import CustomButton from '../../../../component/common/Button';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import styles from './styles';
import AddressesModal from '../../../../component/common/AddressesModal';

const Accounts = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const bankDetails = useSelector(state => (state.profileReducer.bankDetails.data||{}));
  const bankDetailsStatus = useSelector(state => (state.profileReducer.bankDetails.status|| STATE_STATUS.FETCHING));
  const [loading, setLoading] = useState(false);
  const [accountHolderName, setAccountHolderName] = useState(bankDetails.accountHolderName);
  const [accountNumber, setAccountNumber] = useState(bankDetails.accountNumber);
  const [ifscCode, setIfscCode] = useState(bankDetails.ifscCode);
  const [branch, setBranch] = useState(bankDetails.branch);
  const [accountType, setAccountType] = useState(bankDetails.accountType);
  const [bankName, setBankName] = useState(bankDetails.bankName);

  const [accountHolderNameError, setaccountHolderNameError] = useState(false);
  const [accountNumberError, setaccountNumberError] = useState(false);
  const [ifscCodeError, setifscCodeError] = useState(false);
  const [branchError, setbranchError] = useState(false);
  const [accountTypeError, setaccountTypeError] = useState(false);
  const [bankNameError, setbankNameError] = useState(false);

  console.log("BankData====>",bankDetails);
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(fetchBankDetails());
  },[]);

  const FORM_FIELDS = new OrderedMap({
    accountHolderName: {
      title: 'Account Holder Name',
      isImp: true,
      label: 'Account Holder Name',
      placeholder: '',
      errorMessage: 'Enter valid account holder name',
      showError: accountHolderNameError,
      value: accountHolderName,
      onBlur: () => onHolderNameBllur(),
      onChangeText: text => setAccountHolderName(text),
      component: FloatingLabelInputField,
    },
    accountNumber: {
      title: 'Account Number',
      isImp: true,
      label: 'Account Number',
      placeholder: '',
      errorMessage: 'Enter valid account number',
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
      placeholder: 'Select Account Type',
      errorMessage: 'Select Account Type',
      showError: accountTypeError,
      selectedValue: accountType,
      onValueChange: text => setAccountType(text),
      component: DropDown,
      items: [
        {
          label: 'Current Account',
          value: 1,
        },
        {
          label: 'Savings Account',
          value: 1,
        },
      ],
      enabled: true,
    },
    bankName: {
      title: 'Bank Name',
      isImp: true,
      label: 'Bank Name',
      placeholder: 'Select Bank Name',
      errorMessage: 'Select Account Type',
      showError: bankNameError,
      selectedValue: bankName,
      onValueChange: text => setBankName(text),
      component: DropDown,
      items: [
        {
          label: 'SBI',
          value: 1,
        },
        {
          label: 'HDFC',
          value: 2,
        },
      ],
      enabled:true,
    },
   });

   const onHolderNameBllur = () => {
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

  const onIfscCodeBlur  = () => {
    if (ifscCode && ifscCode.length) {
      setifscCodeError(false);
    } else {
      setifscCodeError(true);
    }
  };


  const onBranchBlur  = () => {
    if (branch && branch.length) {
      setbranchError(false);
    } else {
      setbranchError(true);
    }
  };

  const onBankBlur  = () => {
    if (bankName && bankName.length) {
      setbankNameError(false);
    } else {
      setbankNameError(true);
    }
  };

  

  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.ContainerCss}>
          <View style={styles.TopWrap}>
                <Text style={styles.Pageheading}>
                  03 Billing Address
                </Text>
              <View style={{flexDirection:"row"}}>
                    <CustomeIcon name={'add-circle'} size={Dimension.font18} color={colors.BrandColor} />
                    <Text style={styles.addnewtxt}>
                      Add new
                    </Text>
              </View>
          </View> 
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
                title={'Next'}
                loading={loading}
                // onPress={onNext}
              />
          </View>
     </View>
    
  );
};

export default Accounts;