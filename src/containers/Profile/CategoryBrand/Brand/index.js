import {View, Text} from 'react-native';
import React from 'react';

const BrandScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: '#000'}}>BrandScreen</Text>
    </View>
  );
};

export default BrandScreen;
