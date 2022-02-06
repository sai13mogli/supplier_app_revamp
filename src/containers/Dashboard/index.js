import React, {useState} from 'react';
import {Text,View,FlatList, ScrollView} from 'react-native';
import Checkbox from '../../component/common/Checkbox/index';
import MultiSelect from '../../component/common/MultiSelect/index';
import styles from './style';

const DashboardScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [isSelected, setSelection] = useState(false);
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

  return (
    <View style={{flex:1,}}>
    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
      DashboardScreen
    </Text>
    <MultiSelect
        value={searchText}
        placeholder={'Search'}
        placeholderTextColor={'grey'}
        blurOnSubmit={true}
        onChangeText={onSearch}
        data={data}
        onChangeDataChoosed={data=>
        console.log("Aakash===>",data)
      }
    />
    {/* <View style={{top:5}}>
    <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={{top:60,paddingBottom:60}}
        renderItem={({ item }) => (
          <ScrollView style={{flex:1}}>
          <View style={styles.listItem}>
            <View style={styles.listView}>
            <View style={{top:10}}>
            <Checkbox
              value={isSelected}
              onValueChange={onCheckAction}
            />
            </View>
           
            <Text style={styles.listItemText}>{item.title}</Text>
            </View>
            
          </View>
          </ScrollView>
        )}
       />
    </View> */}
    
    </View>
    
  );
};

export default DashboardScreen;
