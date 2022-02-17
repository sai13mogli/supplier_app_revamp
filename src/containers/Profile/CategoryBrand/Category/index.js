import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllCategories} from '../../../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../../../Theme/Colors';
import MultiSelect from '../../../../component/common/MultiSelect/index';
import CustomButton from '../../../../component/common/Button';
import Header from '../../../../component/common/Header';

const CategoryScreen = props => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState(
    props.route.params.categories || [],
  );
  const [selectedValues, setSelectedValues] = useState(
    props.route.params.categoryCode || [],
  );

  const selectedCategories = useSelector(
    state => (state.categorybrandReducer || {}).categories || [],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.route.params.fetchCategoryfromApi) {
      getCategories();
    }
    setSelectedValues(props.route.params.categoryCode);
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
        onPress={() => {
          props.route.params.setcategoryCode(selectedValues);
          props.navigation.goBack();
        }}
        buttonColor={selectedValues.length ? Colors.BrandColor : 'dodgerblue'}
        disabled={selectedValues.length ? false : true}
        TextColor={Colors.WhiteColor}
        borderColor={Colors.WhiteColor}
      />
    </View>
  );
};

export default CategoryScreen;
