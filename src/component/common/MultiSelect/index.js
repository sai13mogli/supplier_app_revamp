import React, {useEffect, useState} from 'react';
import {View,TextInput,ScrollView,FlatList,Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const MultiSelect = props => {
 
  const [choosedList, setChoosedList] = useState([]);
  const [dataList, setDataList] = useState(props.data);
  const [customeList, setCustomeList] = useState([]);
  const {
    blurOnSubmit,
    onChangeText,
    value,
    placeholder,
    placeholderTextColor,
  } = props;

  useEffect(()=>{
    setDataList(props.data);
  },[props.data])

  useEffect(()=>{
    if(dataList){
     let dataListNow= dataList;
     dataListNow.map(item=>{
        item.checked = false;
      });
      setCustomeList(dataListNow)
    }
  },[dataList])

  const onPressItem = id =>{
    let customeListNow =[...customeList]
    for (const item in customeListNow){
      if(customeListNow[item].id===id){
        if(customeListNow[item].checked === false){
        customeListNow[item].checked = true
        let itemChoosed = customeListNow[item]
        setChoosedList([...choosedList, itemChoosed])
      }
      else {
        customeListNow[item].checked = false
        let choosedListNow = choosedList.filter(item=>item.id)
        setChoosedList([choosedListNow])
      }
    }
  }
  setCustomeList(customeListNow);
};

useEffect(()=>{
  props.onChangeDataChoosed(choosedList)
},[choosedList])

 const renderItem = (item,id)=>{
   return(
     <View style={{top:30,marginRight:120}}>
         <TouchableOpacity
            style={{
              flexDirection:'row',
              justifyContent:'space-between',
              paddingBottom:13,
              paddingTop:14,
            }}    
          onPress={()=>onPressItem(item.item.id)}>
          <Icon name={ !item.item.checked? 'check-box-outline-blank': 'check-box'}
               size={25} 
          />
          <Text style={{color: !item.item.checked? 'grey':'blue', alignSelf:'center'}}>
          { item.item.lable}
          </Text>
        
        </TouchableOpacity> 
        
     </View>
   )
 }
  return (
   <View style={styles.container}>
        <View style={styles.inputField}>
            <TextInput
                  placeholderTextColor={placeholderTextColor}
                  onChangeText={onChangeText}
                  value={value}
                  blurOnSubmit={blurOnSubmit}
                  placeholder={placeholder}>
            </TextInput>
              <View style={{ width:40,alignSelf:'center',left:140 }}>
                <MaterialCommunityIcon
                    name="magnify"
                    size={25}
                    style={styles.magnifyIcon}
                />
             </View>
        </View>
    
        <FlatList
            keyExtractor={(item,index) => item.toString()}
            extraData={props.extraData}
            data={customeList}
            renderItem={(item,id) => (renderItem(item,id))}
        />
  </View>
  
  );
};

export default MultiSelect;