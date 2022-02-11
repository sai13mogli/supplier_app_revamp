import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import {OrderedMap} from 'immutable';
import MultiSelectInput from '../../../component/common/MultiSelectInput';

const CategoryBrandScreen = props => {
  const [categoryCode, setcategoryCode] = useState([
    {label: 'Electricals', value: '121434'},
    {label: 'Drills', value: '121434'},
    {label: 'Cellphones', value: '121434'},
  ]);

  const BRAND_CATEGORY = new OrderedMap({
    category: {
      title: 'Category',
      isImp: false,
      label: 'Category',
      placeholder: '',
      fromAddCategory: true,
      extraView: true,
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
  }) => {
    return title == 'Category' ? (
      <MultiSelectInput
        label={label}
        title={title}
        value={categoryCode}
        placeHolder={placeholder}
        rightComponentText={'ADD'}
        onPress={() => null}
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
              <Text style={{color: '#000'}}>OK</Text>
            </TouchableOpacity>
          )}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{marginTop: 100}}>
      {BRAND_CATEGORY.map(_ => renderInputText(_))
        .toList()
        .toArray()}
      <Text style={{color: '#000'}}>Brand Found on Moglix</Text>
    </View>
  );
};

export default CategoryBrandScreen;
