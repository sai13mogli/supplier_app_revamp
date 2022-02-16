import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
//import styles from './styles';
import Dimension from '../../../Theme/Dimension';
import colors from '../../../Theme/Colors';
import CustomeIcon from '../CustomeIcon';
import {useDispatch, useSelector} from 'react-redux';
import {
  addBrand,
  removeBrand,
  addCategory,
  removeCategory,
} from '../../../redux/actions/categorybrand';

const MultiSelect = props => {
  const [choosedList, setChoosedList] = useState([]);
  const [dataList, setDataList] = useState(props.data);
  const [customeList, setCustomeList] = useState([]);
  const {navigate} = useNavigation();
  const navigation = useNavigation();
  const [search, setSearch] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setData();
  }, []);

  const setData = () => {
    let selected = props.selectedValues.map(_ => _.id);
    let initialData = [...props.data];
    initialData = initialData.map(_ => ({
      ..._,
      checked: selected.includes(_.id),
    }));
    setChoosedList(props.selectedValues);
    setCustomeList(initialData);
    setDataList(initialData);
  };

  const {
    blurOnSubmit,
    onChangeText,
    value,
    placeholder,
    placeholderTextColor,
    selectedValues,
    onEndReachedThreshold,
    onEndReached,
    removeClippedSubviews,
    maxToRenderPerBatch,
    ListEmptyComponent,
  } = props;

  useEffect(() => {
    setData();
  }, [props.data]);

  // useEffect(() => {
  //   if (dataList) {
  //     let dataListNow = dataList;
  //     dataListNow.map(item => {
  //       item.checked = false;
  //     });
  //     setCustomeList(dataListNow);
  //   }
  // }, [dataList]);

  const onPressItem = (id, allBrands) => {
    let customeListNow = [...customeList];
    console.log(id, customeListNow);
    for (const item in customeListNow) {
      if (customeListNow[item].id === id) {
        if (customeListNow[item].checked === false) {
          customeListNow[item].checked = true;
          let itemChoosed = customeListNow[item];
          if (allBrands) {
            // customeListNow[item] = {
            //   supplierId: '',
            //   brandCode: (customeListNow[item]).code,
            //   fileKey: '',
            //   businessNature: '1',
            //   expiryDate: '',
            //   isDeleted: '0',
            //   isRaiseRequest: 'false',
            //   brandListingUrl: '',
            //   status:(customeListNow[item]).status,
            //   isDocumentRequired:(customeListNow[item]).isDocumentRequired,
            //   id:(customeListNow[item]).id
            // },
            dispatch(addBrand(customeListNow[item]));
          }
          if (props.fromCategory) {
            dispatch(addCategory(customeListNow[item]));
          }

          setChoosedList([...choosedList, itemChoosed]);
        } else {
          customeListNow[item].checked = false;
          let choosedListNow = [...choosedList].filter(item => item.id !== id);
          if (allBrands) {
            dispatch(removeBrand(customeListNow[item]));
          }
          if (props.fromCategory) {
            dispatch(removeCategory(customeListNow[item]));
          }
          setChoosedList([...choosedListNow]);
        }
      }
    }
    setCustomeList(customeListNow);
  };

  // const onSearch = async () => {
  //   var dataListNow = search
  //   if ((customeList = search)) {
  //     setChoosedList([dataListNow])
  //   }
  // }

  useEffect(() => {
    props.onChangeDataChoosed(choosedList);
  }, [choosedList]);

  // useEffect(()=>{
  //   props.onSearchData(choosedList)
  // },[choosedList])

  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            onPressItem(
              item.value || item.id,
              props.fromAllBrands,
              props.fromCategory,
            )
          }
          style={styles.checkboxContainer}>
          <CustomeIcon
            name={!item.checked ? 'checkbox-blank' : 'checkbox-tick'}
            color={!item.checked ? colors.FontColor : colors.BrandColor}
            size={Dimension.font22}
          />
          <Text style={styles.CheckboxTitle}>
            {item.label || item.name || item.categoryName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      {!props.fromBrand ? (
        <View style={styles.searchWrapper}>
          <TextInput
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            value={value}
            blurOnSubmit={blurOnSubmit}
            placeholder={placeholder}
            style={styles.SearchInputCss}>

            </TextInput>
           <CustomeIcon name={'search'} style={styles.seacrhIcon}></CustomeIcon>
          {/* <CustomeIcon name={'close'} style={styles.CloseIcon}></CustomeIcon>
         */}
        </View>
      ) : null}

      <FlatList
        // keyExtractor={(item, index) => item.toString()}
        keyExtractor={(item, index) => index.toString()}
        extraData={props.extraData}
        data={customeList}
        renderItem={renderItem}
        onEndReachedThreshold={onEndReachedThreshold}
        onEndReached={onEndReached}
        removeClippedSubviews={removeClippedSubviews}
        maxToRenderPerBatch={maxToRenderPerBatch}
        ListEmptyComponent={ListEmptyComponent}
      />
    </>
  );
};
const styles = StyleSheet.create({
 
  CheckboxTitle: {
    fontSize: Dimension.font16,
    color: colors.FontColor,
    marginLeft: Dimension.margin10,
    fontFamily: Dimension.CustomRegularFont,
  },
  checkboxwrapper: {
    backgroundColor: colors.transparent,
  },
  checkboxContainer: {
    width: 'auto',
    flexDirection: 'row',
    marginBottom:Dimension.margin8
  },
  searchWrapper:{
   marginBottom:Dimension.margin20,
    position:"relative"
},

SearchInputCss:{
  fontSize:Dimension.font12,
  color:colors.FontColor,
  fontFamily:Dimension.CustomRegularFont,
  borderRadius:4,
  borderWidth:1,
  borderColor:colors.BoxBorderColor,
  paddingHorizontal:Dimension.padding10,
  paddingVertical:Dimension.padding10
 
},
seacrhIcon:{
    position:"absolute",
    top:Dimension.padding12,
    right:Dimension.padding10,
    fontSize:Dimension.font18,
    color:colors.FontColor
},
CloseIcon:{
  position:"absolute",
    top:Dimension.padding15,
    right:Dimension.padding20,
    fontSize:Dimension.font18,
    color:colors.BrandColor  
},

 
});
export default MultiSelect;
