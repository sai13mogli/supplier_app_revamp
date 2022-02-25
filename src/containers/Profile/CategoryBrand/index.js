import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
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
  updateBrandData,
} from '../../../redux/actions/categorybrand';
import {addOrUpdateCategoryAndBrand} from '../../../services/categorybrand';
import {getAllCategories} from '../../../services/auth';
import {fetchProfile} from '../../../redux/actions/profile';

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
  const supplierId = useSelector(
    state =>
      (((state.profileReducer || {}).data || {}).userInfo || {}).id || '',
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
    errorState: false,
    errorText: 'Certificate upload failed.Please try again.',
  });
  const [expiryDate, setExpiryDate] = useState('');
  const [brandUrl, setBrandUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [brandNameError, setBrandNameError] = useState(false);
  const [brand, setBrand] = useState({});
  const [initialCategories, setInitialCategories] = useState([]);
  const [nextLoader, setNextLoader] = useState(false);

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
      errorState: brandCertificate && brandCertificate.errorState,
      errorText: brandCertificate && brandCertificate.errorText,
      onRemove: () => onRemove(),
      closeDoc: brandCertificate && brandCertificate.closeDoc,
      fromCategoryBrand: true,
      uploadDocument: () => uploadFromFileExp(),
      onPress: () => uploadFromFileExp(),
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
    let {resp} = res;

    if (resp.error) {
      setErrorData();
    } else {
      setDocument(res);
    }
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

  const setErrorData = () => {
    setBrandCertificate({
      ...brandCertificate,
      loading: false,
      errorState: true,
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
              name={'arrow-right-line'}
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
      errorState: false,
    });
  };

  console.log('addedBrands', addedBrand, categories, expiryDate);

  const onSubmit = raiseRequest => {
    let currBrand = (raisedBrand || []).find(_ => _.brandName == brand.name);
    console.log(currBrand);
    if (currBrand) {
      let currBrandObj = {
        supplierId: '',
        brandCode: (brand && brand.code) || 'collectiontest',
        fileKey: brandCertificate && brandCertificate.value,
        businessNature: natureOfBusiness,
        expiryDate: expiryDate,
        isDeleted: '0',
        isRaiseRequest: raiseRequest ? 'true' : 'false',
        brandListingUrl: brandUrl,
        brandName: brand && brand.name,
        filled: true,
      };
      dispatch(updateBrandData(currBrandObj));
    } else {
      let brandObj = {
        supplierId: '',
        brandCode: (brand && brand.code) || 'collectiontest',
        fileKey: brandCertificate && brandCertificate.value,
        businessNature: natureOfBusiness,
        expiryDate: expiryDate,
        isDeleted: '0',
        isRaiseRequest: raiseRequest ? 'true' : 'false',
        brandListingUrl: brandUrl,
        brandName: brand && brand.name,
        filled: true,
      };
      dispatch(addBrandData(brandObj));
    }

    setModalVisible(false);
  };

  const openModal = brand => {
    setBrand({
      name: brand.name,
      code: brand.code,
    });
    setBrandName(brand.name);
    setnatureOfBusiness(1);
    setBrandCertificate({
      title: '',
      value: '',
      loading: false,
      showDoc: false,
      closeDoc: false,
      errorState: false,
      errorText: 'Certificate upload failed.Please try again.',
    });
    setExpiryDate('');
    setBrandUrl('');
    setModalVisible(true);
  };

  const checkCommonValidation = () => {
    return brandName && brandName.length && natureOfBusiness && expiryDate;
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

  const checkValidationReqBrand = () => {
    return (
      brandName &&
      brandName.length &&
      natureOfBusiness &&
      brandUrl &&
      brandUrl.length
    );
  };

  const getButtonColor = () => {
    if (natureOfBusiness == 3 && checkCommonValidation()) {
      return true;
    } else if (natureOfBusiness != 3 && checkValidation()) {
      return true;
    } else {
      return false;
    }
  };

  const getButtonColorReqBrand = () => {
    if (natureOfBusiness == 3 && checkCommonValidationReqBrand()) {
      return true;
    } else if (natureOfBusiness != 3 && checkValidationReqBrand()) {
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
    setNextLoader(true);
    try {
      let mutatebrands = (addedBrand || [])
        .filter(it => !it.isDocumentRequired && it.status)
        .map((_, i) => ({
          supplierId: supplierId,
          brandCode: _.code,
          fileKey: '',
          businessNature: '1',
          expiryDate: '',
          isDeleted: '0',
          isRaiseRequest: 'false',
          brandListingUrl: '',
        }));

      let mutateRaisedbrands = (raisedBrand || []).map((_, i) => ({
        supplierId: supplierId,
        brandCode: _.brandCode,
        fileKey: _.fileKey,
        businessNature: _.businessNature,
        expiryDate: _.expiryDate,
        isDeleted: _.isDeleted,
        isRaiseRequest: _.isRaiseRequest,
        brandListingUrl: _.brandListingUrl,
      }));

      console.log('mutateBrands', mutatebrands);
      console.log('raisedBrands', mutateRaisedbrands);

      let brandsarr = [...mutatebrands, ...mutateRaisedbrands];
      console.log('brandsArr', brandsarr);
      let categoryIds = ([...selectedCategories] || []).map((_, i) => _.id);
      let payloadObj = {
        categoryCode: [...categoryIds],
        brandList: [...brandsarr],
      };
      console.log(payloadObj);
      // let payloadObj = {
      //   categoryCode: ['122000000', '260000000'],
      //   brandList: [
      //     {
      //       supplierId: '',
      //       brandCode: 'd3876965-ceba-4052-8526-42c3534a72bf',
      //       fileKey: '9a73dc34dcd5cb1f81aedfd409769347',
      //       businessNature: '2',
      //       expiryDate: '',
      //       isDeleted: '0',
      //       isRaiseRequest: 'false',
      //       brandListingUrl: '',
      //     },
      //     {
      //       supplierId: '',
      //       brandCode: 'bd5b7209-59d8-405e-b47a-72f2677ad497',
      //       fileKey: 'd5825501532840e9db36308326a4ce9b',
      //       businessNature: '3',
      //       expiryDate: '24-02-2022',
      //       isDeleted: '0',
      //       isRaiseRequest: 'false',
      //       brandListingUrl: '',
      //     },
      //     {
      //       supplierId: '',
      //       brandCode: 'dd20c1c6-7cc5-441d-8547-fc1f19c1cdff',
      //       fileKey: '',
      //       businessNature: '1',
      //       expiryDate: '',
      //       isDeleted: '0',
      //       isRaiseRequest: 'false',
      //       brandListingUrl: '',
      //     },
      //   ],
      // };
      const {data} = await addOrUpdateCategoryAndBrand(payloadObj);
      if (data && data.success) {
        setNextLoader(false);
        dispatch(fetchProfile());
        props.navigation.goBack();
      } else {
        setNextLoader(false);
        console.log('something went wrong!!');
      }
    } catch (error) {
      setNextLoader(false);
      console.log(error);
    }
  };

  const getNextStatus = () => {
    let addedBrandCount = (addedBrand || []).filter(
      _ => _.isDocumentRequired || !_.id,
    ).length;
    let filledData = (raisedBrand || [])
      .filter(_ => _.filled)
      .map(_ => _.filled).length;
    if (
      addedBrand.length != 0 &&
      addedBrandCount == filledData &&
      selectedCategories.length > 0
    ) {
      console.log('inside true');
      return true;
    } else {
      console.log('inside false');
      return false;
    }
  };

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
          <Text style={styles.brandHeadingTxt}>Brand Found on Moglix</Text>
          {(addedBrand || []).filter(_ => _.status).length ? (
            <View>
              {addedBrand
                .filter(item => item.status)
                .map((_, i) => (
                  <View style={styles.BrandWrap}>
                    <View style={{flex: 1}}>
                      <Text style={styles.brandTitleTxt}>Brand Name</Text>
                      <Text style={styles.brandNameTxt}>{_.name}</Text>
                    </View>

                    <View style={{flex: 1}}>
                      <Text style={styles.brandTitleTxt}>Status</Text>
                      {_.status && !_.isDocumentRequired ? (
                        <Text style={styles.ApprovedStatus}>Approved</Text>
                      ) : (
                        <Text style={styles.pendingStatus}>Pending</Text>
                      )}
                    </View>
                    <View style={{flex: 1}}>
                      {_.status && !_.isDocumentRequired ? (
                        <TouchableOpacity
                          style={styles.ArrowBtn}
                          onPress={() => openModal(_)}>
                          <CustomeIcon
                            name={'arrow-right-line'}
                            size={Dimension.font28}
                            color={colors.FontColor}></CustomeIcon>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => openModal(_)}
                          style={styles.fillBtn}>
                          <Text style={styles.fillDetailtxt}>FILL DETAILS</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
            </View>
          ) : (
            <View style={styles.NoBrandWrap}>
              <Text style={styles.NoBrandTxt}>
                Added Brands will appear here
              </Text>
            </View>
          )}
          {addedBrand.filter(i => !i.status).length ? (
            <Text style={styles.brandHeadingTxt}>
              Brand you requested to add
            </Text>
          ) : null}
          <View>
            {addedBrand
              .filter(item => !item.status)
              .map((_, i) => (
                <View style={styles.BrandWrap}>
                  <View style={{flex: 1}}>
                    <Text style={styles.brandTitleTxt}>Brand Name</Text>
                    <Text style={styles.brandNameTxt}>{_.name}</Text>
                  </View>
                  <>
                    <TouchableOpacity
                      onPress={() => openModal(_)}
                      style={styles.fillBtn}>
                      <Text style={styles.fillDetailtxt}>FILL DETAILS</Text>
                    </TouchableOpacity>
                  </>
                </View>
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
        }}
        style={{padding: 0, margin: 0}}>
        <View style={styles.modalContainer}>
          <View style={styles.TopWrap}>
            <View style={styles.topbdr}></View>
            <View style={styles.ModalheadingWrapper}>
              <Text style={styles.ModalHeading}>{brand && brand.name}</Text>
              <CustomeIcon
                name={'close'}
                size={Dimension.font22}
                color={colors.FontColor}
                onPress={() => setModalVisible(false)}></CustomeIcon>
            </View>
            <View style={styles.ModalFormWrap}>
              {FORM_FIELDS.map((field, fieldKey) => (
                <field.component
                  fileUpload={natureOfBusiness}
                  {...field}
                  key={fieldKey}
                />
              )).toList()}
            </View>
          </View>
          {brand && brand.code ? (
            <View style={styles.ModalBottomBtnWrap}>
              <CustomButton
                buttonColor={
                  getButtonColor()
                    ? colors.BrandColor
                    : colors.DisableStateColor
                }
                borderColor={
                  getButtonColor()
                    ? colors.BrandColor
                    : colors.DisableStateColor
                }
                TextColor={
                  getButtonColor() ? colors.WhiteColor : colors.FontColor
                }
                TextFontSize={Dimension.font16}
                title={'SUBMIT'}
                disabled={
                  natureOfBusiness == 3
                    ? !checkCommonValidation()
                    : !checkValidation()
                }
                onPress={() => onSubmit(false)}
              />
            </View>
          ) : (
            <View style={styles.ModalBottomBtnWrap}>
              <CustomButton
                buttonColor={
                  getButtonColorReqBrand()
                    ? colors.BrandColor
                    : colors.DisableStateColor
                }
                borderColor={
                  getButtonColorReqBrand()
                    ? colors.BrandColor
                    : colors.DisableStateColor
                }
                TextColor={
                  getButtonColorReqBrand()
                    ? colors.WhiteColor
                    : colors.FontColor
                }
                TextFontSize={Dimension.font16}
                title={'SUBMIT'}
                disabled={
                  natureOfBusiness == 3
                    ? !checkCommonValidationReqBrand()
                    : !checkValidationReqBrand()
                }
                onPress={() => onSubmit(true)}
              />
            </View>
          )}
        </View>
      </Modal>
      <View style={styles.ModalBottomBtnWrap}>
        <CustomButton
          buttonColor={
            getNextStatus() ? colors.BrandColor : colors.DisableStateColor
          }
          borderColor={
            getNextStatus() ? colors.BrandColor : colors.DisableStateColor
          }
          TextColor={getNextStatus() ? colors.WhiteColor : colors.FontColor}
          TextFontSize={Dimension.font16}
          title={'NEXT'}
          loading={nextLoader}
          loadingColor={'#fff'}
          onPress={onNext}
          disabled={!getNextStatus() || loading}
          loading={nextLoader}
        />
      </View>
    </View>
  );
};

export default CategoryBrandScreen;
