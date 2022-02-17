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
  const [activeTerm, setActiveTerm] = useState('0-9');
  const [loader, setLoader] = useState(true);
  const [initLoader, setInitLoader] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchListingData(64);
    setInitLoader(false);
  }, []);

  useEffect(() => {
    if (allBrandsStatus == STATE_STATUS.FETCHED && loader && !initLoader) {
      setLoader(false);
    }
  }, [allBrandsStatus]);

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
    if (term == '0-9') {
      setActiveTerm('0-9');
    } else {
      setActiveTerm(String.fromCharCode(term));
    }
    let fetchListingObj = {
      categoryCodes: term == '0-9' ? ['0-9'] : [String.fromCharCode(term)],
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

  const renderAlphabet = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => fetchListingDataByAlphabet(item)}>
        <Text
          style={
            activeTerm == String.fromCharCode(item)
              ? styles.activealphbetText
              : styles.alphbetText
          }>
          {String.fromCharCode(item)}
        </Text>
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
      !alphabetEndReached &&
      !loader
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
              maxToRenderPerBatch={100}
              ListEmptyComponent={listEmptyComponent}
              fromAllBrands={true}
            />
          </View>
          <View style={styles.AlphabetWrap}>
            <TouchableOpacity onPress={() => fetchListingDataByAlphabet('0-9')}>
              <Text
                style={
                  activeTerm == '0-9'
                    ? styles.activealphbetText
                    : styles.alphbetText
                }>
                0-9
              </Text>
            </TouchableOpacity>
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
    if (initLoader) {
      return renderLoader();
    } else if (
      loader ||
      (pageIndex == 64 &&
        [STATE_STATUS.UNFETCHED, STATE_STATUS.FETCHING].includes(
          allBrandsStatus,
        ))
    ) {
      return renderLoader();
    }
    return brandListing();
  };

  return <View>{renderListing()}</View>;
};

export default AllBrandsScreen;
