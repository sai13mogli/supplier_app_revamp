import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import {OrderedMap} from 'immutable';
import MultiSelectInput from '../../../component/common/MultiSelectInput';
import Header from '../../../component/common/Header';
import colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import styles from './style';
import CustomeIcon from '../../../component/common/CustomeIcon';
import {useDispatch, useSelector} from 'react-redux';
import DropDown from '../../../component/common/DropDown';
import FileUpload from '../../../component/common/FileUpload';
import CustomeDatePicker from '../../../component/common/Datepicker';
import Modal from 'react-native-modal';
import CustomButton from '../../../component/common/Button';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../redux/constants/index';
import {
  addBrandData,
  addBrand,
  setSelectCategories,
  emptyCategories,
  setCategories,
} from '../../../redux/actions/categorybrand';
import {addOrUpdateCategoryAndBrand} from '../../../services/categorybrand';
import {getAllCategories} from '../../../services/auth';

// import {uploadDocumentService} from '../../../services/documents';
const deviceWidth = Dimensions.get('window').width;

const CategoryBrandScreen = props => {
  const categories = useSelector(
    state => (state.categorybrandReducer || {}).categories || [],
  );
  const addedBrand = useSelector(
    state => (state.categorybrandReducer || {}).brandsAdded || [],
  );
  const raisedBrand = useSelector(
    state => (state.categorybrandReducer || {}).brandsData || [],
  );

  const initialSelectedCategories = useSelector(
    state => (state.categorybrandReducer || {}).initialcategories || [],
  );

  const selectedCategories = useSelector(
    state => (state.categorybrandReducer || {}).selectcategories || [],
  );

  const stateCategories = useSelector(
    state => (state.categorybrandReducer || {}).categories || [],
  );

  const [categoryCode, setcategoryCode] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [natureOfBusiness, setnatureOfBusiness] = useState(1);
  const [brandCertificate, setBrandCertificate] = useState({
    title: '',
    value: '',
    loading: false,
    showDoc: false,
    closeDoc: false,
  });
  const [expiryDate, setExpiryDate] = useState('');
  const [brandUrl, setBrandUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [brandNameError, setBrandNameError] = useState(false);
  const [brand, setBrand] = useState({});
  const [initialCategories, setInitialCategories] = useState([]);

  const dispatch = useDispatch();

  const BRAND_CATEGORY = new OrderedMap({
    category: {
      title: 'Category',
      isImp: false,
      label: 'Category',
      placeholder: 'Select Categories',
      fromAddCategory: true,
      extraView: true,
      value: selectedCategories,
      // || categories.label
      onPress: () =>
        props.navigation.navigate('Category', {
          fetchCategoryfromApi: true,
          //   setcategoryCode: setcategoryCode,
          initialCategories: selectedCategories,
        }),
    },
    brand: {
      title: 'Brand',
      isImp: false,
      label: 'Brands require Authorised letter',
      placeholder: 'Select',
      value: 'Select',
      extraView: true,
    },
  });

  const FORM_FIELDS = new OrderedMap({
    brand_name: {
      title: 'Brand Name',
      isImp: true,
      label: 'Brand Name',
      placeholder: '',
      errorMessage: 'Enter valid brand name',
      showError: brandNameError,
      value: brandName,
      disabled: true,
      onBlur: () => onBrandNameBlur(),
      onChangeText: text => setBrandName(text),
      component: FloatingLabelInputField,
    },
    nature_of_business: {
      title: 'Nature of Business',
      isImp: true,
      label: 'Nature of Business',
      errorMessage: 'Enter valid nature of business',
      selectedValue: natureOfBusiness,
      onValueChange: text => setnatureOfBusiness(text),
      component: DropDown,
      items: [
        {
          label: 'Trader',
          value: 1,
        },
        {
          label: 'Manufacturer',
          value: 2,
        },
        {
          label: 'Authorised Dealer',
          value: 3,
        },
        {
          label: 'Service',
          value: 4,
        },
        {
          label: 'Export',
          value: 5,
        },
      ],
      component: DropDown,
    },
    brand_certificate: {
      title: 'Brand / Trademark Cetificate',
      isImp: false,
      label: 'Brand / Trademark Cetificate',
      placeholder: '',
      errorMessage: 'Enter valid contact name',
      documents: {
        title: brandCertificate && brandCertificate.title,
        doc: brandCertificate && brandCertificate.value,
      },
      showDoc: brandCertificate && brandCertificate.showDoc,
      loading: brandCertificate && brandCertificate.loading,
      closeDoc: brandCertificate && brandCertificate.closeDoc,
      value: brandCertificate && brandCertificate.value,
      onRemove: () => onRemove(),
      closeDoc: brandCertificate && brandCertificate.closeDoc,
      fromCategoryBrand: true,
      uploadDocument: () => uploadFromFileExp(),
      component: FileUpload,
    },
    date: {
      title: 'Date (If Applicable)',
      isImp: natureOfBusiness == 3 ? true : false,
      label: 'Date (If Applicable)',
      placeholder: '',
      errorMessage: 'Enter valid Gstin',
      value: expiryDate,
      onChange: date => setExpiryDate(date),
      component: CustomeDatePicker,
    },
    brand_url: {
      title: 'Brand URL (If Applicable)',
      isImp: brand && brand.code ? false : true,
      label: 'Brand URL (If Applicable)',
      placeholder: 'http://ABCD.com',
      value: brandUrl,
      onChangeText: text => setBrandUrl(text),
      component: FloatingLabelInputField,
    },
  });

  useEffect(() => {
    if (
      brandCertificate &&
      brandCertificate.key == 'brandCertificate' &&
      brandCertificate.loading
    ) {
      uploadDocu(brandCertificate);
    }
  }, [brandCertificate]);

  useEffect(() => {
    if (initialSelectedCategories && initialSelectedCategories.length) {
      filterSelectedArr();
    }
  }, [initialSelectedCategories]);

  useEffect(() => {
    console.log('state data hai');
  }, [stateCategories]);

  const filterSelectedArr = async () => {
    const {data} = await getAllCategories();

    let arr = [];
    (data.data || []).forEach(ele => {
      initialSelectedCategories.forEach(e => {
        if (ele.categoryCode == e.categoryCode) {
          arr.push({...e, categoryName: ele.categoryName});
        }
      });
    });

    let mutateArr = arr.map(_ => ({
      label: _.categoryName,
      checked: true,
      id: _.categoryCode,
      value: _.categoryCode,
    }));

    dispatch(setSelectCategories(mutateArr));
    dispatch(setCategories(mutateArr));
  };

  const uploadDocu = async data => {
    let res = await uploadDocumentService(data);
    console.log('uploadDocument ka res hai bhaiii!', res);
    setDocument(res);
  };

  const uploadDocumentService = async data => {
    // setLoader(true);
    const url = `${BASE_URL}profile/file/upload`;
    let token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const response = await RNFetchBlob.fetch(
      'POST',
      url,
      {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
      [
        {
          name: 'key',
          data: data.key,
        },
        {
          name: 'code',
          data: '',
        },
        {
          name: 'file',
          filename: data.name,
          type: data.type,
          data: RNFetchBlob.wrap(data.uri),
        },
      ],
    );

    const res = await response.json();
    // setLoader(false);
    return {
      resp: res,
      fileData: data,
    };
  };

  const setDocument = ({fileData, resp}) => {
    setBrandCertificate({
      ...brandCertificate,
      title: fileData && fileData.name,
      value: resp.data && resp.data.fileKey,
      loading: false,
      showDoc: false,
      closeDoc: true,
    });
  };

  const onRemove = () => {
    setBrandCertificate({
      ...brandCertificate,
      title: '',
      value: '',
      name: '',
      type: '',
      uri: '',
      size: 0,
      showDoc: false,
      closeDoc: false,
    });
  };

  const renderInputText = ({
    isImp,
    label,
    placeholder,
    value,
    extraView,
    title,
    onChangeText,
    fromAddCategory,
    onPress,
  }) => {
    return title == 'Category' ? (
      <MultiSelectInput
        label={label}
        title={title}
        value={value}
        placeHolder={placeholder}
        rightComponentText={'ADD'}
        onPress={onPress}
        isImp={true}
      />
    ) : (
      <TouchableOpacity onPress={() => props.navigation.navigate('Brands')}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.labelStyle}>{label}</Text>
          <Text style={styles.starIcon}>*</Text>
        </View>
        <View style={styles.inputContainerStyle}>
          <Text style={styles.placeholderCss}>Select</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Brands')}>
            <CustomeIcon
              name={'eye-open'}
              size={Dimension.font20}
              color={colors.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  //upload from fileExp
  const uploadFromFileExp = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        // type: [DocumentPicker],
      });
      console.log('doc', res[0]);
      setFormState(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from single doc picker');
      } else {
        console.log('error', err);
        throw err;
      }
    }
  };

  // set Id of a particular doc
  const setFormState = data => {
    setBrandCertificate({
      ...brandCertificate,
      ...data,
      loading: true,
      key: 'brandCertificate',
    });
  };

  console.log('addedBrands', addedBrand, categories, expiryDate);

  const onSubmit = () => {
    let brandObj = {
      supplierId: '',
      brandCode: brand && brand.code,
      fileKey: brandCertificate && brandCertificate.value,
      businessNature: natureOfBusiness,
      expiryDate: expiryDate,
      isDeleted: '0',
      isRaiseRequest: 'true',
      brandListingUrl: brandUrl,
    };
    dispatch(addBrandData(brandObj));
    setModalVisible(false);
  };

  const openModal = brand => {
    setBrand({
      name: brand.name,
      code: brand.code,
    });
    setBrandName(brand.name);
    setModalVisible(true);
  };

  const checkCommonValidation = () => {
    return (
      brandName &&
      brandName.length &&
      natureOfBusiness &&
      expiryDate &&
      expiryDate.length
    );
  };
  const checkValidation = () => {
    return brandName && brandName.length && natureOfBusiness;
  };

  const checkCommonValidationReqBrand = () => {
    return (
      brandName &&
      brandName.length &&
      natureOfBusiness &&
      expiryDate &&
      expiryDate.length &&
      brandUrl &&
      brandUrl.length
    );
  };

  const getButtonColor = () => {
    if (natureOfBusiness == 3 && checkCommonValidation()) {
      console.log(expiryDate);
      return true;
    } else if (natureOfBusiness != 3 && checkValidation()) {
      return true;
    } else {
      return false;
    }
  };

  // "supplierId": "",
  // "brandCode": "bd5b7209-59d8-405e-b47a-72f2677ad497",
  // "fileKey": "d5825501532840e9db36308326a4ce9b",
  // "businessNature": "3",
  // "expiryDate": "24-02-2022",
  // "isDeleted": "0",
  // "isRaiseRequest": "false",
  // "brandListingUrl": ""

  const onNext = async () => {
    let mutatebrands = (addedBrand || []).map((_, i) => ({
      supplierId: '',
      brandCode: _.code,
      fileKey: '9a73dc34dcd5cb1f81aedfd409769347',
      businessNature: '1',
      expiryDate: '',
      isDeleted: '0',
      isRaiseRequest: 'false',
      brandListingUrl: '',
    }));

    // let categoryIds = (categories || []).map((_, i) => _.id);
    let brandsarr = [...mutatebrands, ...raisedBrand];
    let categoryIds = ([...categoryCode] || []).map((_, i) => _.id);
    // let payloadObj = {
    //   categoryCode: [...categoryIds],
    //   brandList: [...brandsarr],
    // };

    let payloadObj = {
      categoryCode: ['122000000', '260000000'],
      brandList: [
        {
          supplierId: '',
          brandCode: 'd3876965-ceba-4052-8526-42c3534a72bf',
          fileKey: '9a73dc34dcd5cb1f81aedfd409769347',
          businessNature: '2',
          expiryDate: '',
          isDeleted: '0',
          isRaiseRequest: 'false',
          brandListingUrl: '',
        },
        {
          supplierId: '',
          brandCode: 'bd5b7209-59d8-405e-b47a-72f2677ad497',
          fileKey: 'd5825501532840e9db36308326a4ce9b',
          businessNature: '3',
          expiryDate: '24-02-2022',
          isDeleted: '0',
          isRaiseRequest: 'false',
          brandListingUrl: '',
        },
        {
          supplierId: '',
          brandCode: 'dd20c1c6-7cc5-441d-8547-fc1f19c1cdff',
          fileKey: '',
          businessNature: '1',
          expiryDate: '',
          isDeleted: '0',
          isRaiseRequest: 'false',
          brandListingUrl: '',
        },
      ],
    };

    const {data} = await addOrUpdateCategoryAndBrand(payloadObj);
    console.log('data updated hi hai', data);
  };

  console.log(
    'natureofBusiness',
    natureOfBusiness,
    brandName,
    brandName.length,
    !checkCommonValidationReqBrand,
    !checkValidation,
  );

  return (
    <View style={{flex: 1}}>
      <Header
        howBack
        showText={'Category & Brand'}
        rightIconName={'category--brand'}></Header>
      <ScrollView style={styles.ContainerCss}>
        <View>
          {BRAND_CATEGORY.map(_ => renderInputText(_))
            .toList()
            .toArray()}
          {addedBrand.filter(i => i.status).length ? (
            <Text style={styles.brandHeadingTxt}>Brand Found on Moglix</Text>
          ) : null}
          <View>
            {addedBrand
              .filter(item => item.status)
              .map((_, i) => (
                <TouchableOpacity>
                  <Text style={{color: '#000'}}>Brand Name</Text>
                  <Text style={{color: '#000'}}>{_.name}</Text>
                  {_.status && !_.isDocumentRequired ? (
                    <Text style={{color: 'blue'}}>Approved</Text>
                  ) : (
                    <>
                      <Text style={{color: '#000'}}>Pending</Text>
                      <TouchableOpacity onPress={() => openModal(_)}>
                        <Text style={{color: 'red'}}>FILL DETAILS</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </TouchableOpacity>
              ))}
          </View>
          {addedBrand.filter(i => !i.status).length ? (
            <Text style={styles.brandHeadingTxt}>
              Brand you requested to add
            </Text>
          ) : null}
          <View>
            {addedBrand
              .filter(item => !item.status)
              .map((_, i) => (
                <TouchableOpacity>
                  <Text style={{color: '#000'}}>Brand Name</Text>
                  <Text style={{color: '#000'}}>{_.name}</Text>
                  <>
                    <Text style={{color: '#000'}}>Pending</Text>
                    <TouchableOpacity onPress={() => openModal(_)}>
                      <Text style={{color: 'red'}}>FILL DETAILS</Text>
                    </TouchableOpacity>
                  </>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
      <Modal
        overlayPointerEvents={'auto'}
        isVisible={modalVisible}
        onTouchOutside={() => {
          setModalVisible(false);
        }}
        onDismiss={() => {
          setModalVisible(false);
        }}
        coverScreen={true}
        deviceWidth={deviceWidth}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <View style={{backgroundColor: '#fff'}}>
          {FORM_FIELDS.map((field, fieldKey) => (
            <field.component
              fileUpload={natureOfBusiness}
              {...field}
              key={fieldKey}
            />
          )).toList()}
          {/* natureOfBusiness == 3 && checkCommonValidation() ? colors.BrandColor :
            natureOfBusiness !== 3 && checkValidation() ? colors.BrandColor :
            'dodgerblue' */}
          {brand && brand.code ? (
            <CustomButton
              buttonColor={getButtonColor() ? colors.BrandColor : 'dodgerblue'}
              borderColor={colors.BrandColor}
              TextColor={colors.WhiteColor}
              TextFontSize={Dimension.font16}
              title={'Submit'}
              disabled={
                natureOfBusiness == 3
                  ? !checkCommonValidation()
                  : !checkValidation()
              }
              onPress={onSubmit}
            />
          ) : (
            <CustomButton
              buttonColor={getButtonColor() ? colors.BrandColor : 'dodgerblue'}
              borderColor={colors.BrandColor}
              TextColor={colors.WhiteColor}
              TextFontSize={Dimension.font16}
              title={'Submit'}
              disabled={
                natureOfBusiness == 3
                  ? !checkCommonValidationReqBrand()
                  : !checkValidation()
              }
              onPress={onSubmit}
            />
          )}
        </View>
      </Modal>
      <CustomButton
        buttonColor={colors.BrandColor}
        borderColor={colors.BrandColor}
        TextColor={colors.WhiteColor}
        TextFontSize={Dimension.font16}
        title={'Next'}
        // disabled={
        //   natureOfBusiness == 3 ? !checkCommonValidation() : !checkValidation()
        // }
        loading={loading}
        onPress={onNext}
      />
    </View>
  );
};

export default CategoryBrandScreen;
