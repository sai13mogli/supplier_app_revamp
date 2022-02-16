import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import {OrderedMap} from 'immutable';
import MultiSelectInput from '../../../component/common/MultiSelectInput';
import Header from '../../../component/common/Header';
import colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import styles from './style';
import CustomeIcon from '../../../component/common/CustomeIcon';
import {useDispatch, useSelector} from 'react-redux';

const CategoryBrandScreen = props => {
  const categories = useSelector(
    state => (state.categorybrandReducer || {}).categories || [],
  );
  const addedBrand = useSelector(
    state => (state.categorybrandReducer || {}).brandsAdded || [],
  );

  const [categoryCode, setcategoryCode] = useState([]);

  const BRAND_CATEGORY = new OrderedMap({
    category: {
      title: 'Category',
      isImp: false,
      label: 'Category',
      placeholder: 'Select Categories',
      fromAddCategory: true,
      extraView: true,
      value: categoryCode || categories.label,
      onPress: () =>
        props.navigation.navigate('Category', {
          fetchCategoryfromApi: true,
          setcategoryCode: setcategoryCode,
          categoryCode: categoryCode,
        }),
    },
    brand: {
      title: 'Brand',
      isImp: false,
      label: 'Brands require Authorised letter',
      placeholder: 'Select',
      value: 'Select',
      extraView: true,
    },
  });

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
    return title == 'Category' ? (
      <MultiSelectInput
        label={label}
        title={title}
        value={value}
        placeHolder={placeholder}
        rightComponentText={'ADD'}
        onPress={onPress}
        isImp={true}
      />
    ) : (
      <TouchableOpacity>
        <FloatingLabelInputField
          label={label}
          isImp={isImp}
          value={value}
          onChangeText={onChangeText}
          fromAddCategory={fromAddCategory}
          extraView={() => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Brands')}>
              <CustomeIcon
                name={'arrow-right-line'}
                size={Dimension.font22}
                color={colors.FontColor}></CustomeIcon>
            </TouchableOpacity>
          )}
        />
      </TouchableOpacity>
    );
  };

  console.log('addedBrands', addedBrand, categories);

  return (
    <View style={{flex: 1}}>
      <Header
        howBack
        showText={'Business Details'}
        rightIconName={'category--brand'}></Header>
      <ScrollView style={styles.ContainerCss}>
        <View>
          {BRAND_CATEGORY.map(_ => renderInputText(_))
            .toList()
            .toArray()}
          <Text style={styles.brandHeadingTxt}>Brand Found on Moglix</Text>
          <View>
            {addedBrand.map((_, i) => (
              <TouchableOpacity>
                <Text style={{color: '#000'}}>Brand Name</Text>
                <Text style={{color: '#000'}}>{_.name}</Text>
                {_.status && !_.isDocumentRequired ? (
                  <Text style={{color: 'blue'}}>Approved</Text>
                ) : (
                  <>
                    <Text style={{color: '#000'}}>Pending</Text>
                    <TouchableOpacity>
                      <Text style={{color: 'red'}}>FILL DETAILS</Text>
                    </TouchableOpacity>
                  </>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryBrandScreen;
