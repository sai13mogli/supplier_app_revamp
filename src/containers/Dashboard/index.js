import React, {useState,useEffect} from 'react';
import {Text,View,FlatList, ScrollView} from 'react-native';
import Checkbox from '../../component/common/Checkbox/index';
import MultiSelect from '../../component/common/MultiSelect/index';
import styles from './style';
import colors from "../../Theme/Colors";

const DashboardScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [text,setText]= useState("")

  const [data,setData]= useState( [
    { id: '1', lable: 'First item', checked : false},
    { id: '2', lable: 'Second item',checked : false },
    { id: '3', lable: 'Third item' ,checked : false},
    { id: '4', lable: 'Fourth item' ,checked : false},
    { id: '5', lable: 'Fifth item' ,checked : false},
    { id: '6', lable: 'Sixth item' ,checked : false},
    { id: '7', lable: 'Seventh item',checked : false }
  ]);

  const onSearch = str => {
    setSearchText(str);
  };

  const onCheckAction = value => {
    setSelection(value);
  };

//   useEffect(() => {
//     onSearchData()
//   },[])

// useEffect(() => {
//   onSearchData()
// }, [searchText])

 const onSearchData = (searchText) => {
    const newData = data.filter((item) => {
      const itemData = item.lable.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
  });
  setData(newData);
  setSearchText(searchText);
};

  return (
    <View style={{flex:1,}}>
    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
      DashboardScreen
    </Text>
    <MultiSelect
        value={searchText}
        onChangeText={(searchText)=>onSearchData(searchText)}
        placeholder={'Search'}
        placeholderTextColor={colors.eyeIcon}
        blurOnSubmit={true}
        data={data}
        onChangeDataChoosed={data=>
        console.log("Aakash===>",data)
      }
    />
  </View>
    
  );
};

export default DashboardScreen;
