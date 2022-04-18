import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchBrandsByCategory,
  addBrand,
  removeBrand,
} from '../../../../../redux/actions/categorybrand';
import {STATE_STATUS} from '../../../../../redux/constants';
import styles from './style';
import Checkbox from '../../../../../component/common/Checkbox/index';
import CustomeIcon from '../../../../../component/common/CustomeIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PopularBrandsScreen = props => {
  const brands = useSelector(
    state =>
      ((state.categorybrandReducer || {}).popularBrands || {}).data || {},
  );

  const brandsStatus = useSelector(
    state =>
      ((state.categorybrandReducer || {}).popularBrands || {}).status ||
      STATE_STATUS.UNFETCHED,
  );

  const userBrands = useSelector(
    state => (state.categorybrandReducer || {}).userBrands || [],
  );

  const selectedCategories = useSelector(
    state => (state.categorybrandReducer || {}).selectedcategories || [],
  );

  const businessNature = useSelector(
    state =>
      (((state.profileReducer || {}).businessDetails || {}).data || {})
        .businessNature,
  );
  const [activeId, setActiveId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      brandsStatus !== STATE_STATUS.FETCHED &&
      selectedCategories &&
      selectedCategories.length
    ) {
      console.log('selectedCategories mcmcmcmmc', selectedCategories);
      let categoryIds = (selectedCategories || []).map(_ => _.id);
      let payloadObj = {
        categoryCodes: [...categoryIds],
      };
      console.log('categoryCodes', payloadObj);
      dispatch(fetchBrandsByCategory(payloadObj));
    }
  }, [selectedCategories]);

  useEffect(() => {
    if (brandsStatus == STATE_STATUS.FETCHED) {
      let currId = selectedCategories && selectedCategories[0];
      setActiveId(currId && currId.id);
    }
  }, [brandsStatus]);

  const renderLeft = () => {
    return (selectedCategories || []).map((_, key) => (
      <TouchableOpacity onPress={() => setActiveId(_ && _.id)}>
        <View
          style={[
            _ && _.id == activeId
              ? styles.activeBackground
              : styles.inactiveBackground,
          ]}>
          <Text style={styles.categoryText}>{_.label}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const updatePopularBrand = async item => {
    console.log(item);
    let currbrand = {
      ...item,
      supplierId: await AsyncStorage.getItem('userId'),
      businessNature: businessNature,
      isDocumentRequired: item.isDocumentRequired,
      confirmed: true,
    };
    let brandObj = (userBrands || []).find(_ => _.brandCode == currbrand.code);
    console.log(brandObj, 'brandObj hai mc!!');
    if (brandObj && brandObj.brandCode) {
      dispatch(removeBrand(currbrand));
    } else {
      dispatch(addBrand(currbrand));
    }
  };

  const renderRight = () => {
    if (brands && brands[activeId] && brands[activeId].length) {
      return (
        <ScrollView style={{marginBottom: 100}}>
          {((brands && brands[activeId]) || [])
            .filter((_, i) => _.name.includes(inputValue))
            .map((item, i) => (
              <Checkbox
                checked={
                  (userBrands || []).find(
                    _ => (_.brandCode || _.code) == item.code,
                  )
                    ? true
                    : false
                }
                onPress={() => updatePopularBrand(item)}
                title={item.name}
              />
            ))}
          {((brands && brands[activeId]) || []).filter((_, i) =>
            _.name.includes(inputValue),
          ).length ? null : (
            <Text style={styles.NoDataTxt}>No data found!!</Text>
          )}
        </ScrollView>
      );
    } else {
      return <Text style={styles.NoDataTxt}>No data found!!</Text>;
    }
  };
  const renderLoader = () => {
    return (
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
          style={{alignSelf: 'center'}}
        />
      </View>
    );
  };

  const renderCategoriesBrands = () => {
    if (brandsStatus === STATE_STATUS.FETCHED) {
      return (
        <>
          <View style={styles.Wrapper}>
            <ScrollView style={styles.leftPart}>{renderLeft()}</ScrollView>
            <View style={styles.rightPart}>
              <View style={styles.searchWrapper}>
                <TextInput
                  placeholder="Search Brand"
                  placeholderTextColor={'#A2A2A2'}
                  selectionColor={'#888'}
                  returnKeyType={'search'}
                  value={inputValue}
                  onChangeText={value => {
                    setInputValue(value);
                  }}
                  style={styles.SearchInputCss}
                />
                <CustomeIcon
                  name={'search'}
                  style={styles.seacrhIcon}></CustomeIcon>
              </View>
              {renderRight()}
            </View>
          </View>
        </>
      );
    }
    return renderLoader();
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      {renderCategoriesBrands()}
    </View>
  );
};

export default PopularBrandsScreen;
