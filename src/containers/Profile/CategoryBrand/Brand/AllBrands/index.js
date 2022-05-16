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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

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

  const userBrands = useSelector(
    state => (state.categorybrandReducer || {}).userBrands || [],
  );

  const payloadParams = useSelector(
    state =>
      ((state.categorybrandReducer || {}).allBrands || {}).params || ['0-9'],
  );

  const businessNature = useSelector(
    state =>
      (((state.profileReducer || {}).businessDetails || {}).data || {})
        .businessNature,
  );

  // const [alphabet, setAlphabet] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTerm, setActiveTerm] = useState('0-9');
  const [loader, setLoader] = useState(true);
  const [initLoader, setInitLoader] = useState(true);
  const onEndReachedCalledDuringMomentum = useRef(true);
  const [supplierId, setSupplierId] = useState('');
  const [showAlphabets, setShowAlphabets] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchListingData(64);
    setInitLoader(false);
    fetchSupplierId();
  }, []);

  useEffect(() => {
    if (allBrandsStatus == STATE_STATUS.FETCHED && loader && !initLoader) {
      setLoader(false);
    }
    if (allBrandsStatus == STATE_STATUS.FETCHED && allbrands.length == 0) {
      setShowAlphabets(false);
    }
    if (allBrandsStatus == STATE_STATUS.FETCHED && allbrands.length) {
      setShowAlphabets(true);
    }
  }, [allBrandsStatus]);

  useEffect(() => {
    if (inputValue.length == 0) {
      fetchListingData(64);
    }
  }, [inputValue]);

  const fetchSupplierId = async () => {
    let supplierId = await AsyncStorage.getItem('userId');
    setSupplierId(supplierId);
  };

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

  const renderAlphabet = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => fetchListingDataByAlphabet(item)}>
        <Text
          style={
            activeTerm == '0-9' && item == '0-9'
              ? styles.activealphbetText
              : activeTerm == String.fromCharCode(item)
              ? styles.activealphbetText
              : styles.alphbetText
          }>
          {item == '0-9' ? '0-9' : String.fromCharCode(item)}
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
    if (allBrandsStatus == STATE_STATUS.FETCHING && pageIndex > 64) {
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

  const addbrandFn = () => {
    let brandNames = (userBrands || []).map(_ => _.brandName);
    if ((brandNames || []).includes(inputValue)) {
      Toast.show({
        type: 'error',
        text2: 'Brand Request already exist!',
        visibilityTime: 2000,
        autoHide: true,
      });
    } else {
      dispatch(
        addBrand({
          supplierId: supplierId,
          brandCode: inputValue,
          fileKey: '',
          businessNature: 1,
          expiryDate: '',
          isDeleted: '2',
          isRaiseRequest: 'true',
          brandListingUrl: '',
          name: inputValue,
          isDocumentRequired: 1,
          confirmed: false,
          localbrand: true,
        }),
      );
      Toast.show({
        type: 'success',
        text2: 'Brand Request sent!',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const listEmptyComponent = () => {
    if (inputValue && inputValue != '') {
      // let supplierId = await AsyncStorage.getItem('userId');
      return (
        <View style={styles.NoBrandWrap}>
          <Text style={styles.NoDataTxt}>No Brand Found</Text>
          <TouchableOpacity onPress={addbrandFn}>
            <Text style={styles.addBrandTxt}>Add Brand</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (allBrandsStatus !== STATE_STATUS.FETCHED) {
      return <Text style={styles.NoDataTxt}>Something Went woring!!</Text>;
    }
    return null;
  };

  const brandListing = () => {
    return (
      <>
        <View style={styles.searchWrapper}>
          <TextInput
            value={inputValue}
            onChangeText={value => {
              setInputValue(value);
            }}
            placeholder={'Search'}
            placeholderTextColor={Colors.eyeIcon}
            blurOnSubmit={true}
            style={styles.SearchInputCss}
            onSubmitEditing={() => {
              fetchListingData(64, inputValue);
            }}
          />
          <CustomeIcon
            name={'search'}
            style={styles.seacrhIcon}
            onPress={() => {
              if (props.fromAllBrands) {
                props.fetchListingData();
              }
            }}></CustomeIcon>
        </View>
        <View style={styles.Wrapper}>
          <View style={styles.leftPart}>
            <MultiSelect
              value={inputValue}
              onChangeText={value => {
                setInputValue(value);
              }}
              placeholder={'Search'}
              placeholderTextColor={Colors.eyeIcon}
              blurOnSubmit={true}
              selectedValues={userBrands}
              data={allbrands}
              onChangeDataChoosed={data => {
                // console.log('data', data);
                // dispatch(addBrand(data));
              }}
              onEndReachedThreshold={0.9}
              ListFooterComponent={renderFooter}
              onSubmitEditing={() => {
                fetchListingData(64, inputValue);
              }}
              returnKeyType={'search'}
              // onEndReached={({distanceFromEnd}) => {
              //   console.log(
              //     'onEndReached',
              //     onEndReachedCalledDuringMomentum.current,
              //   );
              //   if (!onEndReachedCalledDuringMomentum.current) {
              //     endReachedfetchListing();
              //     onEndReachedCalledDuringMomentum.current = true;
              //   }
              // }}
              // onMomentumScrollBegin={() => {
              //   console.log('onMomentumScrollBegin!!!!!!!');
              //   onEndReachedCalledDuringMomentum.current = false;
              // }}
              onEndReached={endReachedfetchListing}
              // removeClippedSubviews={true}
              maxToRenderPerBatch={18}
              ListEmptyComponent={listEmptyComponent}
              fromAllBrands={true}
              notSure={true}
              allbrandsListing={true}
              // windowSize={30}
              initialNumToRender={18}
              fetchListingData={() => fetchListingData(64, inputValue)}
              // updateCellsBatchingPeriod={2}
            />
          </View>
          {showAlphabets ? (
            <View style={styles.AlphabetWrap}>
              <FlatList
                bounces
                data={ALPHABETS}
                renderItem={renderAlphabet}
                keyExtractor={(item, index) => `${index}-item`}
                contentContainerStyle={{paddingBottom: 380}}
              />
            </View>
          ) : null}
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
        payloadParams[0] == '0-9' &&
        [STATE_STATUS.UNFETCHED, STATE_STATUS.FETCHING].includes(
          allBrandsStatus,
        ))
    ) {
      return renderLoader();
    }
    return brandListing();
  };

  return <View style={{flex: 1}}>{renderListing()}</View>;
};

export default AllBrandsScreen;
