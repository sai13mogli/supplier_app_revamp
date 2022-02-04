import React, {useState} from 'react';
import {Text,View} from 'react-native';
import MultiSelect from '../../component/common/MultiSelect/index';

const DashboardScreen = () => {
  const [searchText, setSearchText] = useState('');
  
  const onSearch = str => {
    setSearchText(str);
  };

  return (
    <View>
    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
      DashboardScreen
    </Text>
    <MultiSelect
        value={searchText}
        placeholder={'Search'}
        placeholderTextColor={'grey'}
        blurOnSubmit={true}
        onChangeText={onSearch}
    />
    </View>
    
  );
};

export default DashboardScreen;
