import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllCategories} from '../../../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../../../Theme/Colors';
import MultiSelect from '../../../../component/common/MultiSelect/index';
import CustomButton from '../../../../component/common/Button';

const CategoryScreen = props => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState(
    props.route.params.categories || [],
  );
  const [selectedValues, setSelectedValues] = useState(
    props.route.params.categoryCode || [],
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
    <>
      <MultiSelect
        selectedValues={selectedValues}
        data={categories && categories.slice(1, 10)}
        onChangeDataChoosed={data => {
          setSelectedValues(data);
        }}
        fromBrand={true}
        fromCategory={true}
      />

      <CustomButton
        title={'SUBMIT'}
        buttonColor={'dodgerblue'}
        onPress={() => {
          props.route.params.setcategoryCode(selectedValues);
          props.navigation.goBack();
        }}
        TextColor={Colors.WhiteColor}
        borderColor={Colors.WhiteColor}
      />
    </>
  );
};

export default CategoryScreen;
