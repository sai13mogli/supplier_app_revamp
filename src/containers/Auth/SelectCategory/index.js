import React, {useEffect, useState} from 'react';
import MultiSelect from '../../../component/common/MultiSelect';
import {
  ScrollView,
  View,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import {getAllCategories} from '../../../services/auth';
import CustomButton from '../../../component/common/Button';
import Checkbox from '../../../component/common/Checkbox/index';
import CustomeIcon from '../../../component/common/CustomeIcon';
import Header from '../../../component/common/Header';
import styles from './style';

const SelectCategoryScreen = props => {
  const [inputValue, setInputValue] = useState('');
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

  const onSubmit = () => {
    props.route.params.setcategoryCode(selectedValues);
    props.navigation.goBack();
  };

  const updateCategory = item => {
    let categoryObj = (selectedValues || []).find(_ => _.id == item.id);
    if (categoryObj && categoryObj.id) {
      let selectedCategories = [...selectedValues].filter(
        _ => _.id !== categoryObj.id,
      );
      setSelectedValues([...selectedCategories]);
    } else {
      setSelectedValues([...selectedValues, item]);
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
          size={'large'}
          color={'red'}
          style={{alignSelf: 'center'}}
        />
      </View>
    );
  };

  const renderRight = () => {
    if (categories && categories.length) {
      return (
        <ScrollView bounces>
          {(categories || [])
            .filter((_, i) => _.label.includes(inputValue))
            .map((item, i) => (
              <View style={styles.chekboxWrap}>
                <Checkbox
                  checked={
                    (selectedValues || []).find(_ => _.id == item.id)
                      ? true
                      : false
                  }
                  onPress={() => updateCategory(item)}
                  title={item.label}
                />
              </View>
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
          <View style={styles.bottombtnWrap}>
            <TouchableOpacity style={styles.BrandNumWrap}>
              <Text style={styles.BrandNumTitle}>Categories Selected</Text>
              <Text
                style={
                  selectedValues.length == 0
                    ? styles.BrandNumTxt
                    : styles.BrandNumTxt1
                }>
                {selectedValues.length}
              </Text>
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <CustomButton
                title={'SUBMIT'}
                onPress={onSubmit}
                buttonColor={
                  selectedValues.length ? Colors.BrandColor : Colors.grayShade1
                }
                disabled={selectedValues.length ? false : true}
                TextColor={
                  selectedValues.length ? Colors.WhiteColor : Colors.FontColor
                }
                borderColor={
                  selectedValues.length ? Colors.BrandColor : Colors.grayShade1
                }
                TextFontSize={Dimension.font16}
              />
            </View>
          </View>
          {/* <CustomButton
            title={`SUBMIT (${selectedValues && selectedValues.length})`}
            onPress={onSubmit}
            buttonColor={
              selectedValues.length ? Colors.BrandColor : Colors.grayShade1
            }
            disabled={selectedValues.length ? false : true}
            TextColor={ selectedValues.length ? Colors.WhiteColor : Colors.FontColor
            }
            borderColor={ selectedValues.length ? Colors.BrandColor : Colors.grayShade1
            }
            TextFontSize={Dimension.font16}
          /> */}
        </>
      );
    }
    return renderLoader();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        showBack
        showBell
        navigation={props.navigation}
        showText={'Category & Brand'}
        rightIconName={'category--brand'}></Header>
      {renderCategories()}
    </View>
  );
};

export default SelectCategoryScreen;
