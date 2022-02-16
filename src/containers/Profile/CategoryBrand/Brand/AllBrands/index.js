import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchBrandSearchResult,
  fetchBrandSearchResultByAlphabet,
  addBrand,
} from '../../../../../redux/actions/categorybrand';
import {STATE_STATUS} from '../../../../../redux/constants';
import {ALPHABETS} from '../../../../../redux/constants/categorybrand';
import debounce from 'lodash.debounce';
import styles from './style';
import Checkbox from '../../../../../component/common/Checkbox/index';
import CustomeIcon from '../../../../../component/common/CustomeIcon';

import Dimension from '../../../../../Theme/Dimension';
import Colors from '../../../../../Theme/Colors';
import MultiSelect from '../../../../../component/common/MultiSelect/index';

const AllBrandsScreen = props => {
  const allbrands = useSelector(
    state => ((state.categorybrandReducer || {}).allBrands || {}).data || [],
  );

  const allBrandsStatus = useSelector(
    state =>
      ((state.categorybrandReducer || {}).allBrands || {}).status ||
      STATE_STATUS.UNFETCHED,
  );

  const alphabetEndReached = useSelector(
    state =>
      ((state.categorybrandReducer || {}).allBrands || {}).alphabetEnd || false,
  );

  const alphabetNo = useSelector(
    state =>
      ((state.categorybrandReducer || {}).allBrands || {}).alphabetNo || ['C'],
  );

  const pageIndex = useSelector(
    state =>
      ((state.categorybrandReducer || {}).allBrands || {}).pageIndex || 64,
  );

  const maxPage = useSelector(
    state => ((state.categorybrandReducer || {}).allBrands || {}).maxPage || 91,
  );

  const addedBrand = useSelector(
    state => (state.categorybrandReducer || {}).brandsAdded || [],
  );

  // const [alphabet, setAlphabet] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    fetchListingData(64);
  }, []);

  console.log('addedBrand', addedBrand);

  //action dispatch for saga and service
  const fetchListingData = (pageNo, search) => {
    let params = ['0-9'];
    let fetchListingObj = {
      categoryCodes:
        search && search.length
          ? []
          : pageNo == 64
          ? params
          : [String.fromCharCode(pageNo)],
      searchString: search || inputValue,
      pageNo,
    };
    dispatch(fetchBrandSearchResult(fetchListingObj));
  };

  const fetchListingDataByAlphabet = term => {
    let fetchListingObj = {
      categoryCodes: [String.fromCharCode(term)],
      searchString: '',
      pageNo: 64,
    };
    dispatch(fetchBrandSearchResultByAlphabet(fetchListingObj));
  };

  const debouncedSave = useRef(
    debounce(text => {
      fetchListingData(64, text);
    }, 500),
  ).current;

  const onSearchText = text => {
    setInputValue(text);
    debouncedSave(text);
  };

  const renderItem = ({item, index}) => {
    return (
      // <TouchableOpacity key={item.id}>
      //   <Text style={{color: '#000'}}>{item.name}</Text>
      // </TouchableOpacity>
      <Checkbox
        //checked={isSelected}
        // onPress={() => setSelection(!isSelected)}
        title={item.name}
      />
    );
  };

  const renderAlphabet = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => fetchListingDataByAlphabet(item)}>
        <Text style={styles.alphbetText}>{String.fromCharCode(item)}</Text>
      </TouchableOpacity>
    );
  };

  const endReachedfetchListing = () => {
    if (
      allBrandsStatus === STATE_STATUS.FETCHED &&
      allBrandsStatus !== STATE_STATUS.FETCHING &&
      pageIndex + 1 < maxPage &&
      !inputValue &&
      !inputValue.length &&
      !alphabetEndReached
    ) {
      fetchListingData(pageIndex + 1);
    }
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

  const renderFooter = () => {
    if (allBrandsStatus != STATE_STATUS.FETCHED && pageIndex > 64) {
      return (
        <View style={{padding: 100}}>
          <ActivityIndicator
            style={{alignSelf: 'center'}}
            color="rgba(217, 35, 45, 1)"
            size={'large'}
          />
        </View>
      );
    }
    return null;
  };

  const listEmptyComponent = () => (
    <View>
      <Text style={{color: '#000'}}>No Brand Found</Text>
      <TouchableOpacity onPress={() => dispatch(addBrand({name: inputValue}))}>
        <Text style={{color: 'red'}}>Add Brand</Text>
      </TouchableOpacity>
    </View>
  );

  const brandListing = () => {
    return (
      <>
        {/* <TextInput
          placeholder="Search"
          placeholderTextColor={'#000'}
          selectionColor={'#888'}
          returnKeyType={'search'}
          value={inputValue}
          onChangeText={onSearchText}
        />

         <FlatList
          data={ALPHABETS}
          renderItem={renderAlphabet}
          keyExtractor={(item, index) => `${index}-item`}
        /> 
        <FlatList
          data={allbrands}
          renderItem={renderItem}
          style={{paddingBottom: 380}}
          contentContainerStyle={{paddingBottom: 380}}
          keyExtractor={(item, index) => `${index}-item`}
          onEndReachedThreshold={0.9}
          ListFooterComponent={renderFooter}
          onEndReached={endReachedfetchListing}
          removeClippedSubviews={true}
          maxToRenderPerBatch={20}
          ListEmptyComponent={listEmptyComponent}     
        /> */}
        <View style={styles.Wrapper}>
          <View style={styles.leftPart}>
            <MultiSelect
              value={inputValue}
              onChangeText={onSearchText}
              placeholder={'Search'}
              placeholderTextColor={Colors.eyeIcon}
              blurOnSubmit={true}
              selectedValues={addedBrand}
              data={allbrands}
              onChangeDataChoosed={data => {
                console.log('data', data);
                // dispatch(addBrand(data));
              }}
              onEndReachedThreshold={0.9}
              ListFooterComponent={renderFooter}
              onEndReached={endReachedfetchListing}
              removeClippedSubviews={true}
              maxToRenderPerBatch={20}
              ListEmptyComponent={listEmptyComponent}
              fromAllBrands={true}
            />
          </View>
          <View style={styles.AlphabetWrap}>
            <FlatList
              data={ALPHABETS}
              renderItem={renderAlphabet}
              keyExtractor={(item, index) => `${index}-item`}
              contentContainerStyle={{paddingBottom: 380}}
            />
          </View>
        </View>
      </>
    );
  };

  const renderListing = () => {
    if (
      pageIndex == 64 &&
      [STATE_STATUS.UNFETCHED, STATE_STATUS.FETCHING].includes(allBrandsStatus)
    ) {
      return renderLoader();
    }
    return brandListing();
  };

  return <View>{renderListing()}</View>;
};

export default AllBrandsScreen;
