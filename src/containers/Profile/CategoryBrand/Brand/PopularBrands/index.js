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
  setPopularCategories,
  addMultipleBrands,
} from '../../../../../redux/actions/categorybrand';
import {CATEGORIES} from '../../../../../redux/constants/categorybrand';
import {STATE_STATUS} from '../../../../../redux/constants';
import styles from './style';
import Checkbox from '../../../../../component/common/Checkbox/index';
import CustomeIcon from '../../../../../component/common/CustomeIcon';
import {getAllCategories} from '../../../../../services/auth';
import Colors from '../../../../../Theme/Colors';
import MultiSelect from '../../../../../component/common/MultiSelect/index';
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

  const popularCategories = useSelector(
    state =>
      ((state.categorybrandReducer || {}).popularcategories || {}).data || [],
  );
  const popularCategoriesStatus = useSelector(
    state =>
      ((state.categorybrandReducer || {}).popularcategories || {}).status ||
      STATE_STATUS.UNFETCHED,
  );

  const signupCategories = useSelector(
    state =>
      ((state.profileReducer || {}).categoryBrandDetails || {}).categories ||
      [],
  );

  const businessNature = useSelector(
    state =>
      (((state.profileReducer || {}).businessDetails || {}).data || {})
        .businessNature,
  );

  // const categoriesBrandsStatus = useSelector(
  //   state =>
  //     (state.categorybrandReducer || {}).categoriesbrandsStatus ||
  //     STATE_STATUS.UNFETCHED,
  // );

  // const confirmbrands = useSelector(
  //   state => (state.categorybrandReducer || {}).confirmedbrands || [],
  // );

  const [categories, setCategories] = useState([]);

  const [activeId, setActiveId] = useState('');
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (popularCategoriesStatus !== STATE_STATUS.FETCHED) {
      getCategories();
    }
  }, []);

  // useEffect(() => {
  //   console.log(categoriesBrandsStatus == STATE_STATUS.FETCHED, 'status');
  //   dispatch(addMultipleBrands([...confirmbrands]));
  // }, [categoriesBrandsStatus]);

  const getCategories = async () => {
    const {data} = await getAllCategories();
    if (data.success) {
      let categoryIds = ([...signupCategories] || []).map(_ => _.categoryCode);
      let filteredCategories = (data.data || []).filter((_, i) =>
        categoryIds.includes(_.categoryCode),
      );
      dispatch(setPopularCategories(filteredCategories));
    }
  };

  useEffect(() => {
    if (
      brandsStatus !== STATE_STATUS.FETCHED &&
      popularCategories &&
      popularCategories.length
    ) {
      let categoryIds = (popularCategories || []).map((_, i) => _.categoryCode);
      console.log('categoryIds', categoryIds, popularCategories);
      let payloadObj = {
        categoryCodes: [...categoryIds],
      };

      dispatch(fetchBrandsByCategory(payloadObj));
      // let currId = popularCategories && popularCategories[0];
      // setActiveId(currId && currId.categoryCode);
    }
  }, [popularCategories]);

  useEffect(() => {
    if (brandsStatus == STATE_STATUS.FETCHED) {
      let currId = popularCategories && popularCategories[0];
      setActiveId(currId && currId.categoryCode);
    }
  }, [brandsStatus]);

  const renderLeft = () => {
    return (popularCategories || []).map((_, key) => (
      <TouchableOpacity onPress={() => setActiveId(_ && _.categoryCode)}>
        <View
          style={[
            _ && _.categoryCode == activeId
              ? styles.activeBackground
              : styles.inactiveBackground,
          ]}>
          <Text style={styles.categoryText}>{_.categoryName}</Text>
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
    };
    let brandObj = (userBrands || []).find(_ => _.brandCode == currbrand.code);
    console.log(brandObj, 'brandObj');
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
