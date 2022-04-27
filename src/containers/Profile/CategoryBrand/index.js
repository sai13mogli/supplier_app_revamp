import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import { OrderedMap } from 'immutable';
import MultiSelectInput from '../../../component/common/MultiSelectInput';
import Header from '../../../component/common/Header';
import colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import styles from './style';
import CustomeIcon from '../../../component/common/CustomeIcon';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../../../component/common/DropDown';
import FileUpload from '../../../component/common/FileUpload';
import CustomeDatePicker from '../../../component/common/Datepicker';
import Modal from 'react-native-modal';
import CustomButton from '../../../component/common/Button';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, STATE_STATUS } from '../../../redux/constants/index';
import {
  setSelectedCategories,
  updateBrandData,
  fetchCategoriesBrands,
} from '../../../redux/actions/categorybrand';
import { addOrUpdateCategoryAndBrand } from '../../../services/categorybrand';
import { getAllCategories } from '../../../services/auth';
import { fetchProfile } from '../../../redux/actions/profile';
import PickerDropDown from '../../../component/common/PickerDropDown';

// import {uploadDocumentService} from '../../../services/documents';
const deviceWidth = Dimensions.get('window').width;

const CategoryBrandScreen = props => {
  const categories = useSelector(
    state => (state.categorybrandReducer || {}).categories || [],
  );

  const initialSelectedCategories = useSelector(
    state => (state.categorybrandReducer || {}).initialcategories || [],
  );

  const categoriesBrandsStatus = useSelector(
    state =>
      (state.categorybrandReducer || {}).categoriesbrandsStatus ||
      STATE_STATUS.UNFETCHED,
  );

  const selectedCategories = useSelector(
    state => (state.categorybrandReducer || {}).selectedcategories || [],
  );

  const userCategories = useSelector(
    state => (state.categorybrandReducer || {}).userCategories || [],
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
  const userBrands = useSelector(
    state => (state.categorybrandReducer || {}).userBrands || [],
  );
  const [expiryDate, setExpiryDate] = useState('');
  const [brandUrl, setBrandUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [brandNameError, setBrandNameError] = useState(false);
  const [brand, setBrand] = useState({});
  const [initialCategories, setInitialCategories] = useState([]);
  const [nextLoader, setNextLoader] = useState(false);
  const [isRaiseRequest, setIsRaiseRequest] = useState('false');
  const [isDeletedKey, setIsDeletedKey] = useState('');

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
      onPress: () =>
        props.navigation.navigate('Category', {
          fetchCategoryfromApi: true,
          initialCategories: selectedCategories,
        }),
    },
    brand: {
      title: 'Brand',
      isImp: false,
      label: 'Brands require Authorised letter',
      placeholder: 'Select',
      value: userBrands,
      extraView: true,
      onPress: () => props.navigation.navigate('Brands'),
      fromAddCategory: false,
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
      brandName: true,
    },
    nature_of_business: {
      title: 'Nature of Business',
      isImp: true,
      // label: 'Nature of Business',
      errorMessage: 'Enter valid nature of business',
      selectedValue: natureOfBusiness,
      onValueChange: text => setTextBusinessNature(text),
      component: PickerDropDown,
      enabled: true,
      value: natureOfBusiness,
      items: [
        {
          label: 'Nature of Business',
          value: 0,
        },

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
      isImp: natureOfBusiness == 3 || natureOfBusiness == 2 ? true : false,
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
      isImp: false,
      label: 'Brand URL (If Applicable)',
      placeholder: 'http://ABCD.com',
      value: brandUrl,
      onChangeText: text => setBrandUrl(text),
      component: FloatingLabelInputField,
      isRaiseRequest: isRaiseRequest,
      brandListingUrl: true,
      isDeletedKey: isDeletedKey,
    },
  });

  useEffect(() => {
    dispatch(fetchCategoriesBrands());
  }, []);

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
    if (userCategories && userCategories.length) {
      filterSelectedArr();
    }
  }, [userCategories]);

  const filterSelectedArr = async () => {
    const { data } = await getAllCategories();
    let arr = [];
    (data.data || []).forEach(ele => {
      (userCategories || []).forEach(e => {
        if (ele.categoryCode == e) {
          arr.push({ categoryCode: e, categoryName: ele.categoryName });
        }
      });
    });
    let mutateArr = arr.map(_ => ({
      label: _.categoryName,
      checked: true,
      id: _.categoryCode,
      value: _.categoryCode,
    }));

    dispatch(setSelectedCategories(mutateArr));
  };

  const uploadDocu = async data => {
    let res = await uploadDocumentService(data);
    let { resp } = res;

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

  const setDocument = ({ fileData, resp }) => {
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
    return (
      <MultiSelectInput
        label={label}
        title={title}
        value={value}
        placeHolder={placeholder}
        rightComponentText={'ADD'}
        onPress={onPress}
        isImp={true}
        fromAddCategory={fromAddCategory}
      />
    );
  };

  //upload from fileExp
  const uploadFromFileExp = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        // type: [DocumentPicker],
      });
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

  const setTextBusinessNature = text => {
    if (text !== 0) {
      setnatureOfBusiness(text);
    }
  };

  const onSubmit = raiseRequest => {
    let currBrand = (userBrands || []).find(_ => _.brandCode == brand.code);
    if (currBrand) {
      let currBrandObj = {
        supplierId: supplierId,
        brandCode: (brand && brand.code) || (brand && brand.name),
        fileKey: brandCertificate && brandCertificate.value,
        businessNature: natureOfBusiness,
        expiryDate: expiryDate,
        isDeleted: currBrand.isDeleted,
        isRaiseRequest: currBrand.isRaiseRequest,
        brandListingUrl: brandUrl,
        brandName: brand && brand.name,
        isDocumentRequired: currBrand.isDocumentRequired,
        confirmed: currBrand.confirmed,
        localbrand: currBrand.localbrand,
      };
      let currbrands = ([...userBrands] || []).filter(
        _ => _.brandCode !== brand.code,
      );
      currbrands = ([...currbrands, currBrandObj] || []).sort((a, b) => {
        if (a.brandName < b.brandName) {
          return -1;
        }
        if (a.brandName > b.brandName) {
          return 1;
        }
        return 0;
      });
      console.log(currbrands, currBrandObj);
      dispatch(updateBrandData(currbrands));
    }
    setModalVisible(false);
  };

  const openModal = brand => {
    setBrand({
      name: brand.brandName,
      code: brand.brandCode,
    });
    setBrandName(brand.brandName);
    setnatureOfBusiness(parseInt(brand.businessNature) || 1);
    setBrandCertificate({
      title: brand.fileKey || '',
      value: brand.fileKey || '',
      loading: false,
      showDoc: false,
      closeDoc: false,
      errorState: false,
      errorText: 'Certificate upload failed.Please try again.',
    });
    setExpiryDate(brand.expiryDate);
    setBrandUrl(brand.brandListingUrl);
    setIsRaiseRequest(brand.isRaiseRequest);
    setIsDeletedKey(brand.isDeleted);
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
      brandCertificate &&
      brandCertificate.value
    );
  };

  const checkValidationReqBrand = () => {
    return brandName && brandName.length && natureOfBusiness;
  };

  const getButtonColor = () => {
    if (natureOfBusiness == 3 && checkCommonValidation()) {
      return true;
    } else if (natureOfBusiness == 2 && checkBusinessNatureValidation()) {
      return true;
    } else if (
      natureOfBusiness != 3 &&
      natureOfBusiness != 2 &&
      checkValidation()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getButtonColorReqBrand = () => {
    if (natureOfBusiness == 3 && checkCommonValidationReqBrand()) {
      return true;
    } else if (
      natureOfBusiness == 2 &&
      checkBusinessNatureReqBrandValidation()
    ) {
      return true;
    } else if (
      natureOfBusiness != 3 &&
      natureOfBusiness != 2 &&
      checkValidationReqBrand()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkBusinessNatureReqBrandValidation = () => {
    return (
      brandName &&
      brandName.length &&
      natureOfBusiness &&
      brandCertificate &&
      brandCertificate.value
    );
  };

  const onNext = async () => {
    setNextLoader(true);
    try {
      let mutatebrands = (userBrands || [])
        .filter((item, idx) => item.localbrand)
        .map((_, i) => ({
          supplierId: _.supplierId,
          brandCode: _.brandCode,
          fileKey: _.fileKey || '',
          businessNature: _.businessNature || '1',
          expiryDate: _.expiryDate || '',
          isDeleted: _.isDeleted || '0',
          isRaiseRequest: _.isRaiseRequest || 'false',
          brandListingUrl: _.brandListingUrl || '',
        }));

      let categoryIds = ([...selectedCategories] || []).map((_, i) => _.id);
      let payloadObj = {
        categoryCode: [...categoryIds],
        brandList: [...mutatebrands],
      };
      const { data } = await addOrUpdateCategoryAndBrand(payloadObj);
      if (data && data.success) {
        setNextLoader(false);
        dispatch(fetchProfile());
        props.navigation.goBack();
      } else {
        setNextLoader(false);
      }
    } catch (error) {
      setNextLoader(false);
      console.log(error);
    }
  };

  const checkBusinessNatureValidation = () => {
    return (
      brandName &&
      brandName.length &&
      natureOfBusiness &&
      brandCertificate &&
      brandCertificate.value
    );
  };

  // const getNextStatus = () => {
  //   let addedBrandCount = (confirmbrands || []).filter(
  //     _ => _.isDocumentRequired || !_.id,
  //   ).length;
  //   let filledData = (raisedBrand || [])
  //     .filter(_ => _.filled)
  //     .map(_ => _.filled).length;
  //   if (
  //     addedBrandCount.length != 0 &&
  //     filledData.length != 0 &&
  //     selectedCategories.length > 0
  //   ) {
  //     console.log('inside true');
  //     return true;
  //   } else {
  //     console.log('inside false');
  //     return false;
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      <Header
        showBack
        showBell
        navigation={props.navigation}
        showText={'Category & Brand'}
        rightIconName={'category--brand'}></Header>
      <ScrollView style={styles.ContainerCss}>
        {categoriesBrandsStatus == STATE_STATUS.FETCHED ? (
          <View>
            {BRAND_CATEGORY.map(_ => renderInputText(_))
              .toList()
              .toArray()}
            <Text style={styles.brandHeadingTxt}>Brand Found on Moglix</Text>
            {(userBrands || []).filter(
              _ => _.isDeleted == '0' || _.isDeleted == '4',
            ).length ? (
              <View>
                {userBrands
                  .sort((a, b) => {
                    if (a.brandName < b.brandName) {
                      return -1;
                    }
                    if (a.brandName > b.brandName) {
                      return 1;
                    }
                    return 0;
                  })
                  .filter(it => it.isDeleted == '0' || it.isDeleted == '4')
                  .map((_, i) => (
                    <TouchableOpacity
                      style={styles.BrandWrap}
                      onPress={() => openModal(_)}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.brandTitleTxt}>Brand Name</Text>
                        <Text style={styles.brandNameTxt}>{_.brandName}</Text>
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text style={styles.brandTitleTxt}>Status</Text>
                        {_.isDeleted == '0' ? (
                          <Text style={styles.ApprovedStatus}>Approved</Text>
                        ) : (
                          <Text style={styles.pendingStatus}>
                            {_.isDeleted == '4' && _.localbrand
                              ? 'Pending'
                              : 'Approval Pending'}
                          </Text>
                        )}
                      </View>
                      {/* //onPress={() => openModal(_)} */}

                      <View style={{ flex: 1 }}>
                        {_.isDeleted == '4' && _.localbrand ? (
                          <TouchableOpacity
                            onPress={() => openModal(_)}
                            style={styles.fillBtn}>
                            <Text style={styles.fillDetailtxt}>
                              FILL DETAILS
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={styles.ArrowBtn}
                            onPress={() => openModal(_)}>
                            <CustomeIcon
                              name={'arrow-right-line'}
                              size={Dimension.font28}
                              color={colors.FontColor}></CustomeIcon>
                          </TouchableOpacity>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            ) : (
              <View style={styles.NoBrandWrap}>
                <Text style={styles.NoBrandTxt}>
                  Added Brands will appear here
                </Text>
              </View>
            )}
            {/* && !i.status */}
            {userBrands.filter(i => i && i.isDeleted == 2).length ? (
              <Text style={styles.brandHeadingTxt}>
                Brand you requested to add
              </Text>
            ) : null}
            {userBrands.filter(item => item && item.isDeleted == 2).length ? (
              <View>
                {userBrands
                  .sort((a, b) => {
                    if (a.brandName < b.brandName) {
                      return -1;
                    }
                    if (a.brandName > b.brandName) {
                      return 1;
                    }
                    return 0;
                  })
                  .filter(item => item && item.isDeleted == 2)
                  .map((_, i) => (
                    <TouchableOpacity
                      style={styles.BrandWrap}
                      onPress={() => openModal(_)}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.brandTitleTxt}>Brand Name</Text>
                        <Text style={styles.brandNameTxt}>
                          {_.name || _.brandName}
                        </Text>
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text style={styles.brandTitleTxt}>Status</Text>

                        <Text style={styles.pendingStatus}>
                          {_.isDeleted == '2' && _.localbrand
                            ? 'Pending'
                            : 'Approval Pending'}
                        </Text>
                      </View>

                      <View style={{ flex: 1 }}>
                        {_.isDeleted == '2' &&
                          _.isRaiseRequest == 'true' &&
                          _.localbrand ? (
                          <TouchableOpacity
                            onPress={() => openModal(_)}
                            style={styles.fillBtn}>
                            <Text style={styles.fillDetailtxt}>
                              FILL DETAILS
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity style={styles.ArrowBtn}>
                            <CustomeIcon
                              name={'arrow-right-line'}
                              size={Dimension.font28}
                              color={colors.FontColor}></CustomeIcon>
                          </TouchableOpacity>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            ) : null}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              height: Dimensions.get('window').height,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              // animating={true}
              size={'large'}
              color={'red'}
              style={{ alignSelf: 'center' }}
            />
          </View>
        )}
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
        style={{ padding: 0, margin: 0 }}>
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
                  fromCategoryBrand={true}
                />
              )).toList()}
            </View>
          </View>
          {isRaiseRequest == 'false' && isDeletedKey !== '2' ? (
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
                    : natureOfBusiness == 2
                      ? !checkBusinessNatureValidation()
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
                    : natureOfBusiness == 2
                      ? !checkBusinessNatureReqBrandValidation()
                      : !checkValidationReqBrand()
                }
                onPress={() => onSubmit(true)}
              />
            </View>
          )}
        </View>
      </Modal>
      <View style={styles.ModalBottomBtnWrap}>
        {/* <CustomButton
          buttonColor={
            getNextStatus() ? colors.BrandColor : colors.DisableStateColor
          }
          borderColor={
            getNextStatus() ? colors.BrandColor : colors.DisableStateColor
          }
          TextColor={getNextStatus() ? colors.WhiteColor : colors.FontColor}
          TextFontSize={Dimension.font16}
          title={'NEXT'}
          // loading={nextLoader}
          loadingColor={'#fff'}
          onPress={onNext}
          disabled={!getNextStatus() || loading}
          loading={nextLoader}
        /> */}
        <CustomButton
          buttonColor={colors.BrandColor}
          borderColor={colors.BrandColor}
          TextColor={colors.WhiteColor}
          TextFontSize={Dimension.font16}
          title={'NEXT'}
          // loading={nextLoader}
          loadingColor={'#fff'}
          onPress={onNext}
          disabled={loading}
          loading={nextLoader}
        />
      </View>
    </View>
  );
};

export default CategoryBrandScreen;
