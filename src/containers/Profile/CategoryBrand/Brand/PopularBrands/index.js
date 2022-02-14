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
import {fetchBrandsByCategory} from '../../../../../redux/actions/categorybrand';
import {CATEGORIES} from '../../../../../redux/constants/categorybrand';
import {STATE_STATUS} from '../../../../../redux/constants';
import styles from './style';
import Checkbox from '../../../../../component/common/Checkbox/index';

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

  const [activeId, setActiveId] = useState('122000000');
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (brandsStatus !== STATE_STATUS.FETCHED) {
      let payloadObj = {
        categoryCodes: ['122000000', '260000000'],
      };
      dispatch(fetchBrandsByCategory(payloadObj));
    }
  }, []);

  const renderLeft = () => {
    return CATEGORIES.map((_, key) => (
      <TouchableOpacity onPress={() => setActiveId(_.categoryId)}>
        <View
          style={[
            key == activeId
              ? styles.activeBackground
              : styles.inactiveBackground,
          ]}>
          
          <Text style={styles.categoryText}>{_.category}</Text>
        </View>
      </TouchableOpacity>
    ))
      .toList()
      .toArray();
  };

  const renderRight = () => {
    return (
      <ScrollView>
        {((brands && brands[activeId]) || [])
          .filter((_, i) => _.name.includes(inputValue))
          .map((item, i) => (
            <Checkbox
            //checked={isSelected}
           // onPress={() => setSelection(!isSelected)}
            title={item.name}
          />
            // <TouchableOpacity>
            //   <Text style={{color: '#000'}}>{item.name}</Text>
            // </TouchableOpacity>
          ))}
      </ScrollView>
    );
  };
  const renderLoader = () => (
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

  const renderCategoriesBrands = () => {
    if (brandsStatus === STATE_STATUS.FETCHED) {
      return (
        <>
        <View style={styles.Wrapper}>
          <View style={styles.leftPart}>
          {renderLeft()}
          </View>
          <View style={styles.rightPart}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'#000'}
            selectionColor={'#888'}
            returnKeyType={'search'}
            value={inputValue}
            onChangeText={value => {
              setInputValue(value);
            }}
          />
          {renderRight()}
          </View>
        </View>
          
         
        </>
      );
    }
    return renderLoader();
  };

  return <View>{renderCategoriesBrands()}</View>;
};

export default PopularBrandsScreen;
