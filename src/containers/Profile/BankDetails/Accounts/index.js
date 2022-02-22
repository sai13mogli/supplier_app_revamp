import {OrderedMap} from 'immutable';
import React, { useEffect,useState,} from 'react';
import {Text,View,FlatList,ScrollView, TouchableOpacity} from 'react-native';
import FloatingLabelInputField from '../../../../component/common/FloatingInput';
import DropDown from '../../../../component/common/DropDown';
import colors from "../../../../Theme/Colors"
import {useSelector, useDispatch} from 'react-redux';
import {STATE_STATUS} from '../../../../redux/constants';
import {fetchBankDetails} from '../../../../redux/actions/profile';
import Dimension from "../../../../Theme/Dimension";
import CustomButton from '../../../../component/common/Button';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import {getIfscCodeDetails} from '../../../../services/profile';
import {fetchUpdateBankDetails} from '../../../../redux/actions/profile';
import styles from './styles';
import AddressesModal from '../../../../component/common/AddressesModal';
const ifscCodeRegex = '^[A-Za-z]{4}[a-zA-Z0-9]{7}$'
const Accounts = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const bankDetails = useSelector(state => (state.profileReducer.bankDetails.data||{}));
  const bankDetailsStatus = useSelector(state => (state.profileReducer.bankDetails.status|| STATE_STATUS.FETCHING));
  const [loading, setLoading] = useState(false);
  const [accountHolderName, setAccountHolderName] = useState(bankDetails.accountHolderName);
  const [accountNumber, setAccountNumber] = useState(bankDetails.accountNumber);
  const [ifscCode, setIfscCode] = useState(bankDetails.ifscCode);
  const [branch, setBranch] = useState(bankDetails.branch);
  const [accountType, setAccountType] = useState(bankDetails.accountType);
  const [accountTypes, setAccountTypes] = useState([]);
  const [bankName, setBankName] = useState(bankDetails.bankName);
  const [bankNames, setBankNames] = useState([]);
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
      onChangeText: text => setBranch(text),
      component: FloatingLabelInputField,
      onBlur: () => onBankNameBlur(),
    },
   });

   useEffect(() => {
    if (loading && bankDetailsStatus == STATE_STATUS.UPDATED) {
      setLoading(false);
      props.navigation.goBack();
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

  const onIfscCodeBlur  = async() => {
    if (ifscCode && ifscCode.length >= 11 && ifscCode.match(ifscCodeRegex)) {
      const {data} = await getIfscCodeDetails(ifscCode);
      if (!data.success) {
        setifscCodeError(true);
      } else {
        setifscCodeError(false);
      }
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
  const onBankNameBlur  = () => {
    if (bankName && bankName.length) {
      setbranchError(false);
    } else {
      setbranchError(true);
    }
  };


  const onSubmit = () => {
    console.log(
      accountHolderName,
      accountNumber,
      ifscCode,
      branch,
      accountType,
      bankName,
    );
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
      setLoading(true);
      const data = {
        id:'',
        accountHolderName: accountHolderName,
        accountNumber: accountNumber,
        accountType: '1',
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
      onHolderNameBlur();
      onAccountNumberBlur();
      onIfscCodeBlur();
      onBranchBlur();
      onBankNameBlur();
     
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
                onPress={onSubmit}
              />
          </View>
     </View>
    
  );
};

export default Accounts;