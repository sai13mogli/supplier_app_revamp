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

const MultiSelect = props => {
  const [choosedList, setChoosedList] = useState([]);
  const [dataList, setDataList] = useState(props.data);
  const [customeList, setCustomeList] = useState([]);
  const {navigate} = useNavigation();
  const navigation = useNavigation();
  const [search, setSearch] = useState([]);

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

  const onPressItem = id => {
    let customeListNow = [...customeList];
    for (const item in customeListNow) {
      if (customeListNow[item].id === id) {
        if (customeListNow[item].checked === false) {
          customeListNow[item].checked = true;
          let itemChoosed = customeListNow[item];
          setChoosedList([...choosedList, itemChoosed]);
        } else {
          customeListNow[item].checked = false;
          let choosedListNow = [...choosedList].filter(item => item.id !== id);
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
          onPress={() => onPressItem(item.value)}
          style={styles.checkboxContainer}>
          <CustomeIcon
            name={!item.checked ? 'checkbox-blank' : 'checkbox-tick'}
            color={!item.checked ? colors.FontColor : colors.BrandColor}
            size={Dimension.font22}
          />
          <Text style={styles.checkboxTitle}>{item.label}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <View style={styles.InputWrap}>
        <TextInput
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          value={value}
          blurOnSubmit={blurOnSubmit}
          placeholder={placeholder}
          style={styles.inputContainerStyle}></TextInput>
        <View style={styles.IconWrap}>
          <CustomeIcon
            name={'search'}
            size={Dimension.font20}
            color={colors.FontColor}></CustomeIcon>
        </View>
      </View>

      <FlatList
        // keyExtractor={(item, index) => item.toString()}
        keyExtractor={(item, index) => index.toString()}
        extraData={props.extraData}
        data={customeList}
        renderItem={renderItem}
      />
    </>
  );
};
const styles = StyleSheet.create({
  checkboxTitle: {
    fontSize: Dimension.font14,
    color: colors.FontColor,

    marginHorizontal: Dimension.margin10,
    fontFamily: Dimension.CustomRegularFont,
  },
  checkboxwrapper: {
    backgroundColor: colors.transparent,
  },
  checkboxContainer: {
    width: 'auto',
    flexDirection: 'row',
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: colors.BoxBorderColor,
    borderRadius: 4,
    paddingHorizontal: Dimension.padding12,
    //height: Dimension.height40,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Dimension.margin10,
    backgroundColor: colors.WhiteColor,
    textAlignVertical: 'center',
    paddingVertical: Dimension.padding12,
  },
  InputWrap: {
    position: 'relative',
  },
  IconWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: Dimension.height40,
    paddingVertical: Dimension.padding10,
    paddingHorizontal: Dimension.padding12,
  },
});
export default MultiSelect;
