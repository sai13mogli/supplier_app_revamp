import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {getAllCategories} from '../../../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../../../Theme/Colors';
import MultiSelect from '../../../../component/common/MultiSelect/index';
import CustomButton from '../../../../component/common/Button';
import Header from '../../../../component/common/Header';
import {
  addCategory,
  removeCategory,
  setSelectCategories,
} from '../../../../redux/actions/categorybrand';
import styles from './style';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import Checkbox from '../../../../component/common/Checkbox/index';

const CategoryScreen = props => {
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const selectedCategories = useSelector(
    state =>
      (((state.profileReducer || {}).categoryBrandDetails || {}).data || {})
        .categories || [],
  );

  const stateCategories = useSelector(
    state => (state.categorybrandReducer || {}).categories || [],
  );

  const selectcategories = useSelector(
    state => (state.categorybrandReducer || {}).selectcategories || [],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.route.params.fetchCategoryfromApi) {
      getCategories();
    }
  }, []);

  const getCategories = async () => {
    const {data} = await getAllCategories();
    if (data.success) {
      setSelectedValues(selectcategories);
      setCategories(
        data.data.map(_ => ({
          label: _.categoryName,
          value: _.categoryCode,
          id: _.categoryCode,
          checked: false,
        })),
      );
    }
  };

  const onSubmit = () => {
    let mergeArr = [...stateCategories];

    const categoryIds = mergeArr.map(o => o.id);
    const filteredArr = mergeArr.filter(
      ({id}, index) => !categoryIds.includes(id, index + 1),
    );
    dispatch(setSelectCategories(filteredArr));
    props.navigation.goBack();
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
          size={'large'}
          color={'red'}
          style={{alignSelf: 'center'}}
        />
      </View>
    );
  };

  const updateCategory = item => {
    let categoryObj = (stateCategories || []).find(_ => _.id == item.id);
    if (categoryObj && categoryObj.id) {
      let selectedCategories = [...selectedValues].filter(
        _ => _.id !== categoryObj.id,
      );
      dispatch(removeCategory(item));
      setSelectedValues([...selectedCategories]);
    } else {
      dispatch(addCategory(item));
      setSelectedValues([...selectedValues, item]);
    }
  };

  const renderRight = () => {
    if (categories && categories.length) {
      return (
        <ScrollView>
          {(categories || [])
            .filter((_, i) => _.label.includes(inputValue))
            .map((item, i) => (
              <Checkbox
                checked={
                  (stateCategories || []).find(_ => _.id == item.id)
                    ? true
                    : false
                }
                onPress={() => updateCategory(item)}
                title={item.label}
              />
            ))}
          {(categories || []).filter((_, i) => _.label.includes(inputValue))
            .length ? null : (
            <Text style={{color: '#000'}}>No data found!!</Text>
          )}
        </ScrollView>
      );
    } else {
      return <Text style={{color: '#000'}}>No data found!!</Text>;
    }
  };

  const renderCategories = () => {
    if (categories && categories.length) {
      return (
        <>
          <Header
            showBack
            showText={'Category & Brand'}
            rightIconName={'category--brand'}></Header>
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
          <CustomButton
            title={`SUBMIT (${selectedValues && selectedValues.length})`}
            onPress={onSubmit}
            buttonColor={
              selectedValues.length ? Colors.BrandColor : 'dodgerblue'
            }
            disabled={selectedValues.length ? false : true}
            TextColor={Colors.WhiteColor}
            borderColor={Colors.WhiteColor}
          />
        </>
      );
    }
    return renderLoader();
  };

  return <View style={{flex: 1}}>{renderCategories()}</View>;
};

export default CategoryScreen;
