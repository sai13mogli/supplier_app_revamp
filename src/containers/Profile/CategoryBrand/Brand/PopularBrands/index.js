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
} from '../../../../../redux/actions/categorybrand';
import {CATEGORIES} from '../../../../../redux/constants/categorybrand';
import {STATE_STATUS} from '../../../../../redux/constants';
import styles from './style';
import Checkbox from '../../../../../component/common/Checkbox/index';
import CustomeIcon from '../../../../../component/common/CustomeIcon';
import {getAllCategories} from '../../../../../services/auth';
import Colors from '../../../../../Theme/Colors';
import MultiSelect from '../../../../../component/common/MultiSelect/index';

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

  const addedBrand = useSelector(
    state => (state.categorybrandReducer || {}).brandsAdded || [],
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

  const [categories, setCategories] = useState([]);

  const [activeId, setActiveId] = useState('');
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (popularCategoriesStatus !== STATE_STATUS.FETCHED) {
      getCategories();
    }
  }, []);

  const getCategories = async () => {
    const {data} = await getAllCategories();
    if (data.success) {
      dispatch(setPopularCategories(data.data));
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

  const updatePopularBrand = item => {
    let brandObj = (addedBrand || []).find(_ => _.id == item.id);
    console.log(brandObj);
    if (brandObj && brandObj.id) {
      dispatch(removeBrand(item));
    } else {
      dispatch(addBrand(item));
    }
  };

  const renderRight = () => {
    if (brands && brands[activeId] && brands[activeId].length) {
      return (
        <ScrollView style={{marginBottom:100}}>
          {((brands && brands[activeId]) || [])
            .filter((_, i) => _.name.includes(inputValue))
            .map((item, i) => (
              <Checkbox
                checked={
                  (addedBrand || []).find(_ => _.id == item.id) ? true : false
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
            <ScrollView 
              style={styles.leftPart}>
                {renderLeft()}
                </ScrollView>
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

  return <View style={{backgroundColor:"#fff",flex:1}}>{renderCategoriesBrands()}</View>;
};

export default PopularBrandsScreen;
