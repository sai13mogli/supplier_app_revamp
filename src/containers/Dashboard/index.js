import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';


const DashboardScreen = (props) => {

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
        DashboardScreen
      </Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('More')}
      >
        <Text style={{ marginTop: 20 }}>Profile Layout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;
