import React, {useEffect, useState} from 'react';
import MultiSelect from '../../../component/common/MultiSelect';
import {ScrollView, View} from 'react-native';
import Colors from '../../../Theme/Colors';
import {getAllCategories} from '../../../services/auth';
import CustomButton from '../../../component/common/Button';

const SelectCategoryScreen = props => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState(
    props.route.params.categories || [],
  );
  const [selectedValues, setSelectedValues] = useState(
    props.route.params.categoryCode || [],
  );

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
    <View>
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
      <MultiSelect
        value={search}
        onChangeText={searchText => setSearch(searchText)}
        placeholder={'Search'}
        placeholderTextColor={Colors.eyeIcon}
        blurOnSubmit={true}
        selectedValues={selectedValues}
        data={categories}
        onChangeDataChoosed={data => {
          setSelectedValues(data);
        }}
      />
    </View>
  );
};

export default SelectCategoryScreen;
