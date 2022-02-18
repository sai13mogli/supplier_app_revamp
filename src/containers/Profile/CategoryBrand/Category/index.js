import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllCategories} from '../../../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../../../Theme/Colors';
import MultiSelect from '../../../../component/common/MultiSelect/index';
import CustomButton from '../../../../component/common/Button';
import Header from '../../../../component/common/Header';
import {setSelectCategories} from '../../../../redux/actions/categorybrand';

const CategoryScreen = props => {
  const [search, setSearch] = useState('');
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
    dispatch(setSelectCategories(mergeArr));
    props.navigation.goBack();
  };

  console.log(selectedValues);

  return (
    <View style={{flex: 1}}>
      <Header
        howBack
        showText={'Category & Brand'}
        rightIconName={'category--brand'}></Header>
      <MultiSelect
        selectedValues={selectedValues}
        data={categories}
        onChangeDataChoosed={data => {
          setSelectedValues(data);
        }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={20}
        fromBrand={true}
        fromCategory={true}
      />

      <CustomButton
        title={'SUBMIT'}
        onPress={onSubmit}
        buttonColor={selectedValues.length ? Colors.BrandColor : 'dodgerblue'}
        disabled={selectedValues.length ? false : true}
        TextColor={Colors.WhiteColor}
        borderColor={Colors.WhiteColor}
      />
    </View>
  );
};

export default CategoryScreen;
