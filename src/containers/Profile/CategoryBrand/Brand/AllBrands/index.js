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
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBrandSearchResult} from '../../../../../redux/actions/categorybrand';
import {STATE_STATUS} from '../../../../../redux/constants';
import {ALPHABETS} from '../../../../../redux/constants/categorybrand';
import debounce from 'lodash.debounce';

const AllBrandsScreen = props => {
  const allbrands = useSelector(
    state => ((state.categorybrandReducer || {}).allBrands || {}).data || [],
  );

  const allBrandsStatus = useSelector(
    state =>
      ((state.categorybrandReducer || {}).allBrands || {}).status ||
      STATE_STATUS.UNFETCHED,
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

  // const [alphabet, setAlphabet] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    fetchListingData(64, false);
  }, []);

  //action dispatch for saga and service
  const fetchListingData = (pageNo, fromSearch) => {
    let params = ['0-9'];
    let fetchListingObj = {
      categoryCodes: fromSearch
        ? []
        : pageNo == 64
        ? params
        : [String.fromCharCode(pageNo)],
      searchString: inputValue,
      pageNo,
    };
    dispatch(fetchBrandSearchResult(fetchListingObj));
  };

  useEffect(() => {
    debounce(text => {
      fetchListingData(64, true);
    }, 200);
  }, [inputValue]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity key={item.id}>
        <Text style={{color: '#000'}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderAlphabet = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => fetchListingData(item, false)}>
        <Text style={{color: '#000'}}>{String.fromCharCode(item)}</Text>
      </TouchableOpacity>
    );
  };

  const endReachedfetchListing = () => {
    if (
      allBrandsStatus === STATE_STATUS.FETCHED &&
      allBrandsStatus !== STATE_STATUS.FETCHING &&
      pageIndex + 1 < maxPage
    ) {
      fetchListingData(pageIndex + 1, false);
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

  const brandListing = () => {
    return (
      <>
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

        {/* <FlatList
          data={ALPHABETS}
          renderItem={renderAlphabet}
          keyExtractor={(item, index) => `${index}-item`}
        /> */}
        <FlatList
          data={allbrands}
          renderItem={renderItem}
          style={{paddingBottom: 380}}
          contentContainerStyle={{paddingBottom: 380}}
          keyExtractor={(item, index) => `${index}-item`}
          onEndReachedThreshold={0.9}
          ListFooterComponent={renderFooter}
          onEndReached={endReachedfetchListing}
          // ItemSeparatorComponent={renderInLineFilters}
          // ListEmptyComponent={listEmptyComponent}
        />
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
