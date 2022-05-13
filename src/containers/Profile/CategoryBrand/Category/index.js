import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Image,
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
  setSelectedCategories,
} from '../../../../redux/actions/categorybrand';
import styles from './style';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import Checkbox from '../../../../component/common/Checkbox/index';
import Dimension from '../../../../Theme/Dimension';

const CategoryScreen = props => {
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState([]);

  const selectedCategories = useSelector(
    state => (state.categorybrandReducer || {}).selectedcategories || [],
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
    let currItem = ([...selectedCategories] || []).find(_ => _.id === item.id);
    if (currItem) {
      dispatch(removeCategory(item));
    } else {
      dispatch(addCategory(item));
    }
  };

  const renderRight = () => {
    if (categories && categories.length) {
      return (
        <ScrollView bounces>
          {(categories || [])
            .filter((_, i) => _.label.includes(inputValue))
            .map((item, i) => (
              <>
                <Checkbox
                  isImage
                  checked={
                    (selectedCategories || []).find(_ => _.id == item.id)
                      ? true
                      : false
                  }
                  onPress={() => updateCategory(item)}
                  title={item.label}
                  image={item.id}
                />
              </>
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
            showBell
            navigation={props.navigation}
            showText={'Category & Brand'}
            rightIconName={'category--brand'}></Header>
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="Search Category"
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
          <View style={styles.bottomWrap}>
            <CustomButton
              title={`SUBMIT (${
                selectedCategories && selectedCategories.length
              })`}
              onPress={onSubmit}
              buttonColor={
                selectedCategories.length
                  ? Colors.BrandColor
                  : Colors.DisableStateColor
              }
              disabled={selectedCategories.length ? false : true}
              TextColor={
                selectedCategories.length ? Colors.WhiteColor : Colors.FontColor
              }
              borderColor={
                selectedCategories.length
                  ? Colors.BrandColor
                  : Colors.DisableStateColor
              }
            />
          </View>
        </>
      );
    }
    return renderLoader();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>{renderCategories()}</View>
  );
};

export default CategoryScreen;
